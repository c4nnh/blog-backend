import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'

export class CreateCommentDto {
  @IsString()
  @ApiProperty()
  content: string

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  parentId?: string
}
