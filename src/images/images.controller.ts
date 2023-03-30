import { Body, Controller, Post } from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { IMAGE_FOLDER } from 'src/utils'
import { UploadImageDto } from './dtos/upload-image.dto'
import { ImagesService } from './images.service'
import { CreateSignedUrlResponse } from './responses/create-signed-url.response'

@Controller('images')
@ApiTags('Image')
export class ImagesController {
  constructor(private readonly service: ImagesService) {}

  @Post('signed-url')
  @ApiResponse({
    type: CreateSignedUrlResponse,
    status: 201,
  })
  createSignedUrlForAsset(@Body() dto: UploadImageDto) {
    return this.service.createSignedUrl(IMAGE_FOLDER.AVATAR, dto)
  }
}
