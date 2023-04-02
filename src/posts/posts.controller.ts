import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { User } from '@prisma/client'
import { AuthGuard } from 'src/auth/auth.guard'
import { CurrentUser, GetByIdParams } from 'src/utils'
import { CreatePostDto } from './dtos/create-post.dto'
import { UpdatePostDto } from './dtos/update-post.dto'
import { PostsService } from './posts.service'
import { GetPostsQueries } from './queries/get-posts.query'
import { CreatePostResponse } from './responses/create-post.response'
import { GetPostsResponse } from './responses/get-posts.response'
import { PostResponse } from './responses/post.response'
import { UpdatePostResponse } from './responses/update-post.response'

@Controller('posts')
@UseGuards(AuthGuard)
@ApiTags('Post')
@ApiBearerAuth()
export class PostsController {
  constructor(private readonly service: PostsService) {}

  @Post()
  @ApiBody({ type: CreatePostDto })
  @ApiResponse({
    type: CreatePostResponse,
  })
  create(@Body() dto: CreatePostDto, @CurrentUser() user: User) {
    return this.service.create(user.id, dto)
  }

  @Get()
  @ApiResponse({
    type: GetPostsResponse,
  })
  getMany(@Query() queries: GetPostsQueries, @CurrentUser() user: User) {
    return this.service.getMany(user.id, {
      ...queries,
      userId: queries.userId ?? user.id,
    })
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: GetByIdParams,
  })
  @ApiResponse({
    type: PostResponse,
  })
  getById(@Param('id') id: string) {
    return this.service.getById(id)
  }

  @Put(':id')
  @ApiParam({
    name: 'id',
    type: GetByIdParams,
  })
  @ApiBody({ type: UpdatePostDto })
  @ApiResponse({
    type: UpdatePostResponse,
  })
  update(
    @Param('id') postId: string,
    @Body() dto: UpdatePostDto,
    @CurrentUser() user: User
  ) {
    return this.service.update(user.id, postId, dto)
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: GetByIdParams,
  })
  @ApiResponse({
    type: Boolean,
  })
  delete(@Param('id') postId: string, @CurrentUser() user: User) {
    return this.service.delete(user.id, postId)
  }
}
