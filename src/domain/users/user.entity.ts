import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { GenderEnum } from '../../enums/gender.enum';
import { ParticipantsEntity } from '../participants/participants.entity';
import { ImageInfo } from '../types/image-info.type';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: number;

  @Column('jsonb', { nullable: true })
  image: ImageInfo | null;

  @Column('character varying')
  name: string;

  @Column('character varying')
  password: string;

  @Column('character varying')
  email: string;

  @Column('character varying')
  gender: GenderEnum;

  @Column('character varying')
  group: string;

  @Column('character varying', { nullable: true })
  dormitory: string;

  @OneToMany(() => ParticipantsEntity, (participant) => participant.user)
  events: ParticipantsEntity[];
}
