import { DataSource } from 'typeorm';

const env = process.env.NODE_ENV || 'development';

export const dbConnection = new DataSource({
  url: process.env.DATABASE_URL,
  type: 'postgres',
  synchronize: true,
  logging: true,
  entities: [env === 'production' ? 'dist/entities/*{.ts,.js}' : 'src/entities/*{.ts,.js}'],
});
