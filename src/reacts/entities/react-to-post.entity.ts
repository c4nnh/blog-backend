import { ApiProperty } from '@nestjs/swagger'
import { ReactToPost } from '@prisma/client'
import { EmojiEntity } from 'src/emojies/entities/emoji.entity'
import { UserRelationEntity } from 'src/users/entities/user-relation.entity'

export class ReactToPostEntity implements ReactToPost {
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

  postId: string
}
