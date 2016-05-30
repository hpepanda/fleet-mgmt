'use strict';

var use = require('use-import').load();
var config = use('config');

var app = require('express')();
var mongoose = require('mongoose');

var sensorData = require('./app/models/sensorData'),
    urbePlatformQuiz = require('./app/models/urbePlatformQuiz'),
    cachedData = require('./app/models/cachedData');


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


require('./config/express')(app);
require('./config/routes')(app);

app.listen(process.env.PORT || config.port);

module.exports = app;