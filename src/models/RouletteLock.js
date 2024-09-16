class RouletteLock {
    constructor() {
      this.isSpinning = false;
    }
  
    lock() {
      this.isSpinning = true;
    }
  
    unlock() {
      this.isSpinning = false;
    }
  
    isLocked() {
      return this.isSpinning;
    }
  }
  
  module.exports = new RouletteLock();