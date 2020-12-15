const PORT = process.env.PORT || 3001;

const express = require('express');
const app = express();

const fs = require('fs');
const path = require('path');

const { notes } = require('./Develop/db/db.json');

// MIDDLEWARE
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
// define paths to corresponding front-end files in the public folder like css and images
app.use(express.static(path.join(__dirname, './Develop/public')));

function createNewNote(body, notesArray) {
  const note = body;
  notesArray.push(note);
  fs.writeFileSync(
    path.join(__dirname, './Develop/db/db.json'),
    JSON.stringify({ notes: notesArray }, null, 2)
  );
  return note;
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './Develop/public/index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './Develop/public/notes.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './Develop/public/index.html'));
});

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});