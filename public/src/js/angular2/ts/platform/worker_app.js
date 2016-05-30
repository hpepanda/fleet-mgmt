System.register(['angular2/src/web_workers/shared/message_bus'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function exportStar_1(m) {
        var exports = {};
        for(var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_1(exports);
    }
    return {
        setters:[
            function (message_bus_1_1) {
                exportStar_1(message_bus_1_1);
            }],
        execute: function() {
        }
    }
});
