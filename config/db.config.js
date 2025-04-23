import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// For __dirname compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const env = process.env.NODE_ENV || 'development';
dotenv.config({ path: path.resolve(__dirname, `../.env.${env}`) });

export default {
  HOST: process.env.DB_HOST,
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
  DB: process.env.DB_DATABASE_NAME,
  dialect: process.env.DB_DIALECT || 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};