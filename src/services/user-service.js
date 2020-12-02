class UserService {
  constructor() {
    this.userModel = require('../models/user');
  }

  async registerUser(username, password) {
    try {
      const user = await this.userModel.create({ username, password });
      return user;
    } catch (e) {
      throw e;
    }
  }

  async existsByUsername(username) {
    return await this.userModel.exists({ username: username });
  }
}

module.exports = new UserService();
