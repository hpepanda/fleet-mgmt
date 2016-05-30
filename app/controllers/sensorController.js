'use strict';

var mongoose = require('mongoose');
var Promise = require('bluebird');
var dataProcessors = require('../processors/sensorProcessorsFactory');
mongoose.Promise = Promise;

var SensorDataModel = mongoose.model('SensorData');
var CachedDataModel = mongoose.model('CachedData');

var saveSensorPromise = function(data){
    var sensor = new SensorDataModel({
        clientId: data.clientId,
        clientType: data.clientType,
        sensorType: data.sensorType,
        data: data.data,
        time: new Date()
    });

    return sensor.save();
};

var updateCachedSensorPromise = function(data){
    var filter = {
        clientId: data.clientId,
        clientType: data.clientType,
        sensorType: data.sensorType
    };

    var dataToUpdate = {
        clientId: data.clientId,
        clientType: data.clientType,
        sensorType: data.sensorType,
        data: data.data,
        time: new Date()
    };

    return CachedDataModel.findOneAndUpdate(filter, dataToUpdate, {upsert:true});
};

var saveSensorData = function(req, res, next){
    console.log('save sensor data');
    console.log(JSON.stringify(req.body));

    var data = req.body;

    if(process.env.USE_ONLY_CACHE == "true") {
        updateCachedSensorPromise(data).then(function () {
            console.log("Cache updated");
            res.sendStatus(201);

        }).catch(function (err) {
            console.log(err);
            res.sendStatus(500);
        });
    } else {
        saveSensorPromise(data)
            .then(function () {
                console.log("Successfully saved");
                return updateCachedSensorPromise(data);
            })
            .then(function () {
                console.log("Cache updated");
                res.sendStatus(201);

            }).catch(function (err) {
                console.log(err);
                res.sendStatus(500);
            });
    }
};

exports.save = saveSensorData;