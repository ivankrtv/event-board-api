import { UserEntity } from '../../src/domain/users/user.entity';
import { GenderEnum } from '../../src/enums/gender.enum';
import dataSource from '../../configs/datasource';
import { randomUUID } from 'crypto';

export class UserTestBuilder {
  constructor() {
    this.userData.name = 'username';
    this.userData.email = 'username@test.ru';
    this.userData.password = '$2b$10$bLwg92KWdmcpNYD22iUqoerkfg/lU6e9RSOjpiWWdpyae6587CQPC';
    this.userData.image = {
      meta: {
        size: 256000,
        name: 'avatar.jpeg',
        mimetype: 'image/jpg',
      },
      url: 'https://example/avatar.jpeg',
    };
    this.userData.dormitory = '19';
    this.userData.gender = GenderEnum.male;
    this.userData.group = '3531201/80201';
    this.userData.events = [];
  }

  public userData: UserEntity = new UserEntity();

  public async build(): Promise<UserEntity> {
    const newId = randomUUID();

    await dataSource.initialize();
    await dataSource.manager.insert(UserEntity, { id: newId, ...this.userData });
    await dataSource.destroy();

    return { id: newId, ...this.userData };
  }

  public withEmail(email: string): this {
    this.userData.email = email;
    return this;
  }
}
