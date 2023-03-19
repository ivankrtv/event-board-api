import { UserEntity } from '../users/user.entity';

export interface AuthUserRepositoryInterface {
  getByEmail(email: string): Promise<UserEntity>;
  setRefreshToken(userId: number, token: string): Promise<void>;
}
