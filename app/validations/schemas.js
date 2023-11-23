const Joi = require("joi");

const loginSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  user_password: Joi.string()
    .min(8)
    // .regex(
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    //   "password"
    // )
    .required()
    .label("Password"),
  // .error((errors) => {
  //   errors.forEach((err) => {
  //     switch (err.type) {
  //       case "any.empty":
  //         err.message = passwordRequired;
  //         break;

  //       case "string.min":
  //         err.message = "minimum 8 characters ";
  //         break;

  //       case "string.regex":
  //         err.message = passwordInvalid;
  //         break;

  //       default:
  //     }
  //   });
  //   return errors;
  // }),
});

module.exports = {
  loginSchema,
};
