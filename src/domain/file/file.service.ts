import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import { FileUploadImageDto } from '../../application/DTO/file/file-upload-image.dto';
import { ImageUploadManager } from '../../infrastructure/managers/image-upload.manager';
import { FileTokenPayload } from '../types/image-info.type';
import { ImageTypesEnum } from '../../enums/image-types.enum';
import { FileUserRepositoryInterface } from '../repositories-interfaces/file.user-repository.interface';
import { FileEventRepositoryInterface } from '../repositories-interfaces/file.event-repository.interface';

@Injectable()
export class FileService {
  constructor(
    private readonly imageUploadManager: ImageUploadManager,
    @Inject('FileUserRepositoryInterface') private readonly userRepository: FileUserRepositoryInterface,
    @Inject('FileEventRepositoryInterface') private readonly eventsRepository: FileEventRepositoryInterface,
  ) {
    this.maxFileSize = 2097152; // 2mb
  }

  private readonly maxFileSize: number;

  async getUploadToken(query: FileUploadImageDto): Promise<{ token: string; expiresId: number }> {
    const payload: FileTokenPayload = {
      userId: null,
      eventId: null,
      maxImageSize: this.maxFileSize,
    };

    if (query.type === ImageTypesEnum.user) {
      const user = await this.userRepository.getOne(query.entityId);
      if (!user) {
        throw new BadRequestException('User not found');
      }
      payload.userId = query.entityId;
      return this.imageUploadManager.sign(payload);
    }

    const event = await this.eventsRepository.getOne(query.entityId);
    if (!event) {
      throw new BadRequestException('Event not found');
    }
    payload.eventId = query.entityId;
    return this.imageUploadManager.sign(payload);
  }
}
