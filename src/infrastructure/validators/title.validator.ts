import { applyDecorators } from '@nestjs/common';
import {
  IsString,
  MaxLength,
  MinLength,
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

function TitleValidate(validationOptions?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: ['title'],
      validator: {
        validate(value: string, validationArguments?: ValidationArguments): boolean {
          const titleRegExp = new RegExp('^[A-Za-zА-Я-а-яЁё0-9 .,]{0,30}$');
          return titleRegExp.test(value);
        },
      },
    });
  };
}

function TitleDeserialize(property?: { nonEmpty: boolean }) {
  const isNonEmpty = property?.nonEmpty ?? true;
  const decoratorsArray = [IsString(), MaxLength(30, { message: 'error epta' }), TitleValidate({ message: 'reg' })];
  if (isNonEmpty) {
    decoratorsArray.push(MinLength(1, { message: 'expected no empty string' }));
  }
  return applyDecorators(...decoratorsArray);
}

export { TitleDeserialize, TitleValidate };
