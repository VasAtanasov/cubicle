const express = require('express');
const { registerSchema, loginSchema } = require('../../validation/schemas');
const router = express.Router();
const userService = require('../../services/user.service');
const cubeController = require('../../controllers/cube.controller');

module.exports = function (app) {
  app.use('/', router);


};
