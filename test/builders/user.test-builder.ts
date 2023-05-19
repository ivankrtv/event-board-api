import * as jwt from 'jsonwebtoken';

import { UserEntity } from '../../src/domain/users/user.entity';
import { GenderEnum } from '../../src/enums/gender.enum';
import dataSource from '../../configs/datasource';
import { Configuration, loadConfig } from '../../configs/configuration';

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

    this.configs = loadConfig();
  }

  public userData: UserEntity = new UserEntity();
  public authToken = '';
  private configs: Configuration;

  public async build(): Promise<UserTestBuilder> {
    await dataSource.initialize();
    this.userData = await dataSource.manager.save<UserEntity>(this.userData);
    await dataSource.destroy();

    this.authToken = jwt.sign(
      {
        id: this.userData.id,
        gender: this.userData.gender,
        dormitory: this.userData.dormitory,
      },
      this.configs.JWT.accessSecret,
      { expiresIn: this.configs.JWT.accessExpiresIn },
    );

    return this;
  }
}
