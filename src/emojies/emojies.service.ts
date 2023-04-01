import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/database/prisma.service'
import { EmojiResponse } from './response/emoji.response'

@Injectable()
export class EmojiesService {
  constructor(private readonly prisma: PrismaService) {}

  getAll(): Promise<EmojiResponse[]> {
    return this.prisma.emoji.findMany()
  }
}
