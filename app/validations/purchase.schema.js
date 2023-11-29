const Joi = require("joi");

const buyItemSchema = Joi.object({
  item_id: Joi.number().required(),
  user_id: Joi.number().required(),
  date_of_order: Joi.date().allow(),
  item_price: Joi.number().precision(2).required(),
  status: Joi.string().required(),
});

module.exports = { buyItemSchema };
