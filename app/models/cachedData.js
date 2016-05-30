'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CachedDataSchema = new Schema({
    clientType: {type: String, required: true, index: true},
    clientId: {type: String, required: true, index: true},
    sensorType: {type: String, required: true, index: true},
    data: {type: Schema.Types.Mixed, required: true},
    time: {type: Date, required: true, index: true}
});

mongoose.model('CachedData', CachedDataSchema);