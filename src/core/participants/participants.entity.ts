import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ParticipantRoleEnum } from "../../enums/participant-role.enum";
import { EventEntity } from "../events/event.entity";
import { UserEntity } from "../users/user.entity";

@Entity('participants')
export class ParticipantsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('character varying')
  role: ParticipantRoleEnum

  @ManyToOne(() => EventEntity, event => event.users)
  @JoinColumn()
  event: EventEntity;

  @ManyToOne(() => UserEntity, user => user.events)
  @JoinColumn()
  user: UserEntity;
}