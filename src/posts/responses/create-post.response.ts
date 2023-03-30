import { OmitType } from '@nestjs/swagger'
import { PostResponse } from './post.response'

export class CreatePostResponse extends OmitType(PostResponse, ['user']) {}
