/**
 * Created by ashemyakin on 3/23/2016.
 */
var binaryDataServer = process.env.BINARY_DATA_SERVER || "http://192.168.1.6:8020/telemetry";

var clientType = "DOCKER";

var dockerType = process.env.DOCKER_TYPE || "unknown";
var clientId = process.env.DOCKER_ID ||  "1";
var ip = process.env.IP || "127.0.0.1";

var position = {"lat": 30.0 + Math.floor(Math.random() * 999)/1000.0, "lng": -97.0 - Math.floor(Math.random() * 999)/1000.0};
//var position = {"lat": 30.2645253, "lng": -97.7408818};

setInterval(function () {
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
}, 2500);
