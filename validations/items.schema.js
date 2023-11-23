const Joi = require("joi");
const itemaddSchema = Joi.object({
  item_name: Joi.string().required(),
  item_content: Joi.string().required(),
  price: Joi.number().required(),
  status_of_item: Joi.string().required(),
});
const updateitemSchema = Joi.object({
  item_content: Joi.string().required(),
  item_id: Joi.number().required(),
});
module.exports = {
  itemaddSchema,
  updateitemSchema,
};
