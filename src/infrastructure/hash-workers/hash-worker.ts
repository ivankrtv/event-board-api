import { loadConfig } from '../../../configs/configuration';
import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HashWorker {
  getHash(value: string): string {
    const saltRounds = loadConfig().hash.saltRounds;
    return bcrypt.hashSync(value, saltRounds);
  }
}
