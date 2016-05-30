/**
 * Created by ashemyakin on 3/9/2016.
 */

var mongoose = require("mongoose");
var SensorData = mongoose.model("SensorData");

function AggregatedSensors() {
}

function executePromiseSequence(array, callback) {
    return array.reduce(function chain(promise, item) {
        return promise.then(function () {
            return callback(item);
        });
    }, Promise.resolve());
}

SystemStatus.prototype.getLastValue = function(clientId, sensor, startTime) {
    var filter = {
        clientId: clientId,
        sensorType: "battery",
        time: {
            $gte: startTime
        }
    };

    return SensorData.findOne(filter).sort({ time : -1}).limit(1).then(function(batteryData) {
        if(batteryData && batteryData.time > startTime) {
            return batteryData;
        } else {
            return null;
        }
    });
};


SystemStatus.prototype.getWifiState = function(clientId, startTime, endTime) {
    var filter = {
        clientId: clientId,
        sensorType: "wifi",
        time: {
            $gte: startTime,
            $lt: endTime
        }
    };

    return SensorData.find(filter).sort({ time : -1}).limit(1).then(function(state) {
        if(state && state.length > 0 && state[0].data && state[0].data.length > 0 && state[0].data[0].signal) {
            return state[0].data[0].signal;
        } else {
            return -1;
        }
    });
};

SystemStatus.prototype.getTemperature = function(clientId, startTime, endTime) {
    var filter = {
        clientId: clientId,
        sensorType: "cpu_temperature",
        time: {
            $gte: startTime,
            $lt: endTime
        }
    };

    return SensorData.find(filter).sort({ time : -1}).limit(1).then(function(state) {
        if(state && state.length > 0 && state[0].data && state[0].data.length > 0 && state[0].data[0].temperature) {
            return state[0].data[0].temperature;
        } else {
            return -1;
        }
    });
};

SystemStatus.prototype.getClientIp = function(clientId, startTime, endTime) {
    var filter = {
        clientId: clientId,
        sensorType: "ip",
        time: {
            $gte: startTime,
            $lt: endTime
        }
    };

    return SensorData.find(filter).sort({ time : -1}).limit(1).then(function(state) {
        if(state && state.length > 0 && state[0].data && state[0].data.length > 0 && state[0].data[0].ip) {
            return state[0].data[0].ip;
        } else {
            return -1;
        }
    });
};

SystemStatus.prototype.getSensorTypes = function(clientId, startTime, endTime) {
    var filter = {
        clientId: clientId,
        time: {
            $gte: startTime,
            $lt: endTime
        }
    };

    return SensorData.find(filter).distinct("sensorType");
};

SystemStatus.prototype.getAvailableClients = function(startTime, endTime) {
    var filter = [{
        '$match': {
            'time': {
                $gte: startTime,
                $lt: endTime
            }
        }
    },
        {
            $group: {
                _id: '$clientId',
                "clientType": {$last: "$clientType"}
            }
        },
        {
            "$project": {
                "_id": 0,
                "clientId": "$_id",
                "clientType": 1
            }
        },
        {
            $sort: {
                "clientId": 1
            }
        }];


    return SensorData.aggregate(filter).exec();
};

SystemStatus.prototype.getMonitor = function(clientId, startTime, endTime) {
    var filter = {
        clientId: clientId,
        sensorType: "monitor",
        time: {
            $gte: startTime,
            $lt: endTime
        }
    };

    return SensorData.find(filter).sort({ time : -1}).limit(1).then(function(state) {
        if(state && state.length > 0 && state[0].data) {
            return state[0].data;
        } else {
            return [];
        }
    });
};

module.exports = SystemStatus;
