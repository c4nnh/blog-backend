import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional, IsString, IsUUID } from 'class-validator'
import { CommentEntity } from '../entities/comment.entity'

export class CreateCommentDto implements Pick<CommentEntity, 'content'> {
  @IsUUID(4)
  @ApiProperty()
  postId: string

  @IsString()
  @ApiProperty()
  content: string

  @IsUUID(4)
  @IsOptional()
  @ApiPropertyOptional()
  parentId?: string
}
