import { UserEntity } from '../users/user.entity';

export interface UserUserRepositoryInterface {
  save(user: UserEntity): Promise<UserEntity>;
  getByEmail(email: string): Promise<UserEntity>;
  getOne(id: string): Promise<UserEntity>;
}
