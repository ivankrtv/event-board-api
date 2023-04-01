import { Global, Module } from '@nestjs/common';

import { JwtService } from './infrastructure/managers/jwt.service';

@Global()
@Module({
  providers: [JwtService],
  exports: [JwtService],
})
export class GlobalModule {}
