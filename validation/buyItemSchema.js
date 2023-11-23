const Joi = require("joi");

const buyItemSchema = Joi.object({
  item_id: Joi.number().required(),
  user_id: Joi.number().required(),
  date_of_order: Joi.date().required(),
  //   date_of_order: Joi.date().default(() => new Date(), "current date and time"),
  item_price: Joi.number().precision(2).required(),
  status: Joi.string().required(),
  //   item_count: Joi.number().min(1).max(10).required(),
});

module.exports = { buyItemSchema };
