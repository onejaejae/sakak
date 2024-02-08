import { Configurations } from './index';

export const configurations = (): Configurations => {
  const currentEnv = process.env.NODE_ENV;

  return {
    APP: {
      PORT: process.env.PORT,
      ENV: currentEnv,
      NAME: process.env.NAME,
      BASE_URL: process.env.BASE_URL,
    },
    DB: {
      DB_HOST: process.env.DB_HOST,
      DB_USER_NAME: process.env.DB_USER_NAME,
      DB_PASSWORD: process.env.DB_PASSWORD,
      DB_DATABASE: process.env.DB_DATABASE,
      DB_PORT: process.env.DB_PORT || 5432,
    },
  };
};
