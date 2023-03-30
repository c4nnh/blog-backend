import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory, Reflector } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import admin, { ServiceAccount } from 'firebase-admin'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get(ConfigService)

  app.enableCors()
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    })
  )

  const fbAdminConfig: ServiceAccount = {
    projectId: configService.get('FIREBASE_PROJECT_ID'),
    privateKey: configService.get('FIREBASE_PRIVATE_KEY'),
    clientEmail: configService.get('FIREBASE_CLIENT_EMAIL'),
  }

  try {
    admin.initializeApp({
      credential: admin.credential.cert(fbAdminConfig),
      storageBucket: configService.get('FIREBASE_BUCKET_NAME'),
    })

    admin
      .storage()
      .bucket(configService.get('FIREBASE_BUCKET_NAME'))
      .setCorsConfiguration([
        {
          origin: ['*'],
          method: ['*'],
          maxAgeSeconds: 3600,
          responseHeader: ['Content-Type', 'Access-Control-Allow-Origin'],
        },
      ])
      .then(() => {
        admin
          .storage()
          .bucket(configService.get('FIREBASE_BUCKET_NAME'))
          .makePublic()
      })
  } catch (e) {
    console.log(e)
    console.error('Can not create firebase admin app')
  }

  const config = new DocumentBuilder()
    .setTitle('Blog')
    .setDescription('The blog API description')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('swagger', app, document)

  app.setGlobalPrefix('api')

  const port = configService.get<number>('PORT') || 3000

  await app.listen(port, () =>
    console.log(`Server is listening on port ${port}`)
  )
}
bootstrap()
