const express = require('express');
const public = require('./routes/public.routes');

module.exports = function () {
  const app = express.Router();
  public(app);
  return app;
};
