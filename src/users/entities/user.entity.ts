import { ApiProperty } from '@nestjs/swagger'
import { User, UserRole, UserStatus } from '@prisma/client'
import { Exclude } from 'class-transformer'

export class UserEntity implements User {
  @ApiProperty()
  id: string

  @ApiProperty()
  name: string

  @ApiProperty()
  email: string

  @Exclude()
  password: string

  @ApiProperty()
  role: UserRole

  @ApiProperty()
  status: UserStatus

  @ApiProperty()
  avatarUrl: string

  @ApiProperty()
  createdAt: Date

  @ApiProperty()
  updatedAt: Date
}
