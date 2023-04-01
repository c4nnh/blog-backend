import { ApiProperty, OmitType } from '@nestjs/swagger'
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
}
