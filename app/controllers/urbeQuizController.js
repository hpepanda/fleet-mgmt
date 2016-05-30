'use strict';

var mongoose = require('mongoose');

var QuizAttempt = mongoose.model('UrbeQuiz');

var saveUrbeQuizAttempt = function(req, res){
    console.log('save sensor data');
    console.log(JSON.stringify(req.body));

    var attempt = new QuizAttempt({
        platformId: req.body.platformId,
        qrCode: req.body.qrCode,
        time: new Date()
    });

    return attempt.save()
        .then(function(sensor){
            console.log("Urbe quiz attempt saved");
            res.sendStatus(201);
        }).catch(function(err){
            console.log(err);
            res.sendStatus(500);
    });
};

exports.save = saveUrbeQuizAttempt;