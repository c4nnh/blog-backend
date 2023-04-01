import { ApiProperty } from '@nestjs/swagger'
import { ReactToComment } from '@prisma/client'
import { EmojiEntity } from 'src/emojies/entities/emoji.entity'
import { UserRelationEntity } from 'src/users/entities/user-relation.entity'

export class ReactToCommentEntity implements ReactToComment {
  @ApiProperty()
  id: string

  @ApiProperty()
  createdAt: Date

  @ApiProperty()
  updatedAt: Date

  userId: string

  @ApiProperty({
    type: UserRelationEntity,
  })
  user: UserRelationEntity

  emojiId: string

  @ApiProperty({
    type: EmojiEntity,
  })
  emoji: EmojiEntity

  commentId: string
}
