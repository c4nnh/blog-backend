import { ApiProperty } from '@nestjs/swagger'
import { PaginationResponse } from 'src/utils'
import { CommentResponse } from './comment.response'

export class GetCommentsResponse extends PaginationResponse<CommentResponse> {
  @ApiProperty({
    type: CommentResponse,
    isArray: true,
  })
  items: CommentResponse[]
}
