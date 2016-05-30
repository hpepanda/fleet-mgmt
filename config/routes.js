"use strict";

var use = require("use-import");
var config = use("config");

var SensorsController = use("sensorsController");

var initializeClientWebsocketConnection = function(io, sensorsController) {
    var getGps = function () {
        if (sensorsController) {
            sensorsController.getDockerData().then(function (data) {
                if (data) {
                    io.sockets.emit('docker', data);
                }

                setTimeout(function () {
                    getGps();
                }, 250);

            }).catch(function () {
                getGps();
            });
        } else {
            getGps();
        }
    };
    setTimeout(function () {
        getGps();
    }, 10* 1000);
};

module.exports = function (app, io) {
    var sensorsController = new SensorsController();
    initializeClientWebsocketConnection(io, sensorsController);

    /// test server connection
    app.get("/", function (req, res) {
        res.json({ message: "I'm working! I'm sensors data server." });
    });

    /// catch 404 and forwarding to error handler
    app.use(function (req, res) {
        res.status(404).send({ error: "not found" });
    });

    /// catch unhandled errors and forwarding to error handler
    app.use(function (err, req, res) {
        res.status(err.status || 500);
        res.send({ error: err.message });
    });
};