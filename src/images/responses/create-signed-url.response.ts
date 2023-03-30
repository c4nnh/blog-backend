import { ApiProperty } from '@nestjs/swagger'

export class CreateSignedUrlResponse {
  @ApiProperty()
  uploadUrl: string

  @ApiProperty()
  publicUrl: string
}
