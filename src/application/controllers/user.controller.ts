import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { UserRegistrationDto } from '../DTO/users/user-registration.dto';
import { UserService } from '../../domain/users/user.service';
import { Auth } from '../../infrastructure/decorators/auth.decorator';
import { UpdateImageDto } from '../DTO/users/update-image.dto';
import { GetMethod } from '../../../docs/api/common/methods/get-method.decorator';
import { GetProfileInfoResponseDto } from '../DTO/users/get-profile-info-response.dto';
import { RequestWithUser } from '../types/request-with-user.type';

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

  @ApiOkResponse({ type: GetProfileInfoResponseDto, description: 'Краткая информация пользователя' })
  @GetMethod('/profile-info', 'Get profile info', true)
  async getProfileInfo(@Req() req: RequestWithUser) {
    return await this.userService.getProfileInfo(req.user.id);
  }
}
