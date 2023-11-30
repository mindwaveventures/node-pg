const Joi = require("joi");

const itemAddSchema = Joi.object({
  item_name: Joi.string().required(),
  item_content: Joi.string().required(),
  item_price: Joi.number().required(),
  item_count: Joi.number().required(),
});

const updateItemSchema = Joi.object({
  item_content: Joi.string().required(),
});
module.exports = {
  itemAddSchema,
  updateItemSchema,
};
