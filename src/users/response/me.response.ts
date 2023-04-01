import { OmitType } from '@nestjs/swagger'
import { UserEntity } from 'src/users/entities/user.entity'

export class MeResponse extends OmitType(UserEntity, ['password']) {}
