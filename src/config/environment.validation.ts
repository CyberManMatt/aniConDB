import * as Joi from 'joi';

export default Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'test').required(),
  PORT: Joi.number().default(3000),
  POSTGRES_USER: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
  POSTGRES_DB: Joi.string().required().default('aniConDBDev'),
  DATABASE_HOST: Joi.string().required().default('localhost'),
  DATABASE_PORT: Joi.number().required().default(5432),
  DATABASE_SYNC: Joi.boolean().required().default(true),
  DATABASE_AUTO_LOAD: Joi.boolean().required().default(true),
  DATABASE_LOGGING: Joi.boolean().required().default(true),
  JWT_SECRET: Joi.string().required(),
  JWT_TOKEN_AUDIENCE: Joi.string().required(),
  JWT_TOKEN_ISSUER: Joi.string().required(),
  JWT_ACCESS_TOKEN_TTL: Joi.number().required().default(3600), // Default to 1 hour
  JWT_REFRESH_TOKEN_TTL: Joi.number().required().default(604800), // Default to 7 days
});
