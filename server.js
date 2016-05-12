/**
 * Created by ashemyakin on 3/23/2016.
 */

var clientType = "DOCKER";

var binaryDataServer = process.env.BINARY_DATA_SERVER || "http://192.168.1.6:8020/telemetry";
var dockerType = process.env.DOCKER_TYPE || "unknown";
var clientId = process.env.DOCKER_ID ||  "1";
var ip = process.env.IP || "127.0.0.1";
var port = process.env.PORT || 7011;


var randomLongitude = require('random-longitude');
var randomLatitude = require('random-latitude');

var topLeftLat = 30.33;
var topLeftLong = -97.85;

var bottomRightLat = 30.16;
var bottomRightLong = -97.59;

if(process.env.CONFIGURATION) {
    var configuration = JSON.parse(process.env.CONFIGURATION);
    binaryDataServer = configuration.BINARY_DATA_SERVER;
    dockerType = configuration.DOCKER_TYPE;
    clientId = configuration.DOCKER_ID;
    ip = configuration.IP;
    port = configuration.PORT || port;

    topLeftLat = configuration.GPS[0];
    topLeftLong = configuration.GPS[1];
    bottomRightLat = configuration.GPS[2];
    bottomRightLong = configuration.GPS[3];
}

if(process.env.APPLY_CF_ENV = true) {
    clientId = process.env.CF_INSTANCE_INDEX || clientId;
    ip = process.env.CF_INSTANCE_ADDR || ip;
}

var position = {
    "lat": randomLatitude({min: bottomRightLat, max: topLeftLat}),
    "lng": randomLongitude({min: topLeftLong, max: bottomRightLong})
};

console.log(JSON.stringify({
    binaryDataServer: binaryDataServer,
    position: position,
    dockerType: dockerType,
    clientId: clientId,
    ip: ip
}));

var sendRequest = function () {
    try {
        var request = require('sync-request');
        var response = request('PUT', binaryDataServer, {
            json: {
                clientId: clientId,
                clientType: clientType,
                sensorType: "DOCKER",
                data: [{
                    position: {
                        longitude: position.lng,
                        latitude: position.lat
                    },
                    metadata: {
                        ip: ip,
                        dockerType: dockerType,
                        dockerId: clientId
                    }
                }]
            }
        });
        response.getBody('utf8');
    } catch (ex) {
        console.log(ex);
    } finally {
        setTimeout(sendRequest, 2500);
    }
};

setTimeout(sendRequest, 2500);


var express = require('express');
var app = express();

app.get('/', function(req, res){
    res.send(JSON.stringify({
        position: position,
        dockerType: dockerType,
        clientId: clientId,
        ip: ip,
        time: new Date()
    }));
});

app.listen(port);