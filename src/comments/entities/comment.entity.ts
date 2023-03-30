import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Comment } from '@prisma/client'
import { UserRelationEntity } from 'src/users/entities/user-relation.entity'

export class CommentEntity implements Comment {
  @ApiProperty()
  id: string

  @ApiProperty()
  content: string

  @ApiProperty()
  createdAt: Date

  @ApiProperty()
  updatedAt: Date

  @ApiProperty()
  userId: string

  @ApiProperty({
    type: UserRelationEntity,
  })
  user: UserRelationEntity

  @ApiProperty()
  postId: string

  @ApiPropertyOptional()
  parentId: string

  @ApiProperty({
    type: CommentEntity,
    isArray: true,
  })
  children: CommentEntity[]
}
