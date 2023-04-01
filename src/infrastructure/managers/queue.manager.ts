import { Injectable } from '@nestjs/common';
import * as amqplib from 'amqplib';
import { ConfigService } from '@nestjs/config';

import { EventsCardDto } from '../../application/DTO/events/events-card.dto';
import { EventEntity } from '../../domain/events/event.entity';
import { QueueManagerInterface } from '../../domain/managers-interfaces/queue-manager.interface';

@Injectable()
export class QueueManager implements QueueManagerInterface {
  constructor(private readonly configService: ConfigService) {
    this.hostname = configService.get<string>('rabbit.host');
    this.queueName = configService.get<string>('rabbit.queueName');
    this.username = configService.get<string>('rabbit.username');
    this.password = configService.get<string>('rabbit.password');
    this.port = configService.get<number>('rabbit.port');
  }

  private readonly username: string;
  private readonly password: string;
  private readonly port: number;
  private readonly hostname: string;
  private readonly queueName: string;

  async sendMessage(event: EventEntity): Promise<void> {
    const conn = await amqplib.connect(`amqp://${this.username}:${this.password}@${this.hostname}:${this.port}`);
    const eventData = new EventsCardDto(event);

    const channel = await conn.createChannel();
    await channel.assertQueue(this.queueName, { durable: false });
    await channel.sendToQueue(this.queueName, Buffer.from(JSON.stringify(eventData)));

    conn.close();
  }
}
