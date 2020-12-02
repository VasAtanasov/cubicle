const express = require('express');
const config = require('config');
const BadRequestError = require('../../error/errors');

const router = express.Router();
const userService = require('../../services/user-service');
const c = require('config');

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

    userService.userModel.find({}).then(coll => coll.forEach(user =>{
      console.log(user);
      let a =5 ;
    }));

    const isUsername = await userService
      .existsByUsername(username)
      .catch(() => res.render('register', { errorMessage: 'Something went wrong.', username }));
    if (isUsername) {
      res.render('register', { errorMessage: 'Username is taken.', username });
    }

    userService
      .registerUser(username, password)
      .then(() => res.redirect('/login'))
      .catch(() => res.render('register', { errorMessage: 'Something went wrong.', username }));
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
