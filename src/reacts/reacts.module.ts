import { Module } from '@nestjs/common'
import { AuthModule } from 'src/auth/auth.module'
import { ReactsController } from './reacts.controller'
import { ReactsService } from './reacts.service'

@Module({
  imports: [AuthModule],
  providers: [ReactsService],
  controllers: [ReactsController],
})
export class ReactsModule {}
