import { ApiProperty } from '@nestjs/swagger';
import { EventsGenderEnum } from '../../../enums/events-gender.enum';
import { EventCategory } from '../../../enums/event-category';
import { EventMood } from '../../../enums/event-mood';

export class CreateEventDto {
  @ApiProperty({ example: 'Мафия на 12 человек' })
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  eventPlace: string;

  @ApiProperty()
  peopleNeed: number;

  @ApiProperty({ enum: EventCategory })
  category: EventCategory;

  @ApiProperty({ enum: EventMood })
  mood: EventMood;

  @ApiProperty({ example: '2023-11-20T18:00:00' })
  startAt: Date;

  @ApiProperty({ enum: EventsGenderEnum })
  gender: EventsGenderEnum;
}
