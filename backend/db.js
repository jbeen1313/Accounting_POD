const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.join(__dirname, 'meeting.db');

const db = new sqlite3.Database(dbPath);

function init() {
  db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS progress (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      update_text TEXT,
      team_member TEXT,
      status TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );`);
    db.run(`CREATE TABLE IF NOT EXISTS action_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      item_text TEXT,
      team_member TEXT,
      status TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );`);
    db.run(`CREATE TABLE IF NOT EXISTS challenges (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      challenge_text TEXT,
      team_member TEXT,
      status TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );`);
    db.run(`CREATE TABLE IF NOT EXISTS notes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      note_text TEXT,
      team_member TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );`);
    db.run(`CREATE TABLE IF NOT EXISTS priorities (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      topic TEXT,
      team_member TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );`);
  });
}

function all(table, cb) {
  db.all(`SELECT * FROM ${table} ORDER BY created_at DESC`, cb);
}

function addNote(text, member, cb) {
  db.run('INSERT INTO notes(note_text, team_member) VALUES (?, ?)', [text, member], cb);
}

module.exports = { db, init, all, addNote };
