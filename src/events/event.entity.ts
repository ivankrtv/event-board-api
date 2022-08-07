import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { EventStatusEnum } from "../enums/event-status.enum";
import { EventsGenderEnum } from "../enums/events-gender.enum";
import { ParticipantsEntity } from "../participants/participants.entity";

@Entity('events')
export class EventEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("character varying")
  picture: string;

  @Column("character varying")
  title: string;

  @Column("text")
  description: string;

  @Column("character varying")
  event_place: string;

  @Column("integer")
  people_need: number;

  @Column("integer")
  people_joined: number;

  @Column("character varying")
  status: EventStatusEnum;

  @Column("timestamp without time zone")
  start_at: Date;

  @Column("character varying")
  gender: EventsGenderEnum;

  @OneToMany(() => ParticipantsEntity,
      participant => participant.event)
  users: ParticipantsEntity[]
}