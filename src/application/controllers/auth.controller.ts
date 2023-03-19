import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../../domain/auth/auth.service';
import { LoginDto } from '../DTO/auth/login.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { TokensResponseDto } from '../DTO/auth/tokens.response.dto';

@ApiTags('auth')
@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOkResponse({ type: TokensResponseDto, status: 200 })
  @Post('/login')
  async login(@Body() body: LoginDto) {
    return await this.authService.login(body);
  }
}
