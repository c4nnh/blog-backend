import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { createHash } from 'crypto'
import { PrismaService } from 'src/database/prisma.service'
import { UserEntity } from 'src/users/entities/user.entity'
import { ERROR } from 'src/utils'
import { LoginDto } from './dtos/login.dto'
import { RefreshTokenDto } from './dtos/refresh-token.dto'
import { RegisterDto } from './dtos/register.dto'
import { LoginResponse } from './responses/login.response'
import { RegisterResponse } from './responses/register.response'
import { TokenResponse } from './responses/token.response'
import { TokenPayload } from './types/token-payload.type'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService
  ) {}

  verifyToken(token: string): TokenPayload {
    try {
      return this.jwtService.verify(token)
    } catch {
      throw new UnauthorizedException(ERROR.AUTH.EXPIRED_TOKEN)
    }
  }

  async register(dto: RegisterDto): Promise<RegisterResponse> {
    const checkEmail = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    })

    if (checkEmail) throw new ConflictException(ERROR.AUTH.EXISTED_EMAIL)

    return this.prisma.$transaction(async tx => {
      const user = await tx.user.create({
        data: {
          ...dto,
          password: this.hashPassword(dto.password),
        },
      })

      delete user.password

      const token = this.genToken(user)

      return {
        user,
        token,
      }
    })
  }

  async login(dto: LoginDto): Promise<LoginResponse> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    })

    if (!user) throw new NotFoundException(ERROR.AUTH.NOT_FOUND_EMAIL)

    const { password, ...restUser } = user

    const hashPass = this.hashPassword(dto.password)
    if (hashPass !== password)
      throw new UnauthorizedException(ERROR.AUTH.INCORRECT_PASSWORD)

    return {
      user: restUser,
      token: this.genToken(user),
    }
  }

  async refreshToken({
    refreshToken,
  }: RefreshTokenDto): Promise<RegisterResponse> {
    const token: TokenPayload = this.verifyToken(refreshToken)

    const user = await this.prisma.user.findFirst({
      where: {
        id: token.id,
      },
    })

    delete user.password

    return {
      user: user,
      token: this.genToken(user),
    }
  }

  private genToken(dto: Pick<UserEntity, 'id' | 'role'>): TokenResponse {
    const { id, role } = dto

    return {
      accessToken: this.jwtService.sign({ id, role }),
      refreshToken: this.jwtService.sign(
        {
          id,
          role,
        },
        {
          expiresIn: this.configService.get('JWT_REFRESH_EXPIRED'),
        }
      ),
    }
  }

  private hashPassword(pass: string): string {
    const firstHash = createHash('md5').update(pass).digest('hex')
    return createHash('md5').update(firstHash).digest('hex')
  }
}
