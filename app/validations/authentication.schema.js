const Joi = require("joi");

const signUpSchema = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().allow(""),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  username: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9^_-]{8,20}$"))
    .required(),
  user_password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9!@#$%^&*_]{8,20}$"))
    .required(),
  phone_no: Joi.string().allow("").pattern(new RegExp("^[0-9]{7,15}$")),
});

const updateUserSchema = Joi.object({
  first_name: Joi.string().optional(),
  last_name: Joi.string().optional(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .optional(),
  username: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9^_-]{8,20}$"))
    .optional(),
  user_password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9!@#$%^&*_]{8,20}$"))
    .optional(),
  phone_no: Joi.string()
    .allow("")
    .pattern(new RegExp("^[0-9]{7,15}$"))
    .optional(),
});

module.exports = {
  signUpSchema,
  updateUserSchema,
};
