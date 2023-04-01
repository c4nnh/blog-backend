import { ApiProperty } from '@nestjs/swagger'

export class Pagination {
  totalItem: number
  take: number
  skip: number
}

export class PaginationResponse<T> {
  @ApiProperty({
    type: Pagination,
  })
  pagination: Pagination
  items: T[]
}
