"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var mongodb_1 = require("mongodb");
var todo_1 = require("../models/todo");
var TodoRouter = /** @class */ (function () {
    function TodoRouter() {
        this.router = express_1.Router();
        this.routes();
    }
    TodoRouter.prototype.GetTodos = function (req, res) {
        todo_1.default.find().then(function (todos) {
            res.send({ todos: todos });
        }).catch(function (err) {
            res.status(400);
            res.send(err.message);
        });
    };
    TodoRouter.prototype.GetTodo = function (req, res) {
        if (!mongodb_1.ObjectID.isValid(req.params.id))
            res.status(404).send("Invalid object id");
        else {
            todo_1.default.findById(req.params.id).then(function (todo) {
                if (todo) {
                    res.send({ todo: todo });
                }
                else {
                    res.status(404);
                    res.send("Todo does not exist in the database");
                }
            }, function (err) {
                res.status(400);
                res.send(err.message);
            });
        }
    };
    TodoRouter.prototype.CreateTodo = function (req, res) {
        var todo = new todo_1.default(req.body);
        todo.save().then(function (doc) { return res.send(doc); }, function (err) {
            res.statusCode = 400;
            res.send(err.message);
        });
    };
    TodoRouter.prototype.UpdateTodo = function (req, res) {
    };
    TodoRouter.prototype.DeleteTodo = function (req, res) {
        if (!mongodb_1.ObjectID.isValid(req.params.id))
            res.status(404).send("Invalid object id");
        else {
            todo_1.default.findByIdAndRemove(req.params.id).then(function (todo) {
                if (todo) {
                    res.send({ todo: todo });
                }
                else {
                    res.status(404);
                    res.send("No todo found with that id");
                }
            }).catch(function (err) {
                res.status(400);
                res.send(err.message);
            });
        }
    };
    TodoRouter.prototype.routes = function () {
        this.router.get("/", this.GetTodos);
        this.router.get("/:id", this.GetTodo);
        this.router.post("/", this.CreateTodo);
        this.router.delete("/:id", this.DeleteTodo);
    };
    return TodoRouter;
}());
exports.default = new TodoRouter().router;
