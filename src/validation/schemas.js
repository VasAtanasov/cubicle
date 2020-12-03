const joi = require('joi');

module.exports = {
  registerSchema: joi.object().keys({
    username: joi.string().required().min(3),
    password: joi.string().required().min(5).alphanum(),
    repeatPassword: joi.string().required().min(5).alphanum(),
  }),
  loginSchema: joi.object().keys({
    username: joi.string().required(),
    password: joi.string().required(),
  }),
};
