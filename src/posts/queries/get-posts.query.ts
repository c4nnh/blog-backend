import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'
import { PaginationQueries } from 'src/utils'

export class GetPostsQueries extends PaginationQueries {
  @ApiPropertyOptional({
    description: 'Is id of current user if not provided',
  })
  @IsString()
  @IsOptional()
  userId?: string
}
