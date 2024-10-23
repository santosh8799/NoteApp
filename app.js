const express = require('express');
const app = express();
const fs = require('fs');

// Set view engine to ejs
app.set('view engine', 'ejs');

// Home page
app.get('/', (req, res) => {
  fs.readdir('./notes', (err, data) => {
    res.render('index', {files: data});
  });
});

// New note
app.get('/new', (req, res) => {
  res.render('new');
});

// Create new note
app.get('/new-note', (req, res) => {
  fs.writeFile(`./notes/${req.query.title}.txt`, `${req.query.description}`, (err) => {
    res.redirect('/');
  });
})

// Note details
app.get('/notes/:title', (req, res) => {
  const title = req.params.title;
  fs.readFile(`./notes/${title}`, 'utf8', (err, data) => {
    res.render('noteDetails', {note: data});
  });
})

// Edit note
app.get('/edit/:title', (req, res) => {
  const title = req.params.title;
  fs.readFile(`./notes/${title}`, 'utf8', (err, data) => {
    res.render('edit', {
      title: title,
      description: data
    });
  });
})

// Update note
app.get('/edit-note/:oldTitle', (req, res) => {
  const oldTitle = req.params.oldTitle;
  const newTitle = req.query.title;
  const description = req.query.description;

  fs.rename(`./notes/${oldTitle}`, `./notes/${newTitle}`, (err) => {
    fs.writeFile(`./notes/${newTitle}`, description, (err) => {
      res.redirect('/');
    });
  });
})

// Delete note
app.get('/delete/:title', (req, res) => {
  const title = req.params.title;
  fs.unlink(`./notes/${title}`, (err) => {
    res.redirect('/');
  });
})

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});


