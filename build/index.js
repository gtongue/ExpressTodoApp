"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = require("./server");
var port = parseInt(process.env.PORT) || 3000;
server_1.default.listen(port, function () {
    console.log("Server started on port " + port);
});
server_1.default.on("error", function (err) {
    console.error(err);
});
