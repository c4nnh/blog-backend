import { ApiProperty, OmitType } from '@nestjs/swagger'
import { UserEntity } from 'src/users/entities/user.entity'
import { TokenResponse } from './token.response'

export class RegisterResponse {
  @ApiProperty({
    type: TokenResponse,
  })
  token: TokenResponse

  @ApiProperty({
    type: OmitType(UserEntity, ['password']),
  })
  user: Omit<UserEntity, 'password'>
}
