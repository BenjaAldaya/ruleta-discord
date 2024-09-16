const User = require('../models/User');
const RouletteView = require('../views/RouletteView');

class BalanceCommand {
  static async execute(message) {
    try {
      const user = await User.findOrCreate(message.author.id, message.author.username);
      const response = RouletteView.createBalanceView(user);
      message.reply(response);
    } catch (error) {
      message.reply(`Error al obtener el balance: ${error.message}`);
    }
  }
}

module.exports = BalanceCommand;