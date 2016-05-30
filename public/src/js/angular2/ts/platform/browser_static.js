System.register(['angular2/src/facade/lang', 'angular2/src/platform/browser_common', 'angular2/core'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1, browser_common_1, core_1;
    var BROWSER_APP_PROVIDERS;
    /**
     * See {@link bootstrap} for more information.
     */
    function bootstrapStatic(appComponentType, customProviders, initReflector) {
        if (lang_1.isPresent(initReflector)) {
            initReflector();
        }
        var appProviders = lang_1.isPresent(customProviders) ? [BROWSER_APP_PROVIDERS, customProviders] : BROWSER_APP_PROVIDERS;
        return core_1.platform(browser_common_1.BROWSER_PROVIDERS).application(appProviders).bootstrap(appComponentType);
    }
    exports_1("bootstrapStatic", bootstrapStatic);
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (browser_common_1_1) {
                browser_common_1 = browser_common_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            /**
             * An array of providers that should be passed into `application()` when bootstrapping a component
             * when all templates
             * have been precompiled offline.
             */
            exports_1("BROWSER_APP_PROVIDERS", BROWSER_APP_PROVIDERS = browser_common_1.BROWSER_APP_COMMON_PROVIDERS);
        }
    }
});
