// Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const commentsPath = path.join(__dirname, 'comments.json');
const comments = require('./comments.json');

app.use(bodyParser.json());

// Get all comments
app.get('/comments', (req, res) => {
  res.json(comments);
});

// Get a comment by id
app.get('/comments/:id', (req, res) => {
  const id = req.params.id;
  const comment = comments.find(comment => comment.id === id);
  res.json(comment);
});

// Add a comment
app.post('/comments', (req, res) => {
  const newComment = req.body;
  comments.push(newComment);
  fs.writeFile(commentsPath, JSON.stringify(comments, null, 2), (err) => {
    if (err) {
      res.status(500).json({ message: 'An error occurred' });
    } else {
      res.json(newComment);
    }
  });
});

// Update a comment
app.put('/comments/:id', (req, res) => {
  const id = req.params.id;
  const updatedComment = req.body;
  const commentIndex = comments.findIndex(comment => comment.id === id);
  comments[commentIndex] = updatedComment;
  fs.writeFile(commentsPath, JSON.stringify(comments, null, 2), (err) => {
    if (err) {
      res.status(500).json({ message: 'An error occurred' });
    } else {
      res.json(updatedComment);
    }
  });
});

// Delete a comment
app.delete('/comments/:id', (req, res) => {
  const id = req.params.id;
  const commentIndex = comments.findIndex(comment => comment.id === id);
  comments.splice(commentIndex, 1);
  fs.writeFile(commentsPath, JSON.stringify(comments, null, 2), (err) => {
    if (err) {
      res.status(500).json({ message: 'An error occurred' });
    } else {
      res.json({ message: 'Comment deleted' });
    }
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});