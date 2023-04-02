import { ApiProperty, ApiPropertyOptional, OmitType } from '@nestjs/swagger'
import { YourReact } from 'src/reacts/response/your-react.response'
import { PostEntity } from '../entities/post.entity'

class PostCounter {
  @ApiProperty()
  comments: number
}

export class PostResponse extends OmitType(PostEntity, ['isDeleted']) {
  @ApiProperty({
    type: PostCounter,
  })
  _count: PostCounter

  @ApiPropertyOptional({
    type: YourReact,
  })
  yourReact?: YourReact
}
