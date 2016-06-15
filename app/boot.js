System.register(['angular2/platform/browser', './components/docker-app.component', "./services/getconfig.service", 'angular2/http', './services/connection.service', 'rxjs/Rx'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var browser_1, docker_app_component_1, getconfig_service_1, http_1, connection_service_1;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (docker_app_component_1_1) {
                docker_app_component_1 = docker_app_component_1_1;
            },
            function (getconfig_service_1_1) {
                getconfig_service_1 = getconfig_service_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (connection_service_1_1) {
                connection_service_1 = connection_service_1_1;
            },
            function (_1) {}],
        execute: function() {
            browser_1.bootstrap(docker_app_component_1.DockerAppComponent, [http_1.HTTP_PROVIDERS, getconfig_service_1.ConfigService, connection_service_1.ConnectionService]);
        }
    }
});
