const express = require('express');
const config = require('config');

const router = express.Router();
const userService = require('../../services/user-service');

module.exports = function (app) {
  app.use('/', router);

  router.get('/', (req, res) => {
    res.render('index');
  });

  router.get('/register', (req, res) => {
    res.render('register');
  });

  router.post('/register', async (req, res) => {
    const { username, password, repeatPassword } = req.body;
    if (password !== repeatPassword) {
      res.render('register', { errorMessage: "Passwords don't match!" });
      return;
    }

    const isUsername = await userService.existsByUsername(username);

    

    userService
      .registerUser(username, password)
      .then(() => res.redirect('/login'))
      .catch(() => res.render('register', { errorMessage: 'Username is taken.' }));
  });

  router.get('/login', (req, res) => {
    res.render('login');
  });

  router.get('/about', function (req, res) {
    res.render('about');
  });

  router.get('*', function (req, res) {
    res.render('404');
  });
};
