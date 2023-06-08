import dataSource from '../../../configs/datasource';

export async function truncateDatabase(): Promise<void> {
  await dataSource.initialize();
  const entities = dataSource.entityMetadatas;

  for (const entity of entities) {
    // const repository = dataSource.getRepository(entity.name);
    await dataSource.manager.query(`TRUNCATE TABLE "${entity.tableName}" RESTART IDENTITY CASCADE;`);
  }

  await dataSource.destroy();
}
