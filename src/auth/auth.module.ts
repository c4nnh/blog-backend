import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { AuthController } from './auth.controller'
import { AuthGuard } from './auth.guard'
import { AuthService } from './auth.service'
import { JwtConfig } from './jwt.config'

@Module({
  imports: [
    JwtModule.registerAsync({
      useClass: JwtConfig,
    }),
  ],
  providers: [AuthService, AuthGuard],
  controllers: [AuthController],
  exports: [AuthGuard],
})
export class AuthModule {}
