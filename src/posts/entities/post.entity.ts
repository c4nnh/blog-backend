import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Post } from '@prisma/client'
import { UserRelationEntity } from 'src/users/entities/user-relation.entity'

export class PostEntity implements Post {
  @ApiProperty()
  id: string

  @ApiProperty()
  title: string

  @ApiProperty()
  content: string

  @ApiPropertyOptional()
  imageUrl: string

  @ApiProperty()
  createdAt: Date

  @ApiProperty()
  updatedAt: Date

  userId: string

  @ApiProperty({
    type: UserRelationEntity,
  })
  user: UserRelationEntity
}
