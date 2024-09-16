const RouletteHistory = require('../models/RouletteHistory');
const RouletteView = require('../views/RouletteView');

class HotCommand {
  static async execute(message) {
    try {
      const history = await RouletteHistory.getInstance();
      const hotNumbers = history.getHotNumbers();
      const response = RouletteView.createHotNumbersView(hotNumbers);
      message.reply(response);
    } catch (error) {
      message.reply(`Error al obtener los números calientes: ${error.message}`);
    }
  }
}

module.exports = HotCommand;