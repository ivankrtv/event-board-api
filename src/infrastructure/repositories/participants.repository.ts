import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { ParticipantsEntity } from '../../domain/participants/participants.entity';

@Injectable()
export class ParticipantsRepository {
  constructor(
    @InjectRepository(ParticipantsEntity)
    private readonly repo: Repository<ParticipantsEntity>,
  ) {}
}
