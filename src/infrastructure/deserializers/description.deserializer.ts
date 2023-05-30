import { IsString, registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';
import { applyDecorators } from '@nestjs/common';

function DescriptionValidate(validationOptions?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [propertyName],
      validator: {
        validate(value: string, validationArguments?: ValidationArguments): boolean {
          const descriptionRegExp = new RegExp('^[A-Za-zА-Я-а-яЁё0-9 .,]{1,500}$');
          return descriptionRegExp.test(value);
        },
      },
    });
  };
}

function DescriptionDeserialize() {
  return applyDecorators(
    IsString(),
    DescriptionValidate({
      message: 'incorrect input text, expected characters:' + " 'A-Za-zА-Я-а-яЁё0-9 .,'" + ' no empty, length <= 500',
    }),
  );
}

export { DescriptionValidate, DescriptionDeserialize };
