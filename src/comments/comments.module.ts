import { Module } from '@nestjs/common'
import { AuthModule } from 'src/auth/auth.module'
import { CommentsController } from './comments.controller'
import { CommentsService } from './comments.service'

@Module({
  imports: [AuthModule],
  providers: [CommentsService],
  controllers: [CommentsController],
})
export class CommentsModule {}
