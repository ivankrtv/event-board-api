import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';

import { IUSConf } from '../../../configs/configuration';
import { FileTokenPayload, ImageInfo } from '../../domain/types/image-info.type';

@Injectable()
export class ImageUploadManager {
  constructor(private readonly configService: ConfigService) {
    this.conf = configService.get<IUSConf>('IUS');
  }

  private conf: IUSConf;

  sign(data: FileTokenPayload): { token: string; expiresId: number } {
    if (!data.userId && !data.eventId) {
      throw new Error('payload must have minimum one of the parameters userId | eventId');
    }

    return {
      token: jwt.sign(data, this.conf.secret, { expiresIn: this.conf.expiresIn }),
      expiresId: this.conf.expiresIn,
    };
  }

  decode(token: string): ImageInfo {
    try {
      return jwt.verify(token, this.conf.secret) as ImageInfo;
    } catch (e) {
      console.log(e);
      throw new BadRequestException('Invalid token with file info');
    }
  }
}
