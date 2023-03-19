import { EventEntity } from '../events/event.entity';

export interface QueueManagerInterface {
  sendMessage(event: EventEntity): Promise<void>;
}
