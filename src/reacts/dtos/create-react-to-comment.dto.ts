import { ApiProperty } from '@nestjs/swagger'
import { IsUUID } from 'class-validator'
import { ReactToCommentEntity } from '../entities/react-to-comment.entity'

export class CreateReactToCommentDto
  implements Pick<ReactToCommentEntity, 'emojiId' | 'commentId'>
{
  @ApiProperty()
  @IsUUID('4')
  emojiId: string

  @IsUUID('4')
  @ApiProperty()
  commentId: string
}
