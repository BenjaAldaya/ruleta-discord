const RouletteHistory = require('../models/RouletteHistory');
const RouletteView = require('../views/RouletteView');

class ColdCommand {
  static async execute(message) {
    try {
      const history = await RouletteHistory.getInstance();
      const coldNumbers = history.getColdNumbers();
      const response = RouletteView.createColdNumbersView(coldNumbers);
      message.reply(response);
    } catch (error) {
      message.reply(`Error al obtener los números fríos: ${error.message}`);
    }
  }
}

module.exports = ColdCommand;