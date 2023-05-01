import dataSource from '../configs/datasource';

async function clearDatabase(): Promise<void> {
  await dataSource.initialize().catch(err => console.log('Error connection: ', err));

  const entities = dataSource.entityMetadatas;
  if (entities.length < 1) {
    throw new Error('Entities not found');
  }

  for (const entity of entities) {
    const repository = dataSource.getRepository(entity.name);
    await repository.query(`TRUNCATE TABLE ${entity.tableName} RESTART IDENTITY CASCADE;`);
    console.log(entity.tableName, 'DONE')
  }

  await dataSource.destroy();
}

clearDatabase();
