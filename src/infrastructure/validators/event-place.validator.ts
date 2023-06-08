import { applyDecorators } from '@nestjs/common';
import { IsString, Length, registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

function EventPlaceValidate(validationOptions?: ValidationOptions) {
  const EventPlaceRedExpString = new RegExp('^[A-Za-zА-Я-а-яЁё0-9 .,/-]{1,100}$');

  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [propertyName],
      validator: {
        validate(value: string, validationArguments?: ValidationArguments): boolean {
          return EventPlaceRedExpString.test(value);
        },
        defaultMessage(validationArguments?: ValidationArguments): string {
          return `Incorrect event place string, expected string with pattern '${EventPlaceRedExpString.source}'`;
        },
      },
    });
  };
}

export function EventPlaceValidator() {
  return applyDecorators(IsString(), EventPlaceValidate());
}
