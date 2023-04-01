import { Controller, Get, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger'
import { User } from '@prisma/client'
import { AuthGuard } from 'src/auth/auth.guard'
import { CurrentUser } from 'src/utils'
import { MeResponse } from './response/me.response'
import { UsersService } from './users.service'

@Controller()
@UseGuards(AuthGuard)
@ApiTags('User')
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get('me')
  @ApiBearerAuth()
  @ApiResponse({
    type: MeResponse,
  })
  me(@CurrentUser() user: User) {
    return this.service.me(user.id)
  }
}
