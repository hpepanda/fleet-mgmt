/**
 * Created by ashemyakin on 3/9/2016.
 */

var mongoose = require("mongoose");
var SensorData = mongoose.model("SensorData");

function GpsSensor () {
}

GpsSensor.prototype.getGpsSpeed = function(clientId, clientType) {
    var filter = {
        clientId: clientId,
        clientType: clientType,
        sensorType: "GPS",
        data: { "$elemMatch": { "isValid": true } }
    };

    return SensorData.findOne(filter).sort({'time': -1}).limit(1).then(function(gpsData){
        var speed;
        if(gpsData && gpsData.data.length > 0) {
            speed = gpsData.data[0].speed;
        }

        return speed;
    });
};


module.exports = GpsSensor;
