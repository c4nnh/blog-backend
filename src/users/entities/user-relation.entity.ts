import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { UserEntity } from './user.entity'

export class UserRelationEntity
  implements Pick<UserEntity, 'id' | 'name' | 'avatarUrl'>
{
  @ApiProperty()
  id: string

  @ApiProperty()
  name: string

  @ApiPropertyOptional()
  avatarUrl: string
}
