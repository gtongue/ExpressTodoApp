"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var todoRouter_1 = require("./routers/todoRouter");
var Server = /** @class */ (function () {
    function Server() {
        this.app = express();
        this.config();
        this.routes();
    }
    Server.prototype.config = function () {
        // mongoose.Promise = global.Promise;;
        mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/TodoApp").then(function () {
            console.log("Connected to mongodb");
        }, function (err) {
            console.error("Problem connecting to mongodb database");
        });
        this.app.use(bodyParser.json());
        // this.app.use(bodyParser.urlencoded({extended: true}));
        // this.app.use(logger('dev'));
        // this.app.use(compression());
        // this.app.use(helmet());
        // this.app.use(cors());
    };
    Server.prototype.routes = function () {
        var router;
        router = express.Router();
        this.app.use('/', router);
        this.app.use('/api/todos', todoRouter_1.default);
        // this.app.use('/api/todos')
    };
    return Server;
}());
exports.default = new Server().app;
