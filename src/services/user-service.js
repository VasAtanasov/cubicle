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
    const query = await this.userModel.findOne({ username: username }).exec(function (err, user) {
      // if (err) return handleError(err);
      return !!user;
    });
    return query;
  }
}

module.exports = new UserService();
