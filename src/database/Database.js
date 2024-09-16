const sqlite3 = require('sqlite3').verbose();

class Database {
  constructor() {
    this.db = new sqlite3.Database('./casino.db');
    this.init();
  }

  init() {
    this.db.run(`CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      username TEXT,
      balance INTEGER
    )`);

    this.db.run(`CREATE TABLE IF NOT EXISTS roulette_history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      result INTEGER
    )`);
  }

  getUser(id) {
    return new Promise((resolve, reject) => {
      this.db.get('SELECT * FROM users WHERE id = ?', [id], (err, row) => {
        if (err) reject(err);
        resolve(row);
      });
    });
  }

  saveUser(user) {
    return new Promise((resolve, reject) => {
      this.db.run('INSERT OR REPLACE INTO users (id, username, balance) VALUES (?, ?, ?)', 
        [user.id, user.username, user.balance], 
        (err) => {
          if (err) reject(err);
          resolve();
        }
      );
    });
  }

  updateUser(user) {
    return this.saveUser(user);
  }

  getRouletteHistory() {
    return new Promise((resolve, reject) => {
      this.db.all('SELECT result FROM roulette_history ORDER BY id DESC LIMIT 100', [], (err, rows) => {
        if (err) reject(err);
        resolve(rows.map(row => row.result));
      });
    });
  }

  saveRouletteHistory(result) {
    return new Promise((resolve, reject) => {
      this.db.run('INSERT INTO roulette_history (result) VALUES (?)', [result], (err) => {
        if (err) reject(err);
        resolve();
      });
    });
  }
}

module.exports = new Database();