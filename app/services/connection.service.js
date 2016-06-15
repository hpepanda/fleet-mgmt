System.register(['angular2/core', 'angular2/http', 'rxjs/Observable', './getconfig.service'], function(exports_1, context_1) {
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
    var core_1, http_1, Observable_1, getconfig_service_1;
    var ConnectionService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (getconfig_service_1_1) {
                getconfig_service_1 = getconfig_service_1_1;
            }],
        execute: function() {
            ConnectionService = (function () {
                function ConnectionService(http, _configService) {
                    var _this = this;
                    this._configService = _configService;
                    this.connections = [];
                    this.http = http;
                    this._configService.configObservable.subscribe(function (config) {
                        _this.config = config;
                        _this.connect();
                    });
                }
                ConnectionService.prototype.connect = function () {
                    var _this = this;
                    this.connectionObservable = Observable_1.Observable.create(function (observer) {
                        _this.config.connections.forEach(function (item) {
                            var ws = io(item.server + ':' + item.port);
                            ws.on('docker', function (data) {
                                observer.next({ data: data, source: item.server });
                            });
                            ws.on('close', function () { return ws.close(); });
                        });
                    });
                };
                ConnectionService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http, getconfig_service_1.ConfigService])
                ], ConnectionService);
                return ConnectionService;
            }());
            exports_1("ConnectionService", ConnectionService);
        }
    }
});
