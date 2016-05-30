System.register(['angular2/src/platform/dom/debug/by', 'angular2/src/platform/dom/debug/ng_probe'], function(exports_1, context_1) {
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
            function (by_1_1) {
                exportStar_1(by_1_1);
            },
            function (ng_probe_1_1) {
                exportStar_1(ng_probe_1_1);
            }],
        execute: function() {
        }
    }
});
