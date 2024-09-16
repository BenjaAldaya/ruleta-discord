const Database = require('../database/Database');

class RouletteHistory {
  constructor() {
    this.results = new Array(37).fill(0);  // Inicializar todos los números (0-36) con contador 0
  }

  static async getInstance() {
    const history = new RouletteHistory();
    const savedResults = await Database.getRouletteHistory();
    savedResults.forEach(result => {
      history.results[result]++;
    });
    return history;
  }

  async addResult(number) {
    this.results[number]++;
    await Database.saveRouletteHistory(number);
  }

  getHotNumbers() {
    return this.getMostFrequent(5);
  }

  getColdNumbers() {
    return this.getMostFrequent(5, true);
  }

  getMostFrequent(count, reverse = false) {
    return this.results
      .map((count, number) => ({ number, count }))
      .filter(item => item.count > 0)  // Solo considerar números que han salido al menos una vez
      .sort((a, b) => reverse ? a.count - b.count : b.count - a.count)
      .slice(0, count)
      .map(item => item.number.toString());
  }
}

module.exports = RouletteHistory;