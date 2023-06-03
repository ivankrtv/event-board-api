import { UserEntity } from '../../src/domain/users/user.entity';
import { GenderEnum } from '../../src/enums/gender.enum';
import dataSource from '../../configs/datasource';

export class UserTestBuilder {
  constructor() {
    this.userData.name = 'username';
    this.userData.email = 'username@test.ru';
    this.userData.password = '$2b$10$bLwg92KWdmcpNYD22iUqoerkfg/lU6e9RSOjpiWWdpyae6587CQPC';
    this.userData.image = null;
    this.userData.dormitory = '19';
    this.userData.gender = GenderEnum.male;
    this.userData.group = '3531201/80201';
    this.userData.events = [];
  }

  public userData: UserEntity = new UserEntity();

  public async build(): Promise<UserEntity> {
    await dataSource.initialize();
    this.userData = await dataSource.manager.save<UserEntity>(this.userData);
    await dataSource.destroy();

    return this.userData;
  }
}
