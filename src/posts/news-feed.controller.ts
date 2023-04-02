import { Controller, Get, Query, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger'
import { User } from '@prisma/client'
import { AuthGuard } from 'src/auth/auth.guard'
import { CurrentUser, PaginationQueries } from 'src/utils'
import { PostsService } from './posts.service'
import { GetPostsResponse } from './responses/get-posts.response'

@Controller('news-feed')
@UseGuards(AuthGuard)
@ApiTags('Post')
@ApiBearerAuth()
export class NewsFeedController {
  constructor(private readonly service: PostsService) {}

  @Get()
  @ApiResponse({
    type: GetPostsResponse,
  })
  newsFeed(@Query() queries: PaginationQueries, @CurrentUser() user: User) {
    return this.service.getMany(user.id, queries)
  }
}
