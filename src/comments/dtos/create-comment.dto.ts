import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'

export class CreateCommentDto {
  @IsString()
  @ApiProperty()
  postId: string

  @IsString()
  @ApiProperty()
  content: string

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  parentId?: string
}
