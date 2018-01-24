const express = require("express");
const bodyParser = require("body-parser");

let { mongoose } = require('./db/mongoose');
let { Todo } = require("./models/todo");
let { User } = require("./models/user");

let app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  let todo = new Todo(req.body);
  todo.save().then((doc) => res.send(doc),(err) => {
    res.statusCode = 400;
    res.send(err.message);
  });
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }, (err) => {
        res.status(400);
        res.send(err.message);
    });
});

let port = process.env.PORT || 3000;
app.listen(3000, () => console.log(`Server started on port ${port}`));

module.exports  = {app};