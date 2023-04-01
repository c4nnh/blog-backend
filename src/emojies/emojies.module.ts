import { Module } from '@nestjs/common'
import { AuthModule } from 'src/auth/auth.module'
import { EmojiesController } from './emojies.controller'
import { EmojiesService } from './emojies.service'

@Module({
  imports: [AuthModule],
  providers: [EmojiesService],
  controllers: [EmojiesController],
})
export class EmojiesModule {}
