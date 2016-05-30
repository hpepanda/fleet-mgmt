'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var SensorDataSchema = new Schema({
    clientType: {type: String, required: true, index: true},
    clientId: {type: String, required: true, index: true},
    sensorType: {type: String, required: true, index: true},
    data: [Schema.Types.Mixed],
    time: {type: Date, required: true, index: true}
});

mongoose.model('SensorData', SensorDataSchema);