import { commonController, usersTag } from './openapi';
import { DomainErrorDto } from './errors/domain-error.dto';
import { ValidationErrorDto } from './errors/validation-error.dto';
import { ForbiddenErrorDto } from './errors/forbidden-error.dto';
import { NotFoundErrorDto } from './errors/not-found-error.dto';
import { UpdateImageDto } from '../../src/application/DTO/users/update-image.dto';
import { UnauthorizedErrorDto } from './errors/unauthorized-error.dto';
import { GetProfileInfoResponseDto } from '../../src/application/DTO/users/get-profile-info-response.dto';

const usersController = commonController.createController('/user', [usersTag]);

usersController.addApiMethod('/image', {
  method: 'POST',
  title: 'Обновить аватар',
  description: 'Метод для обновления аватара профиля пользователя',
  isImplemented: false,
  requiresAuthorization: true,
  requestBody: UpdateImageDto,
  responses: {
    '200': [],
    '400': [DomainErrorDto, ValidationErrorDto],
    '401': [UnauthorizedErrorDto],
    '403': [ForbiddenErrorDto],
    '404': [NotFoundErrorDto],
  },
});

usersController.addApiMethod('/profile-info', {
  method: 'GET',
  title: 'Информация о профиле',
  description: 'Метод для получения информации профиля',
  isImplemented: false,
  requiresAuthorization: true,
  responses: {
    '200': [GetProfileInfoResponseDto],
    '400': [DomainErrorDto, ValidationErrorDto],
    '401': [UnauthorizedErrorDto],
    '403': [ForbiddenErrorDto],
    '404': [NotFoundErrorDto],
  },
});
