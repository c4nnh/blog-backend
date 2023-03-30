import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsEmail, IsString } from 'class-validator'
import { UserEntity } from '../../users/entities/user.entity'

export class LoginDto implements Pick<UserEntity, 'email' | 'password'> {
  @IsEmail()
  @ApiProperty()
  email: string

  @IsString()
  @Transform(({ value }) => value.trim())
  @ApiProperty()
  password: string
}
