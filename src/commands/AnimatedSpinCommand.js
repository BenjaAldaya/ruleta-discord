const { setTimeout } = require('timers/promises');
const RouletteView = require('../views/RouletteView');
const RouletteController = require('../controllers/RouletteController');
const BetManager = require('../models/BetManager');
const RouletteLock = require('../models/RouletteLock');

class AnimatedSpinCommand {
  static async execute(message) {
    if (RouletteLock.isLocked()) {
      return message.reply("La ruleta ya está girando. Espera a que termine la ronda actual.");
    }

    RouletteLock.lock();

    const numbers = [
      '0', '32', '15', '19', '4', '21', '2', '25', '17', '34', '6', '27',
      '13', '36', '11', '30', '8', '23', '10', '5', '24', '16', '33', '1',
      '20', '14', '31', '9', '22', '18', '29', '7', '28', '12', '35', '3', '26'
    ];

    const result = Math.floor(Math.random() * 37).toString();
    const resultIndex = numbers.indexOf(result);

    let spinMessage = await message.channel.send("La ruleta comienza a girar...");
    
    // Solo 3 frames de animación
    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * numbers.length);
      let visibleNumbers = [];
      for (let j = 0; j < 11; j++) {
        visibleNumbers.push(numbers[(randomIndex + j) % numbers.length]);
      }

      const frameContent = RouletteView.createAnimationFrame(visibleNumbers, 5);
      await spinMessage.edit(frameContent);
      await setTimeout(300); // 300ms entre cada frame
    }

    // Frame final con el resultado
    const finalNumbers = [];
    for (let i = 0; i < 11; i++) {
      finalNumbers.push(numbers[(resultIndex - 5 + i + numbers.length) % numbers.length]);
    }
    await spinMessage.edit(RouletteView.createAnimationFrame(finalNumbers, 5));

    // Procesar las apuestas y mostrar los resultados
    const bets = BetManager.getBets();
    const spinResult = await RouletteController.spin(result, bets);
    await message.channel.send(spinResult);
    BetManager.clearBets();

    RouletteLock.unlock();
  }
}

module.exports = AnimatedSpinCommand;