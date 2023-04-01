import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional, IsUUID } from 'class-validator'
import { PaginationQueries } from 'src/utils'

export class GetPostsQueries extends PaginationQueries {
  @ApiPropertyOptional({
    description: 'Is id of current user if not provided',
  })
  @IsUUID(4)
  @IsOptional()
  userId?: string
}
