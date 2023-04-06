import { EventEntity } from '../events/event.entity';

export interface FileEventRepositoryInterface {
  getOne(id: number): Promise<EventEntity>;
}
