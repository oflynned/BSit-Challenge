const Joi = require("joi");

const schema = Joi.object().keys({
  url: Joi.string().required(),
  x: Joi.number().required(),
  y: Joi.number().required()
});

export default schema;
