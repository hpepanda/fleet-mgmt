/**
 * Created by ashemyakin on 3/23/2016.
 */
var guidGenerator = require("./guidGenerator");

var clientType = "DOCKER";

var binaryDataServer = process.env.BINARY_DATA_SERVER || "http://research-binary-data-server.52.35.15.130.nip.io/telemetry";
var dockerType = process.env.DOCKER_TYPE || "local";
var clientId = process.env.DOCKER_ID ||  guidGenerator.generateGUID();
var ip = process.env.INSTANCE_IP || process.env.IP || "127.0.0.1";
var port = process.env.INSTANCE_PORT || process.env.PORT || 7011;

var randomLongitude = require('random-longitude');
var randomLatitude = require('random-latitude');

var topLeftLat = 47.686270;
var topLeftLong = -122.407585;

var bottomRightLat = 47.532118;
var bottomRightLong = -122.109359;

if(process.env.CONFIGURATION) {
    var configuration = JSON.parse(process.env.CONFIGURATION);
    binaryDataServer = configuration.BINARY_DATA_SERVER;
    dockerType = configuration.DOCKER_TYPE;
    clientId = configuration.DOCKER_ID;
    ip = configuration.INSTANCE_IP || configuration.IP;
    port = configuration.INSTANCE_PORT || configuration.PORT || port;

    topLeftLat = configuration.GPS[0];
    topLeftLong = configuration.GPS[1];
    bottomRightLat = configuration.GPS[2];
    bottomRightLong = configuration.GPS[3];
}

if(process.env.APPLY_CF_ENV == "true") {
    clientId = process.env.CF_INSTANCE_INDEX || clientId;
    var ip_add = process.env.CF_INSTANCE_ADDR || ip;
    var n = ip_add.indexOf(':');
    ip = ip_add.substring(0, n != -1 ? n : ip_add.length);
}

var startPosition = {
    "lat": randomLatitude({min: bottomRightLat, max: topLeftLat}),
    "lng": randomLongitude({min: topLeftLong, max: bottomRightLong})
};

var endPosition = {
    "lat": randomLatitude({min: bottomRightLat, max: topLeftLat}),
    "lng": randomLongitude({min: topLeftLong, max: bottomRightLong})
};

console.log(JSON.stringify({
    binaryDataServer: binaryDataServer,
    startPosition: startPosition,
    endPosition: endPosition,
    dockerType: dockerType,
    clientId: clientId,
    instanceIp: ip,
    instancePort: port
}));


var positionCallback = function(position) {
    try {
        var request = require('sync-request');
        var response = request('PUT', binaryDataServer, {
            json: {
                clientId: clientId,
                clientType: clientType,
                sensorType: "DOCKER",
                data: [{
                    position: position,
                    metadata: {
                        dockerType: dockerType,
                        dockerId: clientId,
                        instanceIp: ip,
                        instancePort: port
                    }
                }]
            }
        });
        response.getBody('utf8');
    } catch (ex) {
        console.log(ex);
    }

    console.log(position);
};

var googleRouteSimulator = require("./googleRouteSimulator");
var routeSimulator = new googleRouteSimulator(startPosition, endPosition, 1000, positionCallback);
routeSimulator.start();

var express = require('express');
var app = express();

app.get('/', function(req, res){
    res.send(JSON.stringify({
        position: routeSimulator.getPosition(),
        dockerType: dockerType,
        clientId: clientId,
        instanceIp: ip,
        instancePort: port,
        time: new Date()
    }));
});


app.listen(port);