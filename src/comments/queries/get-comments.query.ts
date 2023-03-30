import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'
import { PaginationQueries } from 'src/utils'

export class GetCommentsQueries extends PaginationQueries {
  @ApiProperty()
  @IsString()
  postId: string

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  parentId?: string
}
