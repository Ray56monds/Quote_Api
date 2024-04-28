import Joi from "joi";

const quoteSchema = Joi.object().keys({
  text: Joi.string().min(5).max(50),
  authorId: Joi.number().integer(),
});

const authorSchema = Joi.object().keys({
  name: Joi.string().min(5).max(50).required(),
  email: Joi.string().email().required(),
  age: Joi.number().integer().min(18),
  password: Joi.string().min(8).required(),
  quoteId: Joi.number().integer(),
  role: Joi.string(),
});

const authorUpdateSchema = Joi.object().keys({
  name: Joi.string().min(5).max(50).required(),
  email: Joi.string().email().required(),
  age: Joi.number().integer().min(18),
  quoteId: Joi.number().integer(),
  role: Joi.string(),
});

const validate = (Schema)=> {
return (req, res, next) => {
  const result = Schema.validate(req.body); 
  if (result.error) {
    return res.json(result.error );
  }
  next();
}};

export {
  quoteSchema,
  authorSchema,
  authorUpdateSchema,
  validate
};