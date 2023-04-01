import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UserRegistrationDto } from '../DTO/users/user-registration.dto';
import { UserService } from '../../domain/users/user.service';
import { Auth } from '../decorators/auth.decorator';

@Auth()
@ApiTags('users')
@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/registration')
  async registration(@Body() body: UserRegistrationDto): Promise<void> {
    await this.userService.registration(body);
  }
}
