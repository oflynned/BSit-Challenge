const Joi = require("joi");

const schema = Joi.object().keys({
  hp: Joi.number().min(0),
  hpperlevel: Joi.number().min(0),
  mp: Joi.number().min(0),
  mpperlevel: Joi.number().min(0),
  movespeed: Joi.number().min(0),
  armor: Joi.number().min(0),
  armorperlevel: Joi.number().min(0),
  spellblock: Joi.number().min(0),
  spellblockperlevel: Joi.number().min(0),
  attackrange: Joi.number().min(0),
  hpregen: Joi.number().min(0),
  hpregenperlevel: Joi.number().min(0),
  mpregen: Joi.number().min(0),
  mpregenperlevel: Joi.number().min(0),
  crit: Joi.number().min(0),
  critperlevel: Joi.number().min(0),
  attackdamage: Joi.number().min(0),
  attackdamageperlevel: Joi.number().min(0),
  attackspeedoffset: Joi.number().min(-1).max(1),
  attackspeedperlevel: Joi.number().min(0)
});

export default schema;
