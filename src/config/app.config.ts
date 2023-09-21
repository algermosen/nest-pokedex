export const EnvConfiguration = () => ({
  environment: process.env.NODE_ENV || 'dev',
  mongodbUri: process.env.MONGO_URL,
  defaultLimit: +process.env.DEFAULT_LIMIT || 7,
  defaultOffset: +process.env.DEFAULT_OFFSET || 0,
});
