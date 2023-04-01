import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'
import { CommentEntity } from '../entities/comment.entity'

export class UpdateCommentDto
  implements Partial<Pick<CommentEntity, 'content'>>
{
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  content?: string
}
