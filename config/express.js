'use strict';

var express = require("express");
var bodyParser = require("body-parser");

module.exports = function (app) {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json({ type: 'application/json' }));
};