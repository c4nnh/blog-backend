import { ApiProperty } from '@nestjs/swagger'
import { Emoji, EmojiFor } from '@prisma/client'

export class EmojiEntity implements Emoji {
  @ApiProperty()
  id: string

  @ApiProperty()
  name: string

  @ApiProperty()
  icon: string

  isDeleted: boolean

  isDefault: boolean

  @ApiProperty({
    isArray: true,
    enum: EmojiFor,
  })
  for: EmojiFor[]

  createdAt: Date

  updatedAt: Date
}
