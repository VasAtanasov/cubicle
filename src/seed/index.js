const User = require('../models/user');
const Cube = require('../models/cube');
const mongoose = require('mongoose');
const config = require('config');
const fs = require('fs');
const util = require('util');
const readDir = util.promisify(fs.readdir);
const path = require('path');

mongoose.set('useCreateIndex', true);

const env = 'development';
const dbUrl = config.get(`${env}.database.dbUrl`);

function toTitleCase(str) {
  return str.replace(/\w\S*/g, txt => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

const models = {
  user: User,
  cube: Cube,
};

async function seedDatabase(runSaveMiddleware = false) {
  const dir = await readDir(__dirname);
  const seedFiles = dir.filter(f => f.endsWith('.seed.js'));

  for (const file of seedFiles) {
    const fileName = file.split('.seed.js')[0];
    const modelName = toTitleCase(fileName);
    const model = models[fileName];

    // if (!model) throw new Error(`Cannot find Model '${modelName}'`);
    if (!model) continue;
    const fileContents = require(path.join(__dirname, file));

    runSaveMiddleware ? await model.create(fileContents) : await model.insertMany(fileContents);
  }
}

async function dropAllCollections() {
  const collections = Object.values(models).map(m => m.collection);
  for (const collection of collections) {
    try {
      await collection.drop();
    } catch (error) {
      // Sometimes this error happens, but you can safely ignore it
      if (error.message === 'ns not found') return;
      // This error occurs when you use it.todo. You can
      // safely ignore this error too
      if (error.message.includes('a background operation is currently running')) return;
      console.log(error.message);
    }
  }
}

(async () => {
  try {
    await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
    await dropAllCollections();
    await seedDatabase(true);
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.connection.close();
  }
})();
