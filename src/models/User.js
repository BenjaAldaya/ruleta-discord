const Database = require('../database/Database');

class User {
  constructor(id, username, balance = 1000) {
    this.id = id;
    this.username = username;
    this.balance = balance;
  }

  static async findOrCreate(id, username) {
    let user = await Database.getUser(id);
    if (!user) {
      user = new User(id, username);
      await Database.saveUser(user);
    } else {
      user = new User(user.id, username, user.balance);
      if (user.username !== username) {
        user.username = username;
        await Database.updateUser(user);
      }
    }
    return user;
  }

  async updateBalance(amount) {
    this.balance += amount;
    await Database.updateUser(this);
    return this.balance;
  }
}

module.exports = User;