import { Injectable } from '@nestjs/common';
import { DataSource, QueryRunner } from 'typeorm';

@Injectable()
export abstract class BaseTransaction {
  protected constructor(protected readonly dataSource: DataSource) {}

  async startTransaction(): Promise<QueryRunner> {
    const queryRunner = await this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    return queryRunner;
  }
}
