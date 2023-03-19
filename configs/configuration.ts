import * as dotenv from 'dotenv';

dotenv.config();

export type DatabaseConfig = {
  host: string;
  port: string;
  database: string;
  username: string;
  password: string;
};

export type HashConfig = {
  saltRounds: number;
};

export type RabbitConf = {
  username: string;
  password: string;
  host: string;
  port: number;
  queueName: string;
};

export type JWTConf = {
  accessSecret: string;
  accessExpiresIn: number;
  refreshSecret: string;
  refreshExpiresIn: number;
};

export type Configuration = {
  db: DatabaseConfig;
  hash: HashConfig;
  rabbit: RabbitConf;
  JWT: JWTConf;
};

export const loadConfig = (): Configuration => {
  return {
    db: {
      host: process.env.DB_HOSTNAME,
      port: process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    },
    hash: {
      saltRounds: Number(process.env.HASH_SALT_ROUNDS),
    },
    rabbit: {
      username: process.env.RABBIT_USERNAME,
      password: process.env.RABBIT_PASSWORD,
      host: process.env.RABBIT_HOST,
      port: Number(process.env.RABBIT_PORT),
      queueName: process.env.RABBIT_QUEUE_NAME,
    },
    JWT: {
      accessSecret: process.env.JWT_ACCESS_SECRET,
      accessExpiresIn: Number(process.env.JWT_ACCESS_EXPIRES_IN),
      refreshSecret: process.env.JWT_REFRESH_SECRET,
      refreshExpiresIn: Number(process.env.JWT_REFRESH_EXPIRES_IN),
    },
  };
};
