import {UserEntity} from "../../domain/users/user.entity";
import {GenderEnum} from "../../enums/gender.enum";
import dataSource from "../../../configs/datasource";

export class UserTestBuilder {
    constructor() {
    }

    private static createUser(): UserEntity {
        const user = new UserEntity();
        user.email = 'test@test.ru';
        user.gender = GenderEnum.male;
        user.password = 'lafhdgdsflldkfhgkjlsdhfjg';
        user.dormitory = '14a';
        user.group = '3531201/80201';
        user.name = 'Test';
        user.image = null;
        return user;
    }

    public getAuthData(): { login: string, password: string } {
        return {
            login: 'test@test.ru',
            password: '12345678'
        }
    }

    public static async build(): Promise<UserEntity> {
        const connection = await dataSource.initialize();
        const user = this.createUser();
        const newUser = await dataSource.manager.save<UserEntity>(user);
        await dataSource.destroy();
        return newUser;
    }
}
