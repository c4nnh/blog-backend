import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class UploadImageDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  fileName: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  fileType: string
}
