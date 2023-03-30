import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'
import { DatabaseModule } from './database/database.module'
import { ImagesModule } from './images/images.module'
import { PostsModule } from './posts/posts.module'
import { UsersModule } from './users/users.module'

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    AuthModule,
    ImagesModule,
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    PostsModule,
  ],
})
export class AppModule {}
