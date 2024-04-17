import Joi from 'joi';

const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(1024).required(),
  role: Joi.string().valid('USER', 'ADMIN'),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(1024).required(),
});

export { userSchema, loginSchema };