import { ApiProperty } from '@nestjs/swagger'
import { CommentEntity } from '../entities/comment.entity'

class CommentCounter {
  @ApiProperty()
  children: number
}

export class CommentResponse extends CommentEntity {
  @ApiProperty({
    type: CommentCounter,
  })
  _count: CommentCounter
}
