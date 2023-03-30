import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'
import { PostEntity } from '../entities/post.entity'

export class UpdatePostDto
  implements Partial<Pick<PostEntity, 'title' | 'content' | 'imageUrl'>>
{
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  title?: string

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  content?: string

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  imageUrl?: string
}
