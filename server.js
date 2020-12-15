const PORT = process.env.PORT || 3001;
const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const myNotes = require('./Develop/db/db.json');

// MIDDLEWARE
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
// define paths to corresponding front-end files in the public folder like css and images
app.use(express.static(path.join(__dirname, './Develop/public')));

// function createNewNote(body, notesArray) {
//   let note = body;
//   notesArray.push(note);
//   fs.writeFileSync(
//     path.join(__dirname, './Develop/db/db.json'),
//     JSON.stringify({ notes: notesArray }, null, 2)
//   );
//   return note;
// }

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './Develop/public/index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './Develop/public/notes.html'));
});

app.get('/api/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './Develop/db/db.json'))
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './Develop/public/index.html'));
});

app.post('/api/notes', (req, res) => {
  // set unique id
  req.body.id = uuidv4();

  // add note to JSON file and notes array in this function
  let newNote = myNotes;
  newNote.push(req.body);

  fs.writeFileSync(
    path.join(__dirname, './Develop/db/db.json'),
    JSON.stringify(newNote)
  );

  res.json(newNote);
});

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});