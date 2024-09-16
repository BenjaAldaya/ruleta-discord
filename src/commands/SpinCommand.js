const RouletteController = require('../controllers/RouletteController');
const BetManager = require('../models/BetManager');

class SpinCommand {
  static async execute(message) {
    try {
      const activeBets = BetManager.getBets();

      if (activeBets.length === 0) {
        return message.reply('No hay apuestas activas para girar la ruleta.');
      }

      const result = await RouletteController.spin(activeBets);
      message.channel.send(result);

      BetManager.clearBets();
    } catch (error) {
      message.reply(`Error al girar la ruleta: ${error.message}`);
    }
  }
}

module.exports = SpinCommand;