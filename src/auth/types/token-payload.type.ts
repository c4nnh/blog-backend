import { UserRole } from '@prisma/client'

export type TokenPayload = {
  id: string
  role: UserRole
}
