import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'src/database/prisma.service'
import {
  ERROR,
  commentChildrenCountSelect,
  postRelationCountSelect,
  userRelationSelect,
} from 'src/utils'
import { CreatePostDto } from './dtos/create-post.dto'
import { UpdatePostDto } from './dtos/update-post.dto'
import { GetPostsQueries } from './queries/get-posts.query'
import { CreatePostResponse } from './responses/create-post.response'
import { GetPostsResponse } from './responses/get-posts.response'
import { PostResponse } from './responses/post.response'
import { UpdatePostResponse } from './responses/update-post.response'

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    userId: string,
    dto: CreatePostDto
  ): Promise<CreatePostResponse> {
    return this.prisma.post.create({
      data: {
        ...dto,
        userId,
      },
      include: {
        _count: postRelationCountSelect,
        user: {
          select: userRelationSelect,
        },
      },
    })
  }

  async getMany(
    currentUserId: string,
    { userId, take, skip, search }: GetPostsQueries
  ): Promise<GetPostsResponse> {
    const where: Prisma.PostWhereInput = {
      OR: [
        {
          title: {
            contains: search,
            mode: 'insensitive',
          },
          content: {
            contains: search,
            mode: 'insensitive',
          },
        },
      ],
      isDeleted: false,
    }

    if (userId) {
      where.userId = userId
    }

    const [items, totalItem] = await Promise.all([
      this.prisma.post.findMany({
        where,
        include: {
          user: {
            select: userRelationSelect,
          },
          comments: {
            where: {
              parentId: null,
            },
            take: 3,
            orderBy: {
              createdAt: 'desc',
            },
            include: {
              user: {
                select: userRelationSelect,
              },
              _count: commentChildrenCountSelect,
            },
          },
          reacts: {
            where: {
              userId: currentUserId,
            },
            select: {
              id: true,
              emojiId: true,
              userId: true,
            },
          },
          _count: postRelationCountSelect,
        },
        orderBy: {
          updatedAt: 'desc',
        },
        skip,
        take,
      }),
      this.prisma.post.count({
        where,
      }),
    ])

    return {
      pagination: {
        totalItem,
        take,
        skip,
      },
      items: items.map(item => {
        const { reacts, ...post } = item
        const yourReact = reacts.find(item => item.userId === currentUserId)

        return {
          ...post,
          yourReact,
        }
      }),
    }
  }

  async getById(postId: string): Promise<PostResponse> {
    const post = await this.prisma.post.findFirst({
      where: { id: postId, isDeleted: false },
      include: {
        user: {
          select: userRelationSelect,
        },
        _count: postRelationCountSelect,
      },
    })

    if (!post) {
      throw new NotFoundException(ERROR.POST.NOT_FOUND)
    }

    return post
  }

  async update(
    userId: string,
    postId: string,
    dto: UpdatePostDto
  ): Promise<UpdatePostResponse> {
    await this.checkPermission(userId, postId)

    return this.prisma.post.update({
      data: dto,
      where: { id: postId },
      include: {
        _count: postRelationCountSelect,
      },
    })
  }

  async delete(userId: string, postId: string): Promise<boolean> {
    await this.checkPermission(userId, postId)

    await this.prisma.post.update({
      where: { id: postId },
      data: {
        isDeleted: false,
      },
    })

    return true
  }

  private async checkPermission(
    userId: string,
    postId: string
  ): Promise<PostResponse> {
    const post = await this.getById(postId)

    if (post.userId !== userId) {
      throw new ForbiddenException(ERROR.POST.NOT_OWN)
    }

    return post
  }
}
