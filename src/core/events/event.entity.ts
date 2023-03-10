import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { EventStatusEnum } from "../../enums/event-status.enum";
import { EventsGenderEnum } from "../../enums/events-gender.enum";
import { ParticipantsEntity } from "../participants/participants.entity";

@Entity('events')
export class EventEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("character varying")
  image: string;

  @Column("character varying")
  title: string;

  @Column("text")
  description: string;

  @Column("character varying", { name: 'event_place' })
  eventPlace: string;

  @Column("integer", { name: 'people_need' })
  peopleNeed: number;

  @Column("integer", { name: 'people_joined' })
  peopleJoined: number;

  @Column("character varying")
  status: EventStatusEnum;

  @Column("timestamp without time zone", { name: 'start_at' })
  startAt: Date;

  @Column("character varying")
  gender: EventsGenderEnum;

  @OneToMany(() => ParticipantsEntity,participant => participant.event)
  users: ParticipantsEntity[];
}