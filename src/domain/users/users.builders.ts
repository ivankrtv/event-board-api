import { Injectable } from '@nestjs/common';
import { GenderEnum } from '../../enums/gender.enum';
import { UserEntity } from './user.entity';
import { UserRegistrationDto } from '../../application/DTO/users/user-registration.dto';

@Injectable()
export class UsersBuilders {
  buildUserEntity(body: UserRegistrationDto, password: string): UserEntity {
    const user = new UserEntity();
    user.name = body.name;
    user.email = body.email;
    user.password = password;
    user.group = body.group;
    user.gender = body.gender;
    user.dormitory = body.dormitory;

    return user;
  }
}
