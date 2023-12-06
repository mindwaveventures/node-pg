const Joi = require("joi");

const addFavSchema = Joi.object({
  item_id: Joi.string().required(),
  user_id: Joi.string().required(),
});

module.exports = { addFavSchema };
