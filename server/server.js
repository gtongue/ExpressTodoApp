const express = require("express");
const bodyParser = require("body-parser");

let { mongoose } = require('./db/mongoose');
let { Todo } = require("./models/todo");
let { User } = require("./models/user");

let app = express();
let port = process.env.PORT || 3000;
app.listen(3000, () => console.log(`Server started on port ${port}`));