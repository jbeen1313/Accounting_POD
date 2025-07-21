const express = require('express');
const path = require('path');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/assets', express.static(path.join(__dirname, '..', 'assets')));
app.use('/', express.static(path.join(__dirname, '..', 'slides')));

db.init();

app.get('/api/progress', (req, res) => {
  db.all('progress', (err, rows) => {
    if (err) return res.status(500).json({error: err});
    res.json(rows);
  });
});

app.get('/api/actionItems', (req, res) => {
  db.all('action_items', (err, rows) => {
    if (err) return res.status(500).json({error: err});
    res.json(rows);
  });
});

app.get('/api/challenges', (req, res) => {
  db.all('challenges', (err, rows) => {
    if (err) return res.status(500).json({error: err});
    res.json(rows);
  });
});

app.get('/api/priorities', (req, res) => {
  db.all('priorities', (err, rows) => {
    if (err) return res.status(500).json({error: err});
    res.json(rows);
  });
});

app.get('/api/notes', (req, res) => {
  db.all('notes', (err, rows) => {
    if (err) return res.status(500).json({error: err});
    res.json(rows);
  });
});

app.post('/api/notes', (req, res) => {
  const { note_text, team_member } = req.body;
  db.addNote(note_text, team_member, function(err) {
    if (err) return res.status(500).json({error: err});
    res.json({ success: true });
  });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
