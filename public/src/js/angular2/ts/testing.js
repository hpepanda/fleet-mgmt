System.register(['./src/testing/testing', './src/testing/test_component_builder', './src/testing/test_injector', './src/testing/fake_async'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var exportedNames_1 = {
        'ComponentFixture': true,
        'TestComponentBuilder': true
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
            function (testing_1_1) {
                exportStar_1(testing_1_1);
            },
            function (test_component_builder_1_1) {
                exports_1({
                    "ComponentFixture": test_component_builder_1_1["ComponentFixture"],
                    "TestComponentBuilder": test_component_builder_1_1["TestComponentBuilder"]
                });
            },
            function (test_injector_1_1) {
                exportStar_1(test_injector_1_1);
            },
            function (fake_async_1_1) {
                exportStar_1(fake_async_1_1);
            }],
        execute: function() {
        }
    }
});
