import { Module } from '@nestjs/common'
import { AuthModule } from 'src/auth/auth.module'
import { NewsFeedController } from './news-feed.controller'
import { PostsController } from './posts.controller'
import { PostsService } from './posts.service'

@Module({
  imports: [AuthModule],
  controllers: [PostsController, NewsFeedController],
  providers: [PostsService],
})
export class PostsModule {}
