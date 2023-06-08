import { IsDate, isDateString, registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';
import * as dayjs from 'dayjs';
import { applyDecorators } from '@nestjs/common';
import { Transform, Type } from 'class-transformer';

let _dateTimeString: string;

function DateTimeFormatValidate(validationOptions?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [propertyName],
      validator: {
        validate(value: string, validationArguments?: ValidationArguments): boolean {
          if (dayjs(value).format('YYYY-MM-DDTHH:mm:ss') !== _dateTimeString) return false;
          return true;
        },
      },
    });
  };
}

function transformDateTimeInFormat(dateTimeString: string, obj: unknown) {
  _dateTimeString = dateTimeString;
  return new Date(dateTimeString);
}

function DateTimeDenormalize() {
  return applyDecorators(
    IsDate(),
    DateTimeFormatValidate({
      message: "incorrect datetime format, expected: 'YYYY-MM-DDTHH:mm:ss'",
    }),
    Transform(({ value, obj }) => transformDateTimeInFormat(value, obj)),
  );
}

export { DateTimeFormatValidate, DateTimeDenormalize };
