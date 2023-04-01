import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger'
import { User } from '@prisma/client'
import { AuthGuard } from 'src/auth/auth.guard'
import { CurrentUser } from 'src/utils'
import { CreateReactToCommentDto } from './dtos/create-react-to-comment.dto'
import { CreateReactToPostDto } from './dtos/create-react-to-post.dto'
import { ReactsService } from './reacts.service'
import { ReactToCommentResponse } from './response/react-to-comment.response'
import { ReactToPostResponse } from './response/react-to-post.response'

@Controller('reacts')
@UseGuards(AuthGuard)
@ApiTags('React')
@ApiBearerAuth()
export class ReactsController {
  constructor(private readonly service: ReactsService) {}

  @Post('to-post')
  @ApiBody({
    type: CreateReactToPostDto,
  })
  @ApiResponse({
    type: ReactToPostResponse,
  })
  reactToPost(@CurrentUser() user: User, @Body() dto: CreateReactToPostDto) {
    return this.service.reactToPost(user.id, dto)
  }

  @Post('to-comment')
  @ApiBody({
    type: CreateReactToCommentDto,
  })
  @ApiResponse({
    type: ReactToCommentResponse,
  })
  reactToComment(
    @CurrentUser() user: User,
    @Body() dto: CreateReactToCommentDto
  ) {
    return this.service.reactToComment(user.id, dto)
  }
}
