import { Injectable } from '@nestjs/common';
import * as amqplib from 'amqplib';
import { loadConfig } from '../../../configs/configuration';
import { EventEntity } from '../../domain/events/event.entity';

@Injectable()
export class QueueManager {
  constructor() {
    const { rabbit } = loadConfig();
    this.hostname = rabbit.host;
    this.queueName = rabbit.queueName;
    this.username = rabbit.username;
    this.password = rabbit.password;
    this.port = rabbit.port;
  }

  private readonly username: string;
  private readonly password: string;
  private readonly port: number;
  private readonly hostname: string;
  private readonly queueName: string;

  async sendMessage(event: EventEntity) {
    const conn = await amqplib.connect(`amqp://${this.username}:${this.password}@${this.hostname}:${this.port}`);
    const channel = await conn.createChannel();
    await channel.assertQueue(this.queueName, { durable: false });
    //todo: Нужно привести event к типу EventsListDto
    await channel.sendToQueue(this.queueName, Buffer.from(JSON.stringify(event)));
  }
}
