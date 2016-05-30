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

var locationReceived = function(err, result) {
    if(err || !result || !result.routes || result.routes.length == 0 || !result.routes[0].overview_polyline || !result.routes[0].overview_polyline.points) {
        setTimeout(this.calculateRoute, 1000);
        return;
    }

    this.route = polyline.decode(result.routes[0].overview_polyline.points);

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
                position.bearing = calculateBearing(this.previousPosition.latitude, this.previousPosition.longitude, position.latitude, position.longitude);
                this.positionCallback(position);
                this.previousPosition = position;
            } else {
                this.previousPosition = position;
            }

            this.index++;
        } else if (this.index >= this.route.length && this.index <  this.route.length * 2) {
            var reverseIndex = this.route.length - 1 - (this.index - this.route.length);

            var position = {
                latitude: this.route[reverseIndex][0],
                longitude: this.route[reverseIndex][1]
            };

            if (this.previousPosition != null) {
                position.bearing = calculateBearing(this.previousPosition.latitude, this.previousPosition.longitude, position.latitude, position.longitude);
                this.positionCallback(position);
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