import { Body, Controller, Post } from '@nestjs/common';
import { UserRegistrationDto } from '../DTO/users/user-registration.dto';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from '../../domain/users/user.service';

@ApiTags('users')
@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/registration')
  async registration(@Body() body: UserRegistrationDto): Promise<void> {
    await this.userService.registration(body);
  }
}
