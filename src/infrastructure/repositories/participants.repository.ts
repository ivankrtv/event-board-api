import { InjectRepository } from '@nestjs/typeorm';
import { ParticipantsEntity } from '../../domain/participants/participants.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ParticipantsRepository {
  constructor(
    @InjectRepository(ParticipantsEntity)
    private readonly repo: Repository<ParticipantsEntity>,
  ) {}
}
