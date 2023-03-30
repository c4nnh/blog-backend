import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'
import { PostEntity } from '../entities/post.entity'

export class CreatePostDto
  implements Pick<PostEntity, 'title' | 'content' | 'imageUrl'>
{
  @ApiProperty()
  @IsString()
  title: string

  @ApiProperty()
  @IsString()
  content: string

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  imageUrl: string
}
