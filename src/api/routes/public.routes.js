const express = require('express');
const config = require('config');
const { registerSchema, loginSchema } = require('../../validation/schemas');
const router = express.Router();
const userService = require('../../services/user.service');
const cubeController = require('../../controllers/cube');

module.exports = function (app) {
  app.use('/', router);

  router.get('/', cubeController.getCubes);

  router.get('/register', (req, res) => {
    res.render('register');
  });

  router.post('/register', async (req, res) => {
    const { username, password, repeatPassword } = req.body;
    if (password !== repeatPassword) {
      res.render('register', { errorMessage: "Passwords don't match!", username });
      return;
    }

    const validation = registerSchema.validate(req.body);
    if (validation.error) {
      res.render('register', { errorMessage: validation.error.message, username });
      return;
    }

    const isUsername = await userService.existsByUsername(username);

    if (isUsername) {
      res.render('register', { errorMessage: 'Username is already taken.', username });
      return;
    }

    userService
      .registerUser(username, password)
      .then(() => res.redirect('/login'))
      .catch(() => res.render('register', { errorMessage: 'Something went wrong please try again.', username }));
  });

  router.get('/login', (req, res) => {
    res.render('login');
  });

  router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const validation = loginSchema.validate(req.body);
    if (validation.error) {
      res.render('login', { errorMessage: validation.error.message, username });
      return;
    }
  });

  router.get('/about', function (req, res) {
    res.render('about');
  });

  router.get('*', function (req, res) {
    res.render('404');
  });
};
