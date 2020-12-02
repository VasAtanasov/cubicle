const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');
const routes = require('../api');

module.exports = app => {
  app.get('/status', (req, res) => {
    res.status(200).end();
  });
  app.head('/status', (req, res) => {
    res.status(200).end();
  });
  app.use(express.static(path.resolve(global.__basedir, '..', 'public')));
  app.engine('.hbs', handlebars({ extname: '.hbs' }));
  app.set('view engine', '.hbs');
  app.set('views', path.join(global.__basedir, 'views'));
  app.use(express.urlencoded({ extended: true }));
  app.use(routes());
  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err['status'] = 404;
    next(err);
  });
  app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
      return res.status(err.status).send({ message: err.message }).end();
    }
    return next(err);
  });
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
      },
    });
  });
};
