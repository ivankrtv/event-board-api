import { UserEntity } from '../users/user.entity';

export interface FileUserRepositoryInterface {
  getOne(id: number): Promise<UserEntity>;
}
