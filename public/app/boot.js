System.register(['angular2/platform/browser', './components/docker-app.component', 'rxjs/Rx'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var browser_1, docker_app_component_1;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (docker_app_component_1_1) {
                docker_app_component_1 = docker_app_component_1_1;
            },
            function (_1) {}],
        execute: function() {
            browser_1.bootstrap(docker_app_component_1.DockerAppComponent);
        }
    }
});
