const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/TodoApp").then((result) => {
  console.log("Connected to mongo database");
}, (err) => {
  console.log("Problem connecting to mongodb database");
});
module.exports = { mongoose };