import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/database/prisma.service'
import { ERROR } from 'src/utils'
import { MeResponse } from './response/me.response'

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async me(userId: string): Promise<MeResponse> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    })

    if (!user) throw new NotFoundException(ERROR.USER.NOT_FOUND)

    delete user.password

    return user
  }
}
