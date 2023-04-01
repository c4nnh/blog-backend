import { Controller, Get, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger'
import { AuthGuard } from 'src/auth/auth.guard'
import { EmojiesService } from './emojies.service'
import { EmojiResponse } from './response/emoji.response'

@Controller('emojies')
@UseGuards(AuthGuard)
@ApiTags('Emoji')
@ApiBearerAuth()
export class EmojiesController {
  constructor(private readonly service: EmojiesService) {}

  @Get()
  @ApiResponse({ type: EmojiResponse, isArray: true })
  getAll() {
    return this.service.getAll()
  }
}
