import { OmitType } from '@nestjs/swagger'
import { CommentResponse } from './comment.response'

export class CreateCommentResponse extends OmitType(CommentResponse, [
  'user',
]) {}
