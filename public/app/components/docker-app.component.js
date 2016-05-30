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
                    this.checkedDocker = {};
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
                        styles: this.config.mapStyle,
                        disableDefaultUI: true
                    });
                    this.connection = io(this.config.connections.dataServer.server + ':' + this.config.connections.dataServer.port);
                    this.connection.on('docker', function (data) {
                        data.forEach(function (item) {
                            _this.registerDocker(item);
                        });
                    });
                };
                DockerAppComponent.prototype.registerDocker = function (docker) {
                    var _this = this;
                    this.dockers[docker.clientId] = docker;
                    if (!this.markers[docker.clientId]) {
                        var icon = {
                            url: this.config.markerIcon
                        };
                        this.markers[docker.clientId] = new google.maps.Marker({
                            position: new google.maps.LatLng(this.dockers[docker.clientId].data[0].position.latitude, this.dockers[docker.clientId].data[0].position.longitude),
                            map: this.GMap,
                            icon: icon,
                            title: docker.clientId
                        });
                        this.markers[docker.clientId].addListener('click', function () {
                            _this.checkedDocker = _this.dockers[docker.clientId];
                        });
                    }
                    if (docker.data[0].position.latitude != this.markers[docker.clientId].getPosition().lat() && docker.data[0].position.longitude != this.markers[docker.clientId].getPosition().lng()) {
                        this.markers[docker.clientId].setPosition(new google.maps.LatLng(docker.data[0].position.latitude, docker.data[0].position.longitude));
                    }
                };
                DockerAppComponent.prototype.closePopup = function () {
                    this.checkedDocker = {};
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
