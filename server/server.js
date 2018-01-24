const express = require("express");
const bodyParser = require("body-parser");
const { ObjectID } = require("mongodb");
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

app.get('/todos/:id', (req, res) => {
    if(!ObjectID.isValid(req.params.id))
        return res.status(404).send("Invalid object id");

    Todo.findById(req.params.id).then((todo) => {
        if(todo){
            res.send({todo});
        }else{
            res.status(404);
            res.send("User does not exist in the database");
        }
    }, (err) => {
        res.status(404);
        res.send(err.message);
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port}`));

module.exports  = {app};