const Joi = require('joi');

exports.loginRegisterSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
