import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { EventStatusEnum } from '../../enums/event-status.enum';
import { EventsGenderEnum } from '../../enums/events-gender.enum';
import { ParticipantsEntity } from '../participants/participants.entity';
import { EventCategory } from '../../enums/event-category';
import { EventMood } from '../../enums/event-mood';

@Entity('events')
export class EventEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('character varying', { nullable: true })
  image: string;

  @Column('character varying')
  title: string;

  @Column('text')
  description: string;

  @Column('character varying', { name: 'event_place' })
  eventPlace: string;

  @Column('integer', { name: 'people_need' })
  peopleNeed: number;

  @Column('integer', { name: 'people_joined' })
  peopleJoined: number;

  @Column('character varying')
  category: EventCategory;

  @Column('character varying')
  mood: EventMood;

  @Column('character varying', { nullable: true })
  dormitory: string;

  @Column('character varying')
  status: EventStatusEnum;

  @Column('timestamp without time zone', { name: 'start_at' })
  startAt: Date;

  @Column('character varying')
  gender: EventsGenderEnum;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @OneToMany(() => ParticipantsEntity, (participant) => participant.event)
  participants: ParticipantsEntity[];
}
