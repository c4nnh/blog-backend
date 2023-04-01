import { ApiProperty } from '@nestjs/swagger'
import { IsUUID } from 'class-validator'
import { ReactToPostEntity } from '../entities/react-to-post.entity'

export class CreateReactToPostDto
  implements Pick<ReactToPostEntity, 'emojiId' | 'postId'>
{
  @ApiProperty()
  @IsUUID('4')
  emojiId: string

  @IsUUID('4')
  @ApiProperty()
  postId: string
}
