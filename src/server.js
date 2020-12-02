const config = require('config');
const chalk = require('chalk');
const mongoose = require('mongoose');
const express = require('express');

console.log(process.env.NODE_ENV);

const env = process.env.NODE_ENV || 'development';
!process.env.NODE_ENV && console.log(chalk.red(`NODE_ENV is "${process.env.NODE_ENV}", env set to "development"`));
console.log(chalk.magenta(`Current node env is: "${env}"`));
global.__basedir = __dirname;
global.__env = env;

const port = config.get(`${env}.port`);
const app = express();
require('./config/express')(app);

const startApp = () => {
  app.listen(port, () => {
    console.log(chalk.yellow('.......................................'));
    console.log(chalk.green(config.get(`${env}.name`)));
    console.log(chalk.green(`Port:\t\t${config.get(`${env}.port`)}`));
    console.log(chalk.green(`Mode:\t\t${config.get(`${env}.mode`)}`));
    console.log(chalk.green('database connection is established'));
    console.log(chalk.bgMagenta(chalk.white(`Listening on port ${port}! Now its up to you...`)));
    console.log(chalk.yellow('.......................................'));
  });
};

(async () => {
  await mongoose.connect(config.get(`${env}.database.dbUrl`), {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });
  startApp();
})();
