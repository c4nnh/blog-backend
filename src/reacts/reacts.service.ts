import { ForbiddenException, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/database/prisma.service'
import { ERROR, userRelationSelect } from 'src/utils'
import { CreateReactToCommentDto } from './dtos/create-react-to-comment.dto'
import { CreateReactToPostDto } from './dtos/create-react-to-post.dto'
import { ReactToCommentResponse } from './response/react-to-comment.response'
import { ReactToPostResponse } from './response/react-to-post.response'

@Injectable()
export class ReactsService {
  constructor(private readonly prisma: PrismaService) {}

  async reactToPost(
    userId: string,
    dto: CreateReactToPostDto
  ): Promise<ReactToPostResponse> {
    const include = {
      emoji: true,
      user: {
        select: userRelationSelect,
      },
    }

    const reactToPost = await this.prisma.reactToPost.findUnique({
      where: {
        userId_postId: {
          userId,
          postId: dto.postId,
        },
      },
      include,
    })

    if (!reactToPost) {
      return this.prisma.reactToPost.create({
        data: { ...dto, userId },
        include,
      })
    }

    if (reactToPost.emojiId === dto.emojiId) {
      return reactToPost
    }

    return this.prisma.reactToPost.update({
      data: {
        emojiId: dto.emojiId,
      },
      where: { id: reactToPost.id },
      include,
    })
  }

  async unreactToPost(userId: string, reactId: string): Promise<boolean> {
    const react = await this.prisma.reactToPost.findUnique({
      where: { id: reactId },
    })

    if (!react) return true

    if (react.userId !== userId) {
      throw new ForbiddenException(ERROR.REACT.NOT_OWN)
    }

    await this.prisma.reactToPost.delete({
      where: {
        id: reactId,
      },
    })

    return true
  }

  async reactToComment(
    userId: string,
    dto: CreateReactToCommentDto
  ): Promise<ReactToCommentResponse> {
    const include = {
      emoji: true,
      user: {
        select: userRelationSelect,
      },
    }

    const reactToComment = await this.prisma.reactToComment.findUnique({
      where: {
        userId_commentId: {
          userId,
          commentId: dto.commentId,
        },
      },
      include,
    })

    if (!reactToComment) {
      return this.prisma.reactToComment.create({
        data: { ...dto, userId },
        include,
      })
    }

    if (reactToComment.emojiId === dto.emojiId) {
      return reactToComment
    }

    return this.prisma.reactToComment.update({
      data: {
        emojiId: dto.emojiId,
      },
      where: { id: reactToComment.id },
      include,
    })
  }

  async unreactToComment(userId: string, reactId: string): Promise<boolean> {
    const react = await this.prisma.reactToComment.findUnique({
      where: { id: reactId },
    })

    if (!react) return true

    if (react.userId !== userId) {
      throw new ForbiddenException(ERROR.REACT.NOT_OWN)
    }

    await this.prisma.reactToComment.delete({
      where: {
        id: reactId,
      },
    })

    return true
  }
}
