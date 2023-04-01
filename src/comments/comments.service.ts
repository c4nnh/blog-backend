import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { Comment, Prisma } from '@prisma/client'
import { PrismaService } from 'src/database/prisma.service'
import {
  ERROR,
  commentChildrenCountSelect,
  userRelationSelect,
} from 'src/utils'
import { CreateCommentDto } from './dtos/create-comment.dto'
import { UpdateCommentDto } from './dtos/update-comment.dto'
import { GetCommentsQueries } from './queries/get-comments.query'
import { CommentResponse } from './responses/comment.response'
import { GetCommentsResponse } from './responses/get-comments.response'

@Injectable()
export class CommentsService {
  constructor(private readonly prisma: PrismaService) {}

  async getMany({
    postId,
    parentId,
    skip,
    take,
  }: GetCommentsQueries): Promise<GetCommentsResponse> {
    if (!postId && !parentId) {
      throw new BadRequestException(ERROR.COMMENT.MISSING_POST_OR_PARENT)
    }

    const where: Prisma.CommentWhereInput = {}

    if (postId) {
      where.postId = postId
      where.parentId = null
    }

    if (parentId) {
      where.parentId = parentId
    }

    const [items, totalItem] = await Promise.all([
      this.prisma.comment.findMany({
        where: where,
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          user: {
            select: userRelationSelect,
          },
          _count: commentChildrenCountSelect,
        },
        skip,
        take,
      }),
      this.prisma.comment.count({
        where: where,
      }),
    ])

    return {
      pagination: {
        totalItem,
        take,
        skip,
      },
      items,
    }
  }

  async create(
    userId: string,
    { content, postId, parentId }: CreateCommentDto
  ): Promise<CommentResponse> {
    const post = await this.prisma.post.findFirst({
      where: { id: postId, isDeleted: false },
    })

    if (!post) {
      throw new NotFoundException(ERROR.POST.NOT_FOUND)
    }

    if (parentId) {
      const parentComment = await this.prisma.comment.findUnique({
        where: { id: parentId },
      })

      if (!parentComment) {
        throw new NotFoundException(ERROR.COMMENT.NOT_FOUND_PARENT)
      }
    }

    return this.prisma.comment.create({
      data: {
        content,
        postId,
        parentId,
        userId,
      },
      include: {
        user: {
          select: userRelationSelect,
        },
        _count: commentChildrenCountSelect,
      },
    })
  }

  async update(
    userId: string,
    commentId: string,
    dto: UpdateCommentDto
  ): Promise<Comment> {
    const comment = await this.checkPermission(userId, commentId)

    if (comment.content === dto.content) {
      return comment
    }

    return this.prisma.comment.update({
      where: { id: commentId },
      data: {
        ...comment,
        ...dto,
      },
    })
  }

  async delete(userId: string, commentId: string): Promise<boolean> {
    await this.checkPermission(userId, commentId)

    await this.prisma.comment.delete({ where: { id: commentId } })

    return true
  }

  private async checkPermission(
    userId: string,
    commentId: string
  ): Promise<Comment> {
    const comment = await this.prisma.comment.findUnique({
      where: { id: commentId },
    })

    if (!comment) {
      throw new NotFoundException(ERROR.COMMENT.NOT_FOUND)
    }

    if (comment.userId !== userId) {
      throw new ForbiddenException(ERROR.COMMENT.NOT_OWN)
    }

    return comment
  }
}
