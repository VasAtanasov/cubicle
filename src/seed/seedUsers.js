const User = require('../models/user');
const mongoose = require('mongoose');
const config = require('config');

const env = 'development';
const dbUrl = config.get(`${env}.database.dbUrl`);
mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    User.collection.drop();

    User.insertMany([
      {
        username: 'admin',
        password: '1234',
      },
      {
        username: 'user',
        password: '12345',
      },
    ])
      .then(user => {
        console.log(`${user.length} users created`);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        mongoose.connection.close();
      });
  })
  .catch(console.error);
