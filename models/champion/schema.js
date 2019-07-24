import StatsSchema from "./stats/schema";
import SpriteSchema from "./sprite/schema";

const Joi = require("joi");

const schema = Joi.object().keys({
  id: Joi.string().required(),
  key: Joi.string().required(),
  name: Joi.string().required(),
  title: Joi.string().required(),
  tags: Joi.array().items(Joi.string().required()).required(),
  stats: StatsSchema,
  icon: Joi.string().uri().required(),
  sprite: SpriteSchema,
  description: Joi.string().required()
});

export default schema;
