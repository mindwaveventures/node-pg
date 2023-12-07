const Joi = require("joi");

const buyItemSchema = Joi.object({
  item_id: Joi.string().required(),
  user_id: Joi.string().required(),
  date_of_order: Joi.date().allow(),
  order_status: Joi.string().required(),
});

module.exports = { buyItemSchema };
