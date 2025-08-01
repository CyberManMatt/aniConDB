import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  host: process.env.DATABASE_HOST || 'localhost',
  port: process.env.DATABASE_PORT || 5432,
  username: process.env.POSTGRES_USER || 'anicondbdev',
  password: process.env.POSTGRES_PASSWORD || '<PASSWORD>',
  name: process.env.POSTGRES_DB || 'aniCOnDBDev',
  synchronize: process.env.DATABASE_SYNC === 'true' ? true : false,
  autoLoadEntities: process.env.DATABASE_AUTO_LOAD === 'true' ? true : false,
  logging: process.env.DATABASE_LOGGING === 'true' ? true : false,
}));
