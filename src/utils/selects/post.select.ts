import { Prisma } from '@prisma/client'

export const postRelationCountSelect: Prisma.PostCountOutputTypeArgs = {
  select: {
    comments: true,
  },
}
