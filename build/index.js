"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var express = require("express");
var path = require("path");
var index_1 = require("./routes/index");
var port = 1313;
var app = express();
app.use('/api', index_1.default);
app.get('/', function (request, res) {
    res.status(200).send('Working!');
});
app.listen(port, function () {
    // make sure thumb folder exists
    var thumbPath = path.resolve(__dirname, '../assets/edited');
    if (!fs.existsSync(thumbPath)) {
        fs.mkdirSync(thumbPath);
    }
    console.log("Running on port ".concat(port));
});
exports.default = app;
