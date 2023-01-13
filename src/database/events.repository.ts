import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {EventEntity} from "../core/events/event.entity";
import {Repository} from "typeorm";

@Injectable()
export class EventsRepository {
  constructor(
    @InjectRepository(EventEntity)
    protected repo: Repository<EventEntity>
  ) {}


}