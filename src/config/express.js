const express = require('express');
const bodyParser = require('body-parser');
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
  app.engine(
    '.hbs',
    handlebars({
      extname: '.hbs',
      runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
      },
    }),
  );
  app.set('view engine', '.hbs');
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.set('views', path.join(global.__basedir, 'views'));
  app.use(routes());
};
