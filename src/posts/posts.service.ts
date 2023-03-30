import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'src/database/prisma.service'
import { ERROR } from 'src/utils'
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
    })
  }

  async getMany({
    userId,
    take,
    skip,
    search,
  }: GetPostsQueries): Promise<GetPostsResponse> {
    const where: Prisma.PostWhereInput = {
      userId,
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
    }

    const [items, totalItem] = await Promise.all([
      this.prisma.post.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              avatarUrl: true,
            },
          },
        },
        skip,
        take,
      }),
      this.prisma.post.count({
        where,
      }),
    ])

    return {
      totalItem,
      items,
    }
  }

  async getById(postId: string): Promise<PostResponse> {
    const post = await this.prisma.post.findUnique({
      where: { id: postId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatarUrl: true,
          },
        },
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
    })
  }

  async delete(userId: string, postId: string): Promise<boolean> {
    await this.checkPermission(userId, postId)

    await this.prisma.post.delete({
      where: { id: postId },
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
