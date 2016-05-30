/**
 * Created by ashemyakin on 3/9/2016.
 */

var mongoose = require("mongoose");
var SensorData = mongoose.model("SensorData");
var CachedData = mongoose.model("CachedData");

function SystemStatus () {
}

SystemStatus.prototype.getBatteryState = function(clientId, startTime, endTime) {
    var filter = {
        clientId: clientId,
        sensorType: "battery",
        time: {
            $gte: startTime,
            $lt: endTime
        }
    };

    return SensorData.find(filter).sort({ time : -1}).limit(200).then(function(state) {
        var result = [];
        var chartItemsCount = 20;

        if (state && state.length > 0) {
            var step = Math.floor(state.length / chartItemsCount);

            for (var i = 0, j = chartItemsCount; j >= 1; j--) {
                if (i <= state.length && state[i] && state[i].data && state[i].data.length > 0) {
                    result.push(state[i].data[0]);
                } else {
                    result.push({});
                }
                i += step;
            }
        }

        return result;
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


SystemStatus.prototype.getSensorLatestValue = function(clientId, sensorType, startTime) {
    var filter = {
        clientId: clientId,
        sensorType: sensorType
    };

    return CachedData.find(filter).sort({ time : -1}).limit(1).then(function(sensor) {
        if(sensor && sensor.length > 0 &&  sensor[0].time > startTime) {
            return sensor[0].data;
        } else {
            return null;
        }
    });
};

SystemStatus.prototype.getDockerData = function(startTime) {
    var filter = {
        sensorType: "DOCKER",
        time: {
            $gte: startTime
        }
    };

    return CachedData.find(filter).exec();
};


module.exports = SystemStatus;
