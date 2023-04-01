import { Prisma } from '@prisma/client'

export const commentChildrenCountSelect: Prisma.CommentCountOutputTypeArgs = {
  select: {
    children: true,
    reactsToComment: true,
  },
}
