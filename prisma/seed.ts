import { Prisma, PrismaClient } from '@prisma/client'
import { createHash } from 'crypto'
const prisma = new PrismaClient()

const defaultEmojies: Prisma.EmojiCreateInput[] = [
  {
    name: 'Like',
    icon: '👍',
  },
  {
    name: 'Dislike',
    icon: '👎',
  },
  {
    name: 'Wow',
    icon: '😮',
  },
  {
    name: 'Looking',
    icon: '🧐',
  },
]

async function main() {
  const password = process.env.ADMIN_PASSWORD
  const firstHash = createHash('md5').update(password).digest('hex')
  const hashedPassword = createHash('md5').update(firstHash).digest('hex')

  const adminAccount: Prisma.UserCreateInput = {
    email: process.env.ADMIN_EMAIL,
    password: hashedPassword,
    name: 'Admin',
  }

  await Promise.all([
    // create admin
    prisma.user.upsert({
      where: { email: adminAccount.email },
      update: adminAccount,
      create: adminAccount,
    }),
    ...defaultEmojies.map(dto => {
      return prisma.emoji.upsert({
        where: { name: dto.name },
        update: dto,
        create: dto,
      })
    }),
  ])
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async e => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
