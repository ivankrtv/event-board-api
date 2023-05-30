import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsPositive, IsString, Length, Max, MaxLength, Min } from 'class-validator';

import { EventsGenderEnum } from '../../../enums/events-gender.enum';
import { EventCategory } from '../../../enums/event-category';
import { EventMood } from '../../../enums/event-mood';
import { TitleDeserialize } from '../../../infrastructure/deserializers/title.deserializer';
import { ApiTitleProperty } from '../../../infrastructure/decorators/api/common/title-property.decorator';
import { DescriptionDeserialize } from '../../../infrastructure/deserializers/description.deserializer';
import { ApiDescriptionProperty } from '../../../infrastructure/decorators/api/common/description-propery.decorator';
import { ApiDateTimeProperty } from '../../../infrastructure/decorators/api/common/datetime-property.decorator';
import { DateTimeDenormalize } from '../../../infrastructure/deserializers/date-time.deserializer';

export class CreateEventDto {
  @TitleDeserialize()
  @ApiTitleProperty()
  title: string;

  @DescriptionDeserialize()
  @ApiDescriptionProperty()
  description: string;

  @ApiProperty()
  eventPlace: string;

  @ApiProperty()
  peopleNeed: number;

  @ApiProperty({ enum: EventCategory })
  category: EventCategory;

  @ApiProperty({ enum: EventMood })
  mood: EventMood;

  @DateTimeDenormalize()
  @ApiDateTimeProperty({ description: 'Время начала' })
  startAt: Date;

  @ApiProperty({ enum: EventsGenderEnum })
  gender: EventsGenderEnum;
}
