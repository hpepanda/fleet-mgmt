'use strict';

var DMStoDD = function(pos){
    var latAbs = parseFloat(pos.latitude.minutes)/60 + parseFloat(pos.latitude.degree);
    var longAbs = parseFloat(pos.longitude.minutes)/60 + parseFloat(pos.longitude.degree);

    return {
        lat: pos.latitude.letter.toLowerCase() == 's' ? latAbs * (-1) : latAbs,
        long: pos.longitude.letter.toLowerCase() == 'w' ? longAbs * (-1) : longAbs
    };
};

exports.process = function(data){
    data.position = DMStoDD(data.position);
    return data;
};