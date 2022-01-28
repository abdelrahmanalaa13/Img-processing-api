"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var imgListRouter_1 = require("./api/imgListRouter");
var express = require("express");
var imgRouter_1 = require("./api/imgRouter");
var routes = express.Router();
routes.use("/imgList", imgListRouter_1.default);
routes.use("/imgs", imgRouter_1.default);
exports.default = routes;
