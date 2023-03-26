import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

import { JwtService } from '../../infrastructure/managers/jwt.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject(JwtService) private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.transformToken(request.headers.authorization);

    const user = this.jwtService.verifyAccess(token);
    request['user'] = user;
    return true;
  }

  private transformToken(token: string): string {
    return token.split(' ')[1];
  }
}
