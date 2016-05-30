"use strict";

var http = require('http');
var express = require('express');
var app = express();

var server = http.createServer(app);
var io = require('socket.io').listen(server);

var mongoose = require("mongoose");
require("./app/models/sensorData");
require("./app/models/cachedData");

var use = require('use-import').load();
var config = use("config");

var port = config.port;

console.log("server configuration: " + JSON.stringify(config));

// Connect to mongodb
var connect = function () {
    var options = { server: { socketOptions: { keepAlive: 1 } } };
    console.log("connecting to " + config.binaryDataMongoUri);
    mongoose.connect(config.binaryDataMongoUri, options);
};
connect();

mongoose.connection.on("disconnected", function(){
    console.log("mongodb disconnected");
    connect();
});

mongoose.connection.on("connected", function(){
    console.log("mongodb connected");
});

mongoose.connection.on("error", function(err) {
    console.log("Could not connect to mongodb");
    console.log(err);
});

// Bootstrap application settings
require("./config/express")(app);

// Bootstrap routes
require("./config/routes")(app, io);

console.log("App started on port " + port);
//app.listen(port);
server.listen(port);

module.exports = app;