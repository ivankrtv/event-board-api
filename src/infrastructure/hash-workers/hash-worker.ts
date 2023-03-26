import { loadConfig } from '../../../configs/configuration';
import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { HashWorkerInterface } from '../../domain/managers-interfaces/hash-worker.interface';

@Injectable()
export class HashWorker implements HashWorkerInterface {
  getHash(value: string): string {
    const saltRounds = loadConfig().hash.saltRounds;
    return bcrypt.hashSync(value, saltRounds);
  }

  comparePasswords(password: string, hashPassword: string): boolean {
    return bcrypt.compareSync(password, hashPassword);
  }
}
