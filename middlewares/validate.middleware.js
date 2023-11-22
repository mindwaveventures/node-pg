const validate = (schema) => (req, res, next) => {
  const { value, error } = schema.validate(req.body);
  if (error) {
    return next({
      status: 400,
      message: " error from validation",
    });
  }

  req.body = value;
  next();
};

module.exports = {
  validate,
};
