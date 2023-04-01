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
import { CommentsService } from './comments.service'
import { CreateCommentDto } from './dtos/create-comment.dto'
import { UpdateCommentDto } from './dtos/update-comment.dto'
import { GetCommentsQueries } from './queries/get-comments.query'
import { CreateCommentResponse } from './responses/create-comment.response'
import { GetCommentsResponse } from './responses/get-comments.response'
import { UpdateCommentResponse } from './responses/update-comment.response'

@Controller('comments')
@UseGuards(AuthGuard)
@ApiTags('Comment')
@ApiBearerAuth()
export class CommentsController {
  constructor(private readonly service: CommentsService) {}

  @Post()
  @ApiBody({
    type: CreateCommentDto,
  })
  @ApiResponse({
    type: CreateCommentResponse,
  })
  create(@CurrentUser() user: User, @Body() dto: CreateCommentDto) {
    return this.service.create(user.id, dto)
  }

  @Get()
  @ApiResponse({
    type: GetCommentsResponse,
  })
  getMany(@Query() queries: GetCommentsQueries) {
    return this.service.getMany(queries)
  }

  @Put(':id')
  @ApiParam({
    name: 'id',
    type: GetByIdParams,
  })
  @ApiBody({
    type: UpdateCommentDto,
  })
  @ApiResponse({
    type: UpdateCommentResponse,
  })
  update(
    @Param('id') commentId: string,
    @Body() dto: UpdateCommentDto,
    @CurrentUser() user: User
  ) {
    return this.service.update(user.id, commentId, dto)
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: GetByIdParams,
  })
  @ApiResponse({
    type: Boolean,
  })
  delete(@Param('id') commentId: string, @CurrentUser() user: User) {
    return this.service.delete(user.id, commentId)
  }
}
