import { ApiProperty } from '@nestjs/swagger'
import { PaginationResponse } from 'src/utils'
import { PostResponse } from './post.response'

export class GetPostsResponse extends PaginationResponse<PostResponse> {
  @ApiProperty({
    type: PostResponse,
    isArray: true,
  })
  items: PostResponse[]
}
