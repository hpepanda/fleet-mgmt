System.register(['../src/web_workers/shared/client_message_broker', '../src/web_workers/shared/service_message_broker', '../src/web_workers/shared/serializer', '../src/web_workers/shared/message_bus', 'angular2/src/platform/worker_render'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var worker_render_1;
    var WORKER_RENDER_APP;
    var exportedNames_1 = {
        'WORKER_RENDER_APP': true,
        'ClientMessageBroker': true,
        'ClientMessageBrokerFactory': true,
        'FnArg': true,
        'UiArguments': true,
        'ReceivedMessage': true,
        'ServiceMessageBroker': true,
        'ServiceMessageBrokerFactory': true,
        'PRIMITIVE': true
    };
    function exportStar_1(m) {
        var exports = {};
        for(var n in m) {
            if (n !== "default"&& !exportedNames_1.hasOwnProperty(n)) exports[n] = m[n];
        }
        exports_1(exports);
    }
    return {
        setters:[
            function (client_message_broker_1_1) {
                exports_1({
                    "ClientMessageBroker": client_message_broker_1_1["ClientMessageBroker"],
                    "ClientMessageBrokerFactory": client_message_broker_1_1["ClientMessageBrokerFactory"],
                    "FnArg": client_message_broker_1_1["FnArg"],
                    "UiArguments": client_message_broker_1_1["UiArguments"]
                });
            },
            function (service_message_broker_1_1) {
                exports_1({
                    "ReceivedMessage": service_message_broker_1_1["ReceivedMessage"],
                    "ServiceMessageBroker": service_message_broker_1_1["ServiceMessageBroker"],
                    "ServiceMessageBrokerFactory": service_message_broker_1_1["ServiceMessageBrokerFactory"]
                });
            },
            function (serializer_1_1) {
                exports_1({
                    "PRIMITIVE": serializer_1_1["PRIMITIVE"]
                });
            },
            function (message_bus_1_1) {
                exportStar_1(message_bus_1_1);
            },
            function (worker_render_1_1) {
                worker_render_1 = worker_render_1_1;
            }],
        execute: function() {
            /**
             * @deprecated Use WORKER_RENDER_APPLICATION
             */
            exports_1("WORKER_RENDER_APP", WORKER_RENDER_APP = worker_render_1.WORKER_RENDER_APPLICATION);
        }
    }
});
