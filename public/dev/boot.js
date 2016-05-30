System.register(['angular2/platform/browser', './components/urb-e.component', 'rxjs/Rx'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var browser_1, urb_e_component_1;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (urb_e_component_1_1) {
                urb_e_component_1 = urb_e_component_1_1;
            },
            function (_1) {}],
        execute: function() {
            browser_1.bootstrap(urb_e_component_1.UrbeComponent);
        }
    }
});
