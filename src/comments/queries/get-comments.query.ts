import { ApiPropertyOptional, OmitType } from '@nestjs/swagger'
import { IsOptional, IsUUID } from 'class-validator'
import { PaginationQueries } from 'src/utils'

export class GetCommentsQueries extends OmitType(PaginationQueries, [
  'search',
]) {
  @ApiPropertyOptional()
  @IsUUID(4)
  @IsOptional()
  postId?: string

  @ApiPropertyOptional()
  @IsUUID(4)
  @IsOptional()
  parentId?: string
}
