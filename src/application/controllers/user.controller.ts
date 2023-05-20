import { Body, Controller, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { UserRegistrationDto } from '../DTO/users/user-registration.dto';
import { UserService } from '../../domain/users/user.service';
import { Auth } from '../../infrastructure/decorators/auth.decorator';
import { UpdateImageDto } from '../DTO/users/update-image.dto';

@Auth()
@ApiTags('users')
@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/registration')
  async registration(@Body() body: UserRegistrationDto): Promise<void> {
    await this.userService.registration(body);
  }

  @ApiOkResponse({ status: 200, description: 'Image was uploaded successful' })
  @Post('/image/update')
  async uploadAvatar(@Body() body: UpdateImageDto) {
    await this.userService.uploadAvatar(body);
  }
}
