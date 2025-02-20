import { DataSource, DataSourceOptions } from 'typeorm';
import { join } from 'path';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5435,
  username: 'postgres',
  password: '3119',
  database: 'musicShop',
  entities: [join(__dirname, '/**/*.entity.{ts,js}')],
  migrations: [join(__dirname, '/migrations/*.{ts,js}')],
  synchronize: false,
};

export const AppDataSource = new DataSource(dataSourceOptions);
