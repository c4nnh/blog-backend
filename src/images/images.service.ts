import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as dayjs from 'dayjs'
import admin from 'firebase-admin'
import { ERROR } from 'src/utils'
import { v4 as uuidv4 } from 'uuid'
import { UploadImageDto } from './dtos/upload-image.dto'
import { CreateSignedUrlResponse } from './responses/create-signed-url.response'

@Injectable()
export class ImagesService {
  constructor(private readonly configService: ConfigService) {}

  createSignedUrl = async (
    folder: string,
    dto: UploadImageDto
  ): Promise<CreateSignedUrlResponse> => {
    try {
      const bucketName = this.configService.get('FIREBASE_BUCKET_NAME')
      const { fileName, fileType } = dto
      const ts = dayjs().format('yyyyMMDDHHmmssSSSS')
      const id = `${folder}/${uuidv4()}_${ts}_${fileName}`

      const res = await admin
        .storage()
        .bucket(bucketName)
        .file(id)
        .getSignedUrl({
          version: 'v4',
          action: 'write',
          expires: new Date().getTime() + 1000 * 60 * 1, // 2 minutes
          contentType: fileType,
        })

      if (!res.length) {
        throw new InternalServerErrorException(
          ERROR.IMAGE.CREATE_SIGNED_URL_FAILED
        )
      }

      const url = await admin.storage().bucket().file(id).publicUrl()

      await admin.storage().bucket().file(id).delete({
        ignoreNotFound: true,
      })

      return {
        uploadUrl: res[0],
        publicUrl: url,
      }
    } catch {
      throw new InternalServerErrorException(
        ERROR.IMAGE.CREATE_SIGNED_URL_FAILED
      )
    }
  }
}
