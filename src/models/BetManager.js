class BetManager {
    constructor() {
      this.activeBets = new Map();
    }
  
    addBet(userId, bet) {
      if (!this.activeBets.has(userId)) {
        this.activeBets.set(userId, []);
      }
      this.activeBets.get(userId).push(bet);
    }
  
    getBets() {
      return Array.from(this.activeBets.values()).flat();
    }
  
    clearBets() {
      this.activeBets.clear();
    }
  }
  
  module.exports = new BetManager();