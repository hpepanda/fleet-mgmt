/**
 * Created by ashemyakin on 3/9/2016.
 */

var mongoose = require("mongoose");
var use = require("use-import");
var gpsSensor = use("gpsSensor");
var config = use("config");
var GpsSensor = new gpsSensor();
var SystemStatus = new (use("systemStatus"));
var moment = require("moment");

function SensorsController() {
    this.status = "disabled";
}

SensorsController.prototype.status = "disabled";

SensorsController.prototype.clients = [];


SensorsController.prototype.getWebsocketData = function () {
    return this.getData();
};

SensorsController.prototype.getRest = function (req, res, next) {
    this.getData().then(function(resp){
        res.end(resp);
    }).catch(function(err) {
        next(err);
    })
};

executePromiseSequence = function (array, callback) {
    return array.reduce(function chain(promise, item) {
        return promise.then(function () {
            return callback(item);
        });
    }, Promise.resolve());
};

var processClient = function(result) {
    return GpsSensor.getGpsSpeed(result.clientId, result.clientType).then(function (speed) {
        result.speed = speed;
    }).then(function () {
        return GpsSensor.getGpsPosition(result.clientId, result.clientType);
    }).then(function (position) {
        result.position = position;
    }).then(function () {
        return result;
    });
};

SensorsController.prototype.getData = function () {
    var that = this;
    return new Promise(function(resolve) {
        var result = [];
        executePromiseSequence(that.clients, function(client) {
                var response = {
                    clientId: client.clientId,
                    clientType: client.clientType
                };
                return processClient(response)
                    .then(function(){
                        result.push(response);
                    });
            }).then(function () {
                resolve(result);
            }).catch(function (err) {
                callback(err);
            });
    });
};

SensorsController.prototype.getSystemStatus = function () {
    var endTime = new Date(moment().format());
    var startTime = new Date(moment().subtract(60, "minutes").format());
    var sensorsStartTime = new Date(moment().subtract(30, "seconds").format());

    return SystemStatus.getAvailableClients(startTime, endTime).then(function (clients) {
        return executePromiseSequence(clients, function (client) {
            return SystemStatus.getBatteryState(client.clientId, startTime, endTime).then(function (battery) {
                client.batteryState = battery;
                return SystemStatus.getWifiState(client.clientId, sensorsStartTime, endTime);
            }).then(function (signal) {
                client.wifiSignal = signal;
                return SystemStatus.getSensorTypes(client.clientId, sensorsStartTime, endTime);
            }).then(function (sensors) {
                client.sensors = sensors;
                return SystemStatus.getMonitor(client.clientId, sensorsStartTime, endTime);
            }).then(function (monitor) {
                client.monitor = monitor;
                return SystemStatus.getClientIp(client.clientId, sensorsStartTime, endTime);
            }).then(function (ip) {
                client.clientIp = ip;
                return SystemStatus.getTemperature(client.clientId, sensorsStartTime, endTime);
            }).then(function (temperature) {
                client.cpuTemperature = temperature;
                return client;
            }).catch(function (err) {
                console.log(err);
            });
        }).then(function() {
            return clients;
        });
    });
};

var clients = [{clientId: "Robot1", clientType: "ROBOT"}, {clientId: "Robot2", clientType: "ROBOT"}];

var Promise = require("bluebird");

SensorsController.prototype.getTelemetryData = function () {
    var startTime = new Date(moment().subtract(60, "seconds").format());

    return Promise.map(clients, function(client) {
        return SystemStatus.getSensorLatestValue(client.clientId, "battery", startTime).then(function (battery) {
            client.batteryState = battery;
            return SystemStatus.getSensorLatestValue(client.clientId, "wifi", startTime);
        }).then(function (wifi) {
            if(wifi && wifi.signal) {
                client.wifiSignal = Math.floor(wifi.signal);
            }
            return SystemStatus.getSensorLatestValue(client.clientId, "Accelerometr", startTime);
        }).then(function (accelerometer) {
            client.accelerometer = accelerometer;
            return SystemStatus.getSensorLatestValue(client.clientId, "Gyroscope", startTime);
        }).then(function (gyroscope) {
            client.gyroscope = gyroscope;
            return SystemStatus.getSensorLatestValue(client.clientId, "Quaternion", startTime);
        }).then(function (quaternion) {
            client.quaternion = quaternion;
            return SystemStatus.getSensorLatestValue(client.clientId, "cpu_temperature", startTime);
        }).then(function (cpu) {
            if (cpu && cpu.temperature) {
                client.cpuTemperature = Math.floor(cpu.temperature);
            }
            return SystemStatus.getSensorLatestValue(client.clientId, "ip", startTime);
        }).then(function (network) {
            if (network && network.ip) {
                client.clientIp = network.ip;
            }
            return SystemStatus.getSensorLatestValue(client.clientId, "Magnetometr", startTime);
        }).then(function (magnetometer) {
            client.magnetometer = magnetometer;
            client.updateTime = moment();
            return client;
        }).catch(function (err) {
            console.log(err);
        });
    }).then(function () {
        return clients;
    });
};

SensorsController.prototype.getDockerData = function () {
    var startTime = new Date(moment().subtract(config.pointTtl, "seconds").format());
    return SystemStatus.getDockerData(startTime);
};


module.exports = SensorsController;
