const { db, init } = require('./db');
init();

db.serialize(() => {
  db.run("INSERT INTO progress(update_text, team_member, status) VALUES ('Closed Q2 books', 'Alice', 'Done');");
  db.run("INSERT INTO action_items(item_text, team_member, status) VALUES ('Prepare budget report', 'Bob', 'In Progress');");
  db.run("INSERT INTO challenges(challenge_text, team_member, status) VALUES ('Year-end backlog', 'Diane', 'Open');");
  db.run("INSERT INTO priorities(topic, team_member) VALUES ('Audit preparation', 'Carol');");
  console.log('Seed data inserted');
});
