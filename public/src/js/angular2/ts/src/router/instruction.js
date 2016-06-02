System.register(['angular2/src/facade/collection', 'angular2/src/facade/lang', 'angular2/src/facade/async'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var collection_1, lang_1, async_1;
    var RouteParams, RouteData, BLANK_ROUTE_DATA, Instruction, ResolvedInstruction, DefaultInstruction, UnresolvedInstruction, RedirectInstruction, ComponentInstruction;
    return {
        setters:[
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (async_1_1) {
                async_1 = async_1_1;
            }],
        execute: function() {
            /**
             * `RouteParams` is an immutable map of parameters for the given route
             * based on the url matcher and optional parameters for that route.
             *
             * You can inject `RouteParams` into the constructor of a component to use it.
             *
             * ### Example
             *
             * ```
             * import {Component} from 'angular2/core';
             * import {bootstrap} from 'angular2/platform/browser';
             * import {Router, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, RouteConfig} from 'angular2/router';
             *
             * @Component({directives: [ROUTER_DIRECTIVES]})
             * @RouteConfig([
             *  {path: '/user/:id', component: UserCmp, as: 'UserCmp'},
             * ])
             * class AppCmp {}
             *
             * @Component({ template: 'user: {{id}}' })
             * class UserCmp {
             *   id: string;
             *   constructor(params: RouteParams) {
             *     this.id = params.get('id');
             *   }
             * }
             *
             * bootstrap(AppCmp, ROUTER_PROVIDERS);
             * ```
             */
            RouteParams = (function () {
                function RouteParams(params) {
                    this.params = params;
                }
                RouteParams.prototype.get = function (param) { return lang_1.normalizeBlank(collection_1.StringMapWrapper.get(this.params, param)); };
                return RouteParams;
            }());
            exports_1("RouteParams", RouteParams);
            /**
             * `RouteData` is an immutable map of additional data you can configure in your {@link Route}.
             *
             * You can inject `RouteData` into the constructor of a component to use it.
             *
             * ### Example
             *
             * ```
             * import {Component, View} from 'angular2/core';
             * import {bootstrap} from 'angular2/platform/browser';
             * import {Router, ROUTER_DIRECTIVES, routerBindings, RouteConfig} from 'angular2/router';
             *
             * @Component({...})
             * @View({directives: [ROUTER_DIRECTIVES]})
             * @RouteConfig([
             *  {path: '/user/:id', component: UserCmp, as: 'UserCmp', data: {isAdmin: true}},
             * ])
             * class AppCmp {}
             *
             * @Component({...})
             * @View({ template: 'user: {{isAdmin}}' })
             * class UserCmp {
             *   string: isAdmin;
             *   constructor(data: RouteData) {
             *     this.isAdmin = data.get('isAdmin');
             *   }
             * }
             *
             * bootstrap(AppCmp, routerBindings(AppCmp));
             * ```
             */
            RouteData = (function () {
                function RouteData(data) {
                    if (data === void 0) { data = lang_1.CONST_EXPR({}); }
                    this.data = data;
                }
                RouteData.prototype.get = function (key) { return lang_1.normalizeBlank(collection_1.StringMapWrapper.get(this.data, key)); };
                return RouteData;
            }());
            exports_1("RouteData", RouteData);
            exports_1("BLANK_ROUTE_DATA", BLANK_ROUTE_DATA = new RouteData());
            /**
             * `Instruction` is a tree of {@link ComponentInstruction}s with all the information needed
             * to transition each component in the app to a given route, including all auxiliary routes.
             *
             * `Instruction`s can be created using {@link Router#generate}, and can be used to
             * perform route changes with {@link Router#navigateByInstruction}.
             *
             * ### Example
             *
             * ```
             * import {Component} from 'angular2/core';
             * import {bootstrap} from 'angular2/platform/browser';
             * import {Router, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, RouteConfig} from 'angular2/router';
             *
             * @Component({directives: [ROUTER_DIRECTIVES]})
             * @RouteConfig([
             *  {...},
             * ])
             * class AppCmp {
             *   constructor(router: Router) {
             *     var instruction = router.generate(['/MyRoute']);
             *     router.navigateByInstruction(instruction);
             *   }
             * }
             *
             * bootstrap(AppCmp, ROUTER_PROVIDERS);
             * ```
             */
            Instruction = (function () {
                function Instruction(component, child, auxInstruction) {
                    this.component = component;
                    this.child = child;
                    this.auxInstruction = auxInstruction;
                }
                Object.defineProperty(Instruction.prototype, "urlPath", {
                    get: function () { return lang_1.isPresent(this.component) ? this.component.urlPath : ''; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Instruction.prototype, "urlParams", {
                    get: function () { return lang_1.isPresent(this.component) ? this.component.urlParams : []; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Instruction.prototype, "specificity", {
                    get: function () {
                        var total = '';
                        if (lang_1.isPresent(this.component)) {
                            total += this.component.specificity;
                        }
                        if (lang_1.isPresent(this.child)) {
                            total += this.child.specificity;
                        }
                        return total;
                    },
                    enumerable: true,
                    configurable: true
                });
                /**
                 * converts the instruction into a URL string
                 */
                Instruction.prototype.toRootUrl = function () { return this.toUrlPath() + this.toUrlQuery(); };
                /** @internal */
                Instruction.prototype._toNonRootUrl = function () {
                    return this._stringifyPathMatrixAuxPrefixed() +
                        (lang_1.isPresent(this.child) ? this.child._toNonRootUrl() : '');
                };
                Instruction.prototype.toUrlQuery = function () { return this.urlParams.length > 0 ? ('?' + this.urlParams.join('&')) : ''; };
                /**
                 * Returns a new instruction that shares the state of the existing instruction, but with
                 * the given child {@link Instruction} replacing the existing child.
                 */
                Instruction.prototype.replaceChild = function (child) {
                    return new ResolvedInstruction(this.component, child, this.auxInstruction);
                };
                /**
                 * If the final URL for the instruction is ``
                 */
                Instruction.prototype.toUrlPath = function () {
                    return this.urlPath + this._stringifyAux() +
                        (lang_1.isPresent(this.child) ? this.child._toNonRootUrl() : '');
                };
                // default instructions override these
                Instruction.prototype.toLinkUrl = function () {
                    return this.urlPath + this._stringifyAux() +
                        (lang_1.isPresent(this.child) ? this.child._toLinkUrl() : '');
                };
                // this is the non-root version (called recursively)
                /** @internal */
                Instruction.prototype._toLinkUrl = function () {
                    return this._stringifyPathMatrixAuxPrefixed() +
                        (lang_1.isPresent(this.child) ? this.child._toLinkUrl() : '');
                };
                /** @internal */
                Instruction.prototype._stringifyPathMatrixAuxPrefixed = function () {
                    var primary = this._stringifyPathMatrixAux();
                    if (primary.length > 0) {
                        primary = '/' + primary;
                    }
                    return primary;
                };
                /** @internal */
                Instruction.prototype._stringifyMatrixParams = function () {
                    return this.urlParams.length > 0 ? (';' + this.urlParams.join(';')) : '';
                };
                /** @internal */
                Instruction.prototype._stringifyPathMatrixAux = function () {
                    if (lang_1.isBlank(this.component)) {
                        return '';
                    }
                    return this.urlPath + this._stringifyMatrixParams() + this._stringifyAux();
                };
                /** @internal */
                Instruction.prototype._stringifyAux = function () {
                    var routes = [];
                    collection_1.StringMapWrapper.forEach(this.auxInstruction, function (auxInstruction, _) {
                        routes.push(auxInstruction._stringifyPathMatrixAux());
                    });
                    if (routes.length > 0) {
                        return '(' + routes.join('//') + ')';
                    }
                    return '';
                };
                return Instruction;
            }());
            exports_1("Instruction", Instruction);
            /**
             * a resolved instruction has an outlet instruction for itself, but maybe not for...
             */
            ResolvedInstruction = (function (_super) {
                __extends(ResolvedInstruction, _super);
                function ResolvedInstruction(component, child, auxInstruction) {
                    _super.call(this, component, child, auxInstruction);
                }
                ResolvedInstruction.prototype.resolveComponent = function () {
                    return async_1.PromiseWrapper.resolve(this.component);
                };
                return ResolvedInstruction;
            }(Instruction));
            exports_1("ResolvedInstruction", ResolvedInstruction);
            /**
             * Represents a resolved default route
             */
            DefaultInstruction = (function (_super) {
                __extends(DefaultInstruction, _super);
                function DefaultInstruction(component, child) {
                    _super.call(this, component, child, {});
                }
                DefaultInstruction.prototype.resolveComponent = function () {
                    return async_1.PromiseWrapper.resolve(this.component);
                };
                DefaultInstruction.prototype.toLinkUrl = function () { return ''; };
                /** @internal */
                DefaultInstruction.prototype._toLinkUrl = function () { return ''; };
                return DefaultInstruction;
            }(Instruction));
            exports_1("DefaultInstruction", DefaultInstruction);
            /**
             * Represents a component that may need to do some redirection or lazy loading at a later time.
             */
            UnresolvedInstruction = (function (_super) {
                __extends(UnresolvedInstruction, _super);
                function UnresolvedInstruction(_resolver, _urlPath, _urlParams) {
                    if (_urlPath === void 0) { _urlPath = ''; }
                    if (_urlParams === void 0) { _urlParams = lang_1.CONST_EXPR([]); }
                    _super.call(this, null, null, {});
                    this._resolver = _resolver;
                    this._urlPath = _urlPath;
                    this._urlParams = _urlParams;
                }
                Object.defineProperty(UnresolvedInstruction.prototype, "urlPath", {
                    get: function () {
                        if (lang_1.isPresent(this.component)) {
                            return this.component.urlPath;
                        }
                        if (lang_1.isPresent(this._urlPath)) {
                            return this._urlPath;
                        }
                        return '';
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(UnresolvedInstruction.prototype, "urlParams", {
                    get: function () {
                        if (lang_1.isPresent(this.component)) {
                            return this.component.urlParams;
                        }
                        if (lang_1.isPresent(this._urlParams)) {
                            return this._urlParams;
                        }
                        return [];
                    },
                    enumerable: true,
                    configurable: true
                });
                UnresolvedInstruction.prototype.resolveComponent = function () {
                    var _this = this;
                    if (lang_1.isPresent(this.component)) {
                        return async_1.PromiseWrapper.resolve(this.component);
                    }
                    return this._resolver().then(function (resolution) {
                        _this.child = resolution.child;
                        return _this.component = resolution.component;
                    });
                };
                return UnresolvedInstruction;
            }(Instruction));
            exports_1("UnresolvedInstruction", UnresolvedInstruction);
            RedirectInstruction = (function (_super) {
                __extends(RedirectInstruction, _super);
                function RedirectInstruction(component, child, auxInstruction, _specificity) {
                    _super.call(this, component, child, auxInstruction);
                    this._specificity = _specificity;
                }
                Object.defineProperty(RedirectInstruction.prototype, "specificity", {
                    get: function () { return this._specificity; },
                    enumerable: true,
                    configurable: true
                });
                return RedirectInstruction;
            }(ResolvedInstruction));
            exports_1("RedirectInstruction", RedirectInstruction);
            /**
             * A `ComponentInstruction` represents the route state for a single component. An `Instruction` is
             * composed of a tree of these `ComponentInstruction`s.
             *
             * `ComponentInstructions` is a public API. Instances of `ComponentInstruction` are passed
             * to route lifecycle hooks, like {@link CanActivate}.
             *
             * `ComponentInstruction`s are [hash consed](https://en.wikipedia.org/wiki/Hash_consing). You should
             * never construct one yourself with "new." Instead, rely on {@link Router/RouteRecognizer} to
             * construct `ComponentInstruction`s.
             *
             * You should not modify this object. It should be treated as immutable.
             */
            ComponentInstruction = (function () {
                function ComponentInstruction(urlPath, urlParams, data, componentType, terminal, specificity, params) {
                    if (params === void 0) { params = null; }
                    this.urlPath = urlPath;
                    this.urlParams = urlParams;
                    this.componentType = componentType;
                    this.terminal = terminal;
                    this.specificity = specificity;
                    this.params = params;
                    this.reuse = false;
                    this.routeData = lang_1.isPresent(data) ? data : BLANK_ROUTE_DATA;
                }
                return ComponentInstruction;
            }());
            exports_1("ComponentInstruction", ComponentInstruction);
        }
    }
});