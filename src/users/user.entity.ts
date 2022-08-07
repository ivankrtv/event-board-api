import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { GenderEnum } from "../enums/gender.enum";
import { ParticipantsEntity } from "../participants/participants.entity";

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("character varying")
  name: string;

  @Column("character varying")
  password: string;

  @Column("character varying")
  email: string;

  @Column("character varying")
  gender: GenderEnum;

  @Column("character varying")
  group: string;

  @Column("character varying")
  dormitory: string;

  @OneToMany(() => ParticipantsEntity, participant => participant.user)
  events: ParticipantsEntity[]
}