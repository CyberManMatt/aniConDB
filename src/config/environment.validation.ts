import * as Joi from 'joi';

export default Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'test').required(),
  PORT: Joi.number().default(3000),
  POSTGRES_USER: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
  POSTGRES_DB: Joi.string().required().default('postgres'),
  DATABASE_HOST: Joi.string().required().default('localhost'),
  DATABASE_PORT: Joi.number().required().default(5432),
  DATABASE_SYNC: Joi.boolean().required(),
  DATABASE_AUTO_LOAD: Joi.boolean().required(),
  DATABASE_LOGGING: Joi.boolean().required(),
});
