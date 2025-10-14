import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { join } from 'node:path';
import { readFileSync } from 'node:fs';
import * as dotenv from 'dotenv';

dotenv.config();

const sslOption =
  process.env.DB_SSL_REJECT_UNAUTHORIZED === 'true'
    ? {
        rejectUnauthorized: true,
        ca: readFileSync(join(process.cwd(), 'certs', 'global-bundle.pem')).toString(),
      }
    : false;

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT || '5432', 10),
  username: process.env.POSTGRES_USER || 'anicondbdev',
  password: process.env.POSTGRES_PASSWORD || '<PASSWORD>',
  database: process.env.POSTGRES_DB || 'aniConDBDev',
  synchronize: process.env.DATABASE_SYNC === 'true',
  logging: process.env.DATABASE_LOGGING === 'true',
  entities: [join(__dirname, '**', '*.entity.{ts,js}')],
  migrations: [join(__dirname, 'migrations', '*.{ts,js}')],
  migrationsTableName: 'migrations',
  ssl: sslOption,
});

export default AppDataSource;
