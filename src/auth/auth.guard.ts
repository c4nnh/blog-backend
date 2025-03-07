import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { UserRole } from '@prisma/client'
import { Observable } from 'rxjs'
import { ROLES_KEY } from '../utils'
import { AuthService } from './auth.service'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly reflector: Reflector
  ) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest()
    const authHeader: string = request.headers.authorization
    if (!authHeader) return false
    const match = authHeader.match(/^Bearer (?<token>.+)$/)
    if (!match || !match.groups.token) return false
    const user = this.authService.verifyToken(match.groups.token)

    if (!user) throw new UnauthorizedException('You are unauthorized')

    const roles =
      this.reflector.get<string[]>(ROLES_KEY, context.getHandler()) || []

    if (!roles.length) {
      request.user = user
      return true
    }

    if (user.role !== UserRole.ADMIN && !roles.some(r => r === user.role))
      throw new ForbiddenException('You have no permission')

    return true
  }
}
