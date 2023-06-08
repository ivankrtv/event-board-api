import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FileController } from '../../application/controllers/file.controller';
import { FileService } from './file.service';
import { ImageUploadManager } from '../../infrastructure/managers/image-upload.manager';
import { UsersRepository } from '../../infrastructure/repositories/users.repository';
import { EventsRepository } from '../../infrastructure/repositories/events.repository';
import { UserEntity } from '../users/user.entity';
import { EventEntity } from '../events/event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, EventEntity])],
  controllers: [FileController],
  providers: [
    FileService,
    ImageUploadManager,
    { provide: 'FileUserRepositoryInterface', useClass: UsersRepository },
    { provide: 'FileEventRepositoryInterface', useClass: EventsRepository },
  ],
})
export class FileModule {}
