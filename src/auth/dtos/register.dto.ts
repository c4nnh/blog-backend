import { Optional } from '@nestjs/common'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsEmail, IsString } from 'class-validator'
import { UserEntity } from '../../users/entities/user.entity'

export class RegisterDto
  implements Pick<UserEntity, 'email' | 'name' | 'password' | 'avatarUrl'>
{
  @IsEmail()
  @ApiProperty()
  email: string

  @IsString()
  @Transform(({ value }) => value.trim())
  @ApiProperty()
  name: string

  @IsString()
  @Transform(({ value }) => value.trim())
  @ApiProperty()
  password: string

  @IsString()
  @Transform(({ value }) => value.trim())
  @Optional()
  @ApiPropertyOptional()
  avatarUrl: string
}
