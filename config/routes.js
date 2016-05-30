'use strict';

var use = require('use-import');
var sensor = use('sensorController'),
    urbeQuiz = use('urbeQuizController');

module.exports = function(app){
    app.put('/telemetry', sensor.save);
    app.put('/quiz', urbeQuiz.save);
};