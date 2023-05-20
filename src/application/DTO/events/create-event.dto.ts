import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';

import { EventsGenderEnum } from '../../../enums/events-gender.enum';
import { EventCategory } from '../../../enums/event-category';
import { EventMood } from '../../../enums/event-mood';
import { TitleDeserialize } from '../../../infrastructure/deserializers/title.deserializer';
import { ApiTitleProperty } from '../../../infrastructure/decorators/api/common/title-property.decorator';

export class CreateEventDto {
  @TitleDeserialize()
  @ApiTitleProperty()
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

  @IsDate()
  @Type(() => Date)
  @ApiProperty({ example: '2023-11-20T18:00:00' })
  startAt: Date;

  @ApiProperty({ enum: EventsGenderEnum })
  gender: EventsGenderEnum;
}
