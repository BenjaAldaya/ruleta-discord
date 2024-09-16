const User = require('./User');

class Bet {
  constructor(user, type, amount) {
    this.user = user instanceof User ? user : new User(user.id, user.username, user.balance);
    this.type = type;
    this.amount = amount;
  }

  static isValidBet(type, amount) {
    const validTypes = ['rojo', 'negro', 'par', 'impar', 'alta', 'baja'];
    const isValidNumber = Number.isInteger(Number(type)) && Number(type) >= 0 && Number(type) <= 36;
    return (validTypes.includes(type) || isValidNumber) && Number(amount) > 0;
  }
}

module.exports = Bet;