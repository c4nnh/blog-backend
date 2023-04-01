import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'
import { DatabaseModule } from './database/database.module'
import { ImagesModule } from './images/images.module'
import { PostsModule } from './posts/posts.module'
import { UsersModule } from './users/users.module'
import { CommentsModule } from './comments/comments.module';
import { ReactsModule } from './reacts/reacts.module';
import { EmojiesModule } from './emojies/emojies.module';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    AuthModule,
    ImagesModule,
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    PostsModule,
    CommentsModule,
    ReactsModule,
    EmojiesModule,
  ],
})
export class AppModule {}
