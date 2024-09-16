const RouletteView = require('../views/RouletteView');

class RouletteCommand {
  static async execute(message) {
    try {
      const randomNumber = Math.floor(Math.random() * 37);
      const rouletteArt = RouletteView.createGraphicalRoulette(randomNumber);
      message.channel.send(rouletteArt);
    } catch (error) {
      message.reply(`Error al mostrar la ruleta: ${error.message}`);
    }
  }
}

module.exports = RouletteCommand;