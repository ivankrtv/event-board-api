import { ApiProperty } from '@nestjs/swagger';
import { EventsGenderEnum } from '../../../enums/events-gender.enum';

export class CreateEventDto {
  @ApiProperty({ example: 'Мафия на 12 человек' })
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  eventPlace: string;

  @ApiProperty()
  peopleNeed: number;

  @ApiProperty({ example: '2023-11-20T18:00:00' })
  startAt: Date;

  @ApiProperty({ enum: EventsGenderEnum })
  gender: EventsGenderEnum;
}
