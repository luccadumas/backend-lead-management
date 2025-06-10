import { DataSource } from 'typeorm';
import { Lead } from '../../domain/entities/Lead';
import dotenv from 'dotenv';

if (process.env.NODE_ENV === 'development') {
  dotenv.config({ path: '.env.develop' });
} else {
  dotenv.config();
}

const isSQLite = process.env.DB_TYPE === 'sqlite';

export const AppDataSource = new DataSource(
  isSQLite
    ? {
        type: 'sqlite',
        database: process.env.DB_PATH || './dev.sqlite',
        synchronize: true,
        logging: false,
        entities: [Lead],
        migrations: [],
        subscribers: [],
      }
    : {
        type: 'mssql',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT || '1433'),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        synchronize: true,
        logging: false,
        entities: [Lead],
        migrations: [],
        subscribers: [],
        options: { encrypt: false }
      }
); 