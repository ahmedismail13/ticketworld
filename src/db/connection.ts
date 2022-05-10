import { DataSource } from 'typeorm';

const env = process.env.NODE_ENV || 'development';

export const dbConnection = new DataSource({
  // url: process.env.DATABASE_URL,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  type: 'postgres',
  synchronize: true,
  logging: true,
  entities: [env === 'production' ? 'dist/entities/*{.ts,.js}' : 'src/entities/*{.ts,.js}'],
});
