const User = require('../models/User');
const Bet = require('../models/Bet');
const RouletteView = require('../views/RouletteView');
const RouletteHistory = require('../models/RouletteHistory');

class RouletteController {

    static async initialize() {
        const history = await RouletteHistory.getInstance();
        for (let i = 0; i < 100; i++) {
          const result = Math.floor(Math.random() * 37);
          await history.addResult(result);
        }
        console.log('Ruleta inicializada con 100 giros de calentamiento.');
      }

      static async placeBet(user, betType, amount) {
        if (user.balance < amount) {
          throw new Error('Saldo insuficiente');
        }
        const newBalance = await user.updateBalance(-amount);
        return RouletteView.createBetConfirmation(user, betType, amount, newBalance);
      }

      static async spin(result, bets) {
        const processedBets = [];
        const history = await RouletteHistory.getInstance();
        await history.addResult(result);
    
        for (let bet of bets) {
          const won = this.checkWin(result, bet.type);
          let winnings = 0;
          if (won) {
            winnings = this.calculateWinnings(bet.type, bet.amount);
          }
          const newBalance = await bet.user.updateBalance(won ? winnings : 0);
          processedBets.push({
            user: bet.user,
            type: bet.type,
            amount: bet.amount,
            won,
            winnings,
            newBalance
          });
        }
    
        const hotNumbers = history.getHotNumbers();
        const coldNumbers = history.getColdNumbers();
    
        return RouletteView.createSpinResult(result, processedBets, hotNumbers, coldNumbers);
      }

      static checkWin(result, betType) {
        const resultNum = parseInt(result);
        switch (betType) {
          case 'rojo':
            return RouletteView.redNumbers.has(resultNum);
          case 'negro':
            return resultNum !== 0 && !RouletteView.redNumbers.has(resultNum);
          case 'par':
            return resultNum !== 0 && resultNum % 2 === 0;
          case 'impar':
            return resultNum % 2 !== 0;
          case 'alta':
            return resultNum >= 19 && resultNum <= 36;
          case 'baja':
            return resultNum >= 1 && resultNum <= 18;
          case 'verde':
            return resultNum === 0;
          default:
            return betType === result;
        }
      }

  static calculateWinnings(betType, amount) {
    switch (betType) {
      case 'rojo':
      case 'negro':
      case 'par':
      case 'impar':
      case 'alta':
      case 'baja':
        return amount * 2;  // Paga 1:1
      case 'verde':
        return amount * 36;  // Paga 35:1
      default:
        return amount * 36;  // Apuesta a un número específico, paga 35:1
    }
  }
}

module.exports = RouletteController;