import { EventsGenderEnum } from '../../../enums/events-gender.enum';
import { EventCategory } from '../../../enums/event-category';
import { EventMood } from '../../../enums/event-mood';
import { TitleDeserialize } from '../../../infrastructure/validators/title.validator';
import { ApiTitleProperty } from '../../../docs/api/common/properties/title-property.decorator';
import { DescriptionDeserialize } from '../../../infrastructure/validators/description.validator';
import { ApiDescriptionProperty } from '../../../docs/api/common/properties/description-propery.decorator';
import { ApiDateTimeProperty } from '../../../docs/api/common/properties/datetime-property.decorator';
import { DateTimeDenormalize } from '../../../infrastructure/validators/date-time.validator';
import { EventPlaceValidator } from '../../../infrastructure/validators/event-place.validator';
import { PeopleNeedValidator } from '../../../infrastructure/validators/people-need.validator';
import { EventCategoryValidator } from '../../../infrastructure/validators/event-category.validator';
import { EventMoodValidator } from '../../../infrastructure/validators/event-mood.validator';
import { GenderValidator } from '../../../infrastructure/validators/gender.validator';
import { EventPlaceProperty } from '../../../docs/api/common/properties/event-place-property.decorator';
import { PeopleNeedProperty } from '../../../docs/api/common/properties/people-need-property.decorator';
import { EventCategoryProperty } from '../../../docs/api/common/properties/event-category-property.decorator';
import { EventMoodProperty } from '../../../docs/api/common/properties/event-mood-property.decorator';
import { GenderProperty } from '../../../docs/api/common/properties/gender-property.decorator';

export class CreateEventDto {
  @TitleDeserialize()
  @ApiTitleProperty()
  title: string;

  @DescriptionDeserialize()
  @ApiDescriptionProperty()
  description: string;

  @EventPlaceValidator()
  @EventPlaceProperty()
  eventPlace: string;

  @PeopleNeedValidator()
  @PeopleNeedProperty()
  peopleNeed: number;

  @EventCategoryValidator()
  @EventCategoryProperty()
  category: EventCategory;

  @EventMoodValidator()
  @EventMoodProperty()
  mood: EventMood;

  @DateTimeDenormalize()
  @ApiDateTimeProperty({ description: 'Время начала' })
  startAt: Date;

  @GenderValidator()
  @GenderProperty()
  gender: EventsGenderEnum;
}
