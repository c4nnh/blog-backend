import { ApiProperty } from '@nestjs/swagger'

export class YourReact {
  @ApiProperty()
  id: string

  @ApiProperty()
  emojiId: string
}
