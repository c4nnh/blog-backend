import { ApiProperty } from '@nestjs/swagger'
import { PaginationResponse } from 'src/utils'
import { PostResponse } from './post.response'

export class GetPostsResponse implements PaginationResponse<PostResponse> {
  @ApiProperty()
  totalItem: number

  @ApiProperty({
    type: PostResponse,
    isArray: true,
  })
  items: PostResponse[]
}
