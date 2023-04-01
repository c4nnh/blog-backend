import { ApiPropertyOptional, OmitType } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'
import { PaginationQueries } from 'src/utils'

export class GetCommentsQueries extends OmitType(PaginationQueries, [
  'search',
]) {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  postId?: string

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  parentId?: string
}
