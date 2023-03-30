import { ApiPropertyOptional } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsOptional, IsString } from 'class-validator'

export class PaginationQueries {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @Transform(({ value }) => value?.trim() || '')
  search?: string = ''

  @ApiPropertyOptional({
    default: 10,
  })
  @IsOptional()
  take?: number = 10

  @ApiPropertyOptional({
    default: 0,
  })
  @IsOptional()
  skip?: number = 0
}
