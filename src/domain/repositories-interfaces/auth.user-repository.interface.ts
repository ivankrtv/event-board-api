import { UserEntity } from '../users/user.entity';

export interface AuthUserRepositoryInterface {
  getByEmail(email: string): Promise<UserEntity | null>;
  getOne(id: string): Promise<UserEntity>;
}
