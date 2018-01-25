"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bodyParser = require("body-parser");
var compression = require("compression");
var cors = require("cors");
var express = require("express");
var helmet = require("helmet");
var mongoose = require("mongoose");
var logger = require("morgan");
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
            console.error("Problem connecting to mongodb database", err.message);
        });
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(logger("dev"));
        this.app.use(compression());
        this.app.use(helmet());
        this.app.use(cors());
    };
    Server.prototype.routes = function () {
        var router;
        router = express.Router();
        // this.app.use('/', router);
        this.app.use("/api/todos", todoRouter_1.default);
        // this.app.use('/api/todos')
    };
    return Server;
}());
exports.default = new Server().app;
//# sourceMappingURL=server.js.map