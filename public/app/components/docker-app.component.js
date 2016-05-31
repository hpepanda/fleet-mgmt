System.register(['angular2/http', 'angular2/core', '../services/getConfig.service'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var http_1, core_1, getConfig_service_1;
    var DockerAppComponent;
    return {
        setters:[
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (getConfig_service_1_1) {
                getConfig_service_1 = getConfig_service_1_1;
            }],
        execute: function() {
            DockerAppComponent = (function () {
                function DockerAppComponent(_configService) {
                    var _this = this;
                    this._configService = _configService;
                    this.dockers = [];
                    this.markers = [];
                    this.googleStreetViewSrcs = [];
                    this.checkedDockerId = -1;
                    this._configService.getConfig().then(function (config) {
                        _this.config = config;
                        _this.getConfigCallback();
                    }, function (error) {
                        _this.error = error;
                    });
                }
                DockerAppComponent.prototype.getConfigCallback = function () {
                    var _this = this;
                    // Init map
                    this.GMap = new google.maps.Map(document.getElementById(this.config.mapDivElId), {
                        center: new google.maps.LatLng(this.config.mapCenter.lat, this.config.mapCenter.lng),
                        zoom: this.config.mapZoom,
                        styles: [{ "featureType": "all", "elementType": "labels", "stylers": [{ "visibility": "on" }] }, { "featureType": "all", "elementType": "labels.text.fill", "stylers": [{ "saturation": 36 }, { "color": "#000000" }, { "lightness": 40 }] }, { "featureType": "all", "elementType": "labels.text.stroke", "stylers": [{ "visibility": "on" }, { "color": "#000000" }, { "lightness": 16 }] }, { "featureType": "all", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "administrative", "elementType": "geometry.fill", "stylers": [{ "color": "#000000" }, { "lightness": 20 }] }, { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [{ "color": "#000000" }, { "lightness": 17 }, { "weight": 1.2 }] }, { "featureType": "administrative.locality", "elementType": "labels.text.fill", "stylers": [{ "color": "#c4c4c4" }] }, { "featureType": "administrative.neighborhood", "elementType": "labels.text.fill", "stylers": [{ "color": "#707070" }] }, { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "color": "#000000" }, { "lightness": 20 }] }, { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#000000" }, { "lightness": 21 }, { "visibility": "on" }] }, { "featureType": "poi.business", "elementType": "geometry", "stylers": [{ "visibility": "on" }] }, { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{ "color": "#be2026" }, { "lightness": "0" }, { "visibility": "on" }] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "visibility": "off" }] }, { "featureType": "road.highway", "elementType": "labels.text.fill", "stylers": [{ "visibility": "off" }] }, { "featureType": "road.highway", "elementType": "labels.text.stroke", "stylers": [{ "visibility": "off" }, { "hue": "#ff000a" }] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "color": "#000000" }, { "lightness": 18 }] }, { "featureType": "road.arterial", "elementType": "geometry.fill", "stylers": [{ "color": "#575757" }] }, { "featureType": "road.arterial", "elementType": "labels.text.fill", "stylers": [{ "color": "#ffffff" }] }, { "featureType": "road.arterial", "elementType": "labels.text.stroke", "stylers": [{ "color": "#2c2c2c" }] }, { "featureType": "road.local", "elementType": "geometry", "stylers": [{ "color": "#000000" }, { "lightness": 16 }] }, { "featureType": "road.local", "elementType": "labels.text.fill", "stylers": [{ "color": "#999999" }] }, { "featureType": "road.local", "elementType": "labels.text.stroke", "stylers": [{ "saturation": "-52" }] }, { "featureType": "transit", "elementType": "geometry", "stylers": [{ "color": "#000000" }, { "lightness": 19 }] }, { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#000000" }, { "lightness": 17 }] }],
                        disableDefaultUI: true
                    });
                    this.connection = io(this.config.connections.dataServer.server + ':' + this.config.connections.dataServer.port);
                    this.connection.on('docker', function (data) {
                        var processedIds = [];
                        data.forEach(function (item) {
                            processedIds.push(item.clientId);
                            if (!_this.markers[item.clientId] || !_this.markers[item.clientId].map) {
                                var icon = {
                                    url: _this.config.markerIcon
                                };
                                _this.markers[item.clientId] = new google.maps.Marker({
                                    position: new google.maps.LatLng(item.data[0].position.latitude, item.data[0].position.longitude),
                                    map: _this.GMap,
                                    icon: icon
                                });
                                _this.markers[item.clientId].addListener('click', function () {
                                    _this.checkedDockerId = item.clientId;
                                });
                            }
                            else if (item.data[0].position.latitude != _this.markers[item.clientId].getPosition().lat() && item.data[0].position.longitude != _this.markers[item.clientId].getPosition().lng()) {
                                _this.updateGoogleStreetViewSrc(item.clientId, item);
                                _this.markers[item.clientId].setPosition(new google.maps.LatLng(item.data[0].position.latitude, item.data[0].position.longitude));
                            }
                            if (!_this.dockers[item.clientId]) {
                                _this.dockers[item.clientId] = {
                                    clientId: item.clientId,
                                    ip: item.data[0].metadata.ip,
                                    dockerType: item.data[0].metadata.dockerType,
                                    bearing: item.data[0].position.bearing,
                                };
                            }
                            if (!_this.googleStreetViewSrcs[item.clientId] || _this.dockers[item.clientId].bearing != item.data[0].position.bearing) {
                                _this.updateGoogleStreetViewSrc(item.clientId, item);
                            }
                        });
                        _this.dockers.forEach(function (dockerItem) {
                            if (processedIds.indexOf(dockerItem.clientId) == -1) {
                                _this.markers[dockerItem.clientId].setMap(null);
                                _this.googleStreetViewSrcs[dockerItem.clientId] = null;
                                if (dockerItem.clientId == _this.checkedDockerId)
                                    _this.checkedDockerId = -1;
                            }
                        });
                    });
                };
                DockerAppComponent.prototype.updateGoogleStreetViewSrc = function (clientId, item) {
                    this.googleStreetViewSrcs[clientId] = 'https://maps.googleapis.com/maps/api/streetview?size='
                        + this.config.imageSize.width + 'x' + this.config.imageSize.height + '&location='
                        + item.data[0].position.latitude + ','
                        + item.data[0].position.longitude + '&heading='
                        + item.data[0].position.bearing + '&pitch=-0.76&key='
                        + this.config.googleStreetViewAPIKey;
                };
                DockerAppComponent.prototype.closePopup = function () {
                    this.checkedDockerId = -1;
                };
                DockerAppComponent = __decorate([
                    core_1.Component({
                        selector: 'docker-app',
                        templateUrl: 'dev/templates/docker-app.template.html',
                        providers: [http_1.HTTP_PROVIDERS, getConfig_service_1.ConfigService]
                    }), 
                    __metadata('design:paramtypes', [getConfig_service_1.ConfigService])
                ], DockerAppComponent);
                return DockerAppComponent;
            }());
            exports_1("DockerAppComponent", DockerAppComponent);
        }
    }
});
