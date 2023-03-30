import { ApiProperty } from '@nestjs/swagger'

export class GetByIdParams {
  @ApiProperty()
  id: string
}
