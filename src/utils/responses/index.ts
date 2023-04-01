import { ApiProperty } from '@nestjs/swagger'

export class Pagination {
  @ApiProperty()
  totalItem: number

  @ApiProperty()
  take: number

  @ApiProperty()
  skip: number
}

export class PaginationResponse<T> {
  @ApiProperty({
    type: Pagination,
  })
  pagination: Pagination

  items: T[]
}
