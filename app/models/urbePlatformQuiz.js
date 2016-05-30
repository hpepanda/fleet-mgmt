'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UrbeQuizSchema = new Schema({
    platformId: {type: String, require: true, index: true},
    qrCode: {type: String, require: true},
    time: {type: String, require: true}
});

mongoose.model('UrbeQuiz', UrbeQuizSchema);