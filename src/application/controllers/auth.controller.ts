import { Body, Controller, Get, Post, Req, Headers, Res } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';

import { AuthService } from '../../domain/auth/auth.service';
import { LoginDto } from '../DTO/auth/login.dto';
import { TokensResponseDto } from '../DTO/auth/tokens.response.dto';

@ApiTags('auth')
@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOkResponse({ type: TokensResponseDto, status: 200 })
  @Post('/login')
  async login(@Body() body: LoginDto, @Headers('user-agent') userAgent: string, @Res() response: Response) {
    const responseBody = await this.authService.login(body, userAgent, response);
    response.json(responseBody);
  }

  @ApiOkResponse({ type: TokensResponseDto, status: 200 })
  @Get('/refresh')
  async refresh(@Req() request: Request, @Headers('user-agent') userAgent: string, @Res() response: Response) {
    const responseBody = await this.authService.refresh(request, userAgent, response);
    response.json(responseBody);
  }
}
