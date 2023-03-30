import { Body, Controller, Post, Put } from '@nestjs/common'
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { LoginDto } from './dtos/login.dto'
import { RefreshTokenDto } from './dtos/refresh-token.dto'
import { RegisterDto } from './dtos/register.dto'
import { LoginResponse } from './responses/login.response'
import { RefreshTokenResponse } from './responses/refresh-token.response'
import { RegisterResponse } from './responses/register.response'

@Controller()
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('register')
  @ApiBody({
    type: RegisterDto,
  })
  @ApiResponse({
    type: RegisterResponse,
  })
  register(@Body() dto: RegisterDto) {
    return this.service.register(dto)
  }

  @Post('login')
  @ApiBody({
    type: LoginDto,
  })
  @ApiResponse({
    type: LoginResponse,
    status: 200,
  })
  login(@Body() dto: LoginDto) {
    return this.service.login(dto)
  }

  @Put('refresh-token')
  @ApiBody({
    type: RefreshTokenDto,
  })
  @ApiResponse({
    type: RefreshTokenResponse,
  })
  refreshToken(@Body() dto: RefreshTokenDto) {
    return this.service.refreshToken(dto)
  }
}
