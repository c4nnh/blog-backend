import { ApiProperty } from '@nestjs/swagger'
import { IsUUID } from 'class-validator'

export class GetByIdParams {
  @ApiProperty()
  @IsUUID(4)
  id: string
}
