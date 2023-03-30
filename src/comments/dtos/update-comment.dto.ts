import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'

export class UpdateCommentDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  content?: string
}
