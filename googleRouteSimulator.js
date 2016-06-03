/**
 * Created by ashemyakin on 5/26/2016.
 */

var GoogleMapsAPI = require("googlemaps");
var polyline = require('polyline');

var gmapsApi = null;
var route = null;
var updateInterval = null;
var index = 0;
var positionCallback = null;
var startPoint = null;
var endPoint = null;
var previousPosition = null;

function GoogleRouteSimulator(startPoint, endPoint, speed, callback) {
    this.gmapsApi = new GoogleMapsAPI({
        key: 'AIzaSyD-_OSCUFTxnsdDyUlBB9z3D-YivWYoiLk',
        stagger_time:       1000,
        encode_polylines:   true,
        secure:             true
    });

    this.startPoint = startPoint;
    this.endPoint = endPoint;

    this.positionCallback = callback;
    this.calculateRoute();
}

function distance(lat1, lon1, lat2, lon2) {
    var radlat1 = Math.PI * lat1/180;
    var radlat2 = Math.PI * lat2/180;
    var theta = lon1-lon2;
    var radtheta = Math.PI * theta/180;
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist);
    dist = dist * 180/Math.PI;
    dist = dist * 60 * 1.1515 * 1.609344 * 1000;
    return dist
}


function midpoint (lat1, lng1, lat2, lng2) {
    lat1= deg2rad(lat1);
    lng1= deg2rad(lng1);
    lat2= deg2rad(lat2);
    lng2= deg2rad(lng2);

    dlng = lng2 - lng1;
    Bx = Math.cos(lat2) * Math.cos(dlng);
    By = Math.cos(lat2) * Math.sin(dlng);
    lat3 = Math.atan2( Math.sin(lat1)+Math.sin(lat2),
        Math.sqrt((Math.cos(lat1)+Bx)*(Math.cos(lat1)+Bx) + By*By ));
    lng3 = lng1 + Math.atan2(By, (Math.cos(lat1) + Bx));

    var position = [(lat3*180)/Math.PI,
        (lng3*180)/Math.PI
    ];
    console.log(position);
    return position;
}

function deg2rad (degrees) {
    return degrees * Math.PI / 180;
}


var locationReceived = function(err, result) {
    if(err || !result || !result.routes || result.routes.length == 0 || !result.routes[0].overview_polyline || !result.routes[0].overview_polyline.points) {
        setTimeout(this.calculateRoute, 1000);
        return;
    }

    this.route = polyline.decode(result.routes[0].overview_polyline.points);

    for (var i =0; i < this.route.length; i++) {
        var point = this.route[i];
        var nextPoint = null;
        if (i < this.route.length - 1) {
            nextPoint = this.route[i + 1];
        }

        if(nextPoint) {
            var distanceToPoint = distance(point[0], point[1], nextPoint[0], nextPoint[1]);
            console.log(distanceToPoint);
            if (distanceToPoint > 50) {
                console.log(point);
                console.log(nextPoint);
                var newPoint = midpoint(point[0], point[1], nextPoint[0], nextPoint[1]);
                this.route.splice(i+1, 0, newPoint);
                i--;
                console.log("point inserted");
            }
        }
    }

};

var makeTrafficModelDate = function() {
    return new Date((new Date()).getTime() + 3600000);
};

var calculateBearing = function (lat1,lng1,lat2,lng2) {
    var dLon = (lng2-lng1);
    var y = Math.sin(dLon) * Math.cos(lat2);
    var x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
    var brng = (Math.atan2(y, x)) * 180 / Math.PI;
    return 360 - ((brng + 360) % 360);
};

GoogleRouteSimulator.prototype.calculateRoute = function() {
    if(this.gmapsApi) {
        this.gmapsApi.directions({
            origin: this.startPoint.lat + "," + this.startPoint.lng,
            destination: this.endPoint.lat + "," + this.endPoint.lng,
            mode: 'driving',
            departure_time: makeTrafficModelDate(),
            avoid: 'highways',
            traffic_model: 'pessimistic'
        }, locationReceived.bind(this));
    }
};

GoogleRouteSimulator.prototype.updatePosition = function(){
    if (this.route && this.positionCallback) {
        if(this.index < this.route.length) {
            var position = {
                latitude: this.route[this.index][0],
                longitude: this.route[this.index][1],
                bearing: 0
            };

            if (this.previousPosition != null) {
                this.previousPosition.bearing = calculateBearing(this.previousPosition.latitude, this.previousPosition.longitude, position.latitude, position.longitude);
                this.positionCallback(this.previousPosition);
                this.previousPosition = position;
            } else {
                this.previousPosition = position;
            }

            this.index++;
        } else if (this.index >= this.route.length && this.index <  this.route.length * 2) {
            // reverse route
            var reverseIndex = this.route.length - 1 - (this.index - this.route.length);

            var position = {
                latitude: this.route[reverseIndex][0],
                longitude: this.route[reverseIndex][1]
            };

            if (this.previousPosition != null) {
                position.bearing = calculateBearing(this.previousPosition.latitude, this.previousPosition.longitude, position.latitude, position.longitude);
                this.positionCallback(this.previousPosition);

                this.previousPosition = position;
            } else {
                this.previousPosition = position;
            }

            this.index++;
        } else {
            this.index = 0;
        }
    }
};

GoogleRouteSimulator.prototype.start = function() {
    if(!updateInterval) {
        updateInterval = setInterval(this.updatePosition.bind(this), 1000);
    }
};

GoogleRouteSimulator.prototype.getPosition = function() {
    if(!this.previousPosition) {
        return {
            latitude: this.startPoint.lat,
            longitude: this.startPoint.lng,
            bearing: 0
        }
    } else {
        return this.previousPosition;
    }
};

module.exports = GoogleRouteSimulator;