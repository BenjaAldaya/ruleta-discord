const User = require('../models/User');
const RouletteController = require('../controllers/RouletteController');
const BetManager = require('../models/BetManager');
const RouletteLock = require('../models/RouletteLock');

class BetCommand {
  static async execute(message, args) {
    if (RouletteLock.isLocked()) {
      return message.reply("La ruleta está girando. No se pueden hacer apuestas en este momento.");
    }

    if (args.length !== 2) {
      return message.reply('Uso correcto: !apostar <tipo> <cantidad>');
    }

    const [betType, amount] = args;
    const validBetTypes = ['rojo', 'negro', 'par', 'impar', 'alta', 'baja', 'verde'];

    if (!validBetTypes.includes(betType) && isNaN(betType)) {
      return message.reply('Tipo de apuesta inválido. Tipos válidos: rojo, negro, par, impar, alta, baja, verde, o un número del 0 al 36.');
    }

    if (isNaN(amount) || parseInt(amount) <= 0) {
      return message.reply('La cantidad debe ser un número positivo.');
    }

    try {
      const user = await User.findOrCreate(message.author.id, message.author.username);
      const response = await RouletteController.placeBet(user, betType, parseInt(amount));
      
      // Añadir la apuesta al BetManager
      const bet = { user, type: betType, amount: parseInt(amount) };
      BetManager.addBet(user.id, bet);
      
      message.reply(response);
    } catch (error) {
      message.reply(`Error al realizar la apuesta: ${error.message}`);
    }
  }
}

module.exports = BetCommand;