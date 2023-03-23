import { UserEntity } from '../users/user.entity';

export interface AuthUserRepositoryInterface {
  getByEmail(email: string): Promise<UserEntity>;
  getOne(id: number): Promise<UserEntity>;
}
