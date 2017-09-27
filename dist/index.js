!function(root, factory) {
    "object" == typeof exports && "object" == typeof module ? module.exports = factory() : "function" == typeof define && define.amd ? define([], factory) : "object" == typeof exports ? exports["vue-js-modal"] = factory() : root["vue-js-modal"] = factory();
}(this, function() {
    return function(modules) {
        function __webpack_require__(moduleId) {
            if (installedModules[moduleId]) return installedModules[moduleId].exports;
            var module = installedModules[moduleId] = {
                i: moduleId,
                l: !1,
                exports: {}
            };
            return modules[moduleId].call(module.exports, module, module.exports, __webpack_require__), 
            module.l = !0, module.exports;
        }
        var installedModules = {};
        return __webpack_require__.m = modules, __webpack_require__.c = installedModules, 
        __webpack_require__.i = function(value) {
            return value;
        }, __webpack_require__.d = function(exports, name, getter) {
            __webpack_require__.o(exports, name) || Object.defineProperty(exports, name, {
                configurable: !1,
                enumerable: !0,
                get: getter
            });
        }, __webpack_require__.n = function(module) {
            var getter = module && module.__esModule ? function() {
                return module.default;
            } : function() {
                return module;
            };
            return __webpack_require__.d(getter, "a", getter), getter;
        }, __webpack_require__.o = function(object, property) {
            return Object.prototype.hasOwnProperty.call(object, property);
        }, __webpack_require__.p = "/dist/", __webpack_require__(__webpack_require__.s = 3);
    }([ function(module, exports) {
        module.exports = function() {
            var list = [];
            return list.toString = function() {
                for (var result = [], i = 0; i < this.length; i++) {
                    var item = this[i];
                    item[2] ? result.push("@media " + item[2] + "{" + item[1] + "}") : result.push(item[1]);
                }
                return result.join("");
            }, list.i = function(modules, mediaQuery) {
                "string" == typeof modules && (modules = [ [ null, modules, "" ] ]);
                for (var alreadyImportedModules = {}, i = 0; i < this.length; i++) {
                    var id = this[i][0];
                    "number" == typeof id && (alreadyImportedModules[id] = !0);
                }
                for (i = 0; i < modules.length; i++) {
                    var item = modules[i];
                    "number" == typeof item[0] && alreadyImportedModules[item[0]] || (mediaQuery && !item[2] ? item[2] = mediaQuery : mediaQuery && (item[2] = "(" + item[2] + ") and (" + mediaQuery + ")"), 
                    list.push(item));
                }
            }, list;
        };
    }, function(module, exports) {
        module.exports = function(rawScriptExports, compiledTemplate, scopeId, cssModules) {
            var esModule, scriptExports = rawScriptExports = rawScriptExports || {}, type = typeof rawScriptExports.default;
            "object" !== type && "function" !== type || (esModule = rawScriptExports, scriptExports = rawScriptExports.default);
            var options = "function" == typeof scriptExports ? scriptExports.options : scriptExports;
            if (compiledTemplate && (options.render = compiledTemplate.render, options.staticRenderFns = compiledTemplate.staticRenderFns), 
            scopeId && (options._scopeId = scopeId), cssModules) {
                var computed = options.computed || (options.computed = {});
                Object.keys(cssModules).forEach(function(key) {
                    var module = cssModules[key];
                    computed[key] = function() {
                        return module;
                    };
                });
            }
            return {
                esModule: esModule,
                exports: scriptExports,
                options: options
            };
        };
    }, function(module, exports, __webpack_require__) {
        function addStylesToDom(styles) {
            for (var i = 0; i < styles.length; i++) {
                var item = styles[i], domStyle = stylesInDom[item.id];
                if (domStyle) {
                    domStyle.refs++;
                    for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j](item.parts[j]);
                    for (;j < item.parts.length; j++) domStyle.parts.push(addStyle(item.parts[j]));
                    domStyle.parts.length > item.parts.length && (domStyle.parts.length = item.parts.length);
                } else {
                    for (var parts = [], j = 0; j < item.parts.length; j++) parts.push(addStyle(item.parts[j]));
                    stylesInDom[item.id] = {
                        id: item.id,
                        refs: 1,
                        parts: parts
                    };
                }
            }
        }
        function createStyleElement() {
            var styleElement = document.createElement("style");
            return styleElement.type = "text/css", head.appendChild(styleElement), styleElement;
        }
        function addStyle(obj) {
            var update, remove, styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]');
            if (styleElement) {
                if (isProduction) return noop;
                styleElement.parentNode.removeChild(styleElement);
            }
            if (isOldIE) {
                var styleIndex = singletonCounter++;
                styleElement = singletonElement || (singletonElement = createStyleElement()), update = applyToSingletonTag.bind(null, styleElement, styleIndex, !1), 
                remove = applyToSingletonTag.bind(null, styleElement, styleIndex, !0);
            } else styleElement = createStyleElement(), update = applyToTag.bind(null, styleElement), 
            remove = function() {
                styleElement.parentNode.removeChild(styleElement);
            };
            return update(obj), function(newObj) {
                if (newObj) {
                    if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) return;
                    update(obj = newObj);
                } else remove();
            };
        }
        function applyToSingletonTag(styleElement, index, remove, obj) {
            var css = remove ? "" : obj.css;
            if (styleElement.styleSheet) styleElement.styleSheet.cssText = replaceText(index, css); else {
                var cssNode = document.createTextNode(css), childNodes = styleElement.childNodes;
                childNodes[index] && styleElement.removeChild(childNodes[index]), childNodes.length ? styleElement.insertBefore(cssNode, childNodes[index]) : styleElement.appendChild(cssNode);
            }
        }
        function applyToTag(styleElement, obj) {
            var css = obj.css, media = obj.media, sourceMap = obj.sourceMap;
            if (media && styleElement.setAttribute("media", media), sourceMap && (css += "\n/*# sourceURL=" + sourceMap.sources[0] + " */", 
            css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */"), 
            styleElement.styleSheet) styleElement.styleSheet.cssText = css; else {
                for (;styleElement.firstChild; ) styleElement.removeChild(styleElement.firstChild);
                styleElement.appendChild(document.createTextNode(css));
            }
        }
        var hasDocument = "undefined" != typeof document;
        if ("undefined" != typeof DEBUG && DEBUG && !hasDocument) throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");
        var listToStyles = __webpack_require__(21), stylesInDom = {}, head = hasDocument && (document.head || document.getElementsByTagName("head")[0]), singletonElement = null, singletonCounter = 0, isProduction = !1, noop = function() {}, isOldIE = "undefined" != typeof navigator && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase());
        module.exports = function(parentId, list, _isProduction) {
            isProduction = _isProduction;
            var styles = listToStyles(parentId, list);
            return addStylesToDom(styles), function(newList) {
                for (var mayRemove = [], i = 0; i < styles.length; i++) {
                    var item = styles[i], domStyle = stylesInDom[item.id];
                    domStyle.refs--, mayRemove.push(domStyle);
                }
                newList ? (styles = listToStyles(parentId, newList), addStylesToDom(styles)) : styles = [];
                for (var i = 0; i < mayRemove.length; i++) {
                    var domStyle = mayRemove[i];
                    if (0 === domStyle.refs) {
                        for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();
                        delete stylesInDom[domStyle.id];
                    }
                }
            };
        };
        var replaceText = function() {
            var textStore = [];
            return function(index, replacement) {
                return textStore[index] = replacement, textStore.filter(Boolean).join("\n");
            };
        }();
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _Modal = __webpack_require__(6), _Modal2 = _interopRequireDefault(_Modal), _Dialog = __webpack_require__(5), _Dialog2 = _interopRequireDefault(_Dialog), Plugin = {
            install: function(Vue) {
                var options = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                if (!this.installed) {
                    this.installed = !0, this.event = new Vue(), Vue.prototype.$modal = {
                        show: function(name, params) {
                            Plugin.event.$emit("toggle", name, !0, params);
                        },
                        hide: function(name, params) {
                            Plugin.event.$emit("toggle", name, !1, params);
                        },
                        toggle: function(name, params) {
                            Plugin.event.$emit("toggle", name, void 0, params);
                        }
                    };
                    var componentName = options.componentName || "modal";
                    Vue.component(componentName, _Modal2.default), options.dialog && Vue.component("v-dialog", _Dialog2.default);
                }
            }
        };
        exports.default = Plugin;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var inRange = exports.inRange = function(from, to, value) {
            return value < from ? from : value > to ? to : value;
        };
        exports.default = {
            inRange: inRange
        };
    }, function(module, exports, __webpack_require__) {
        __webpack_require__(18);
        var Component = __webpack_require__(1)(__webpack_require__(7), __webpack_require__(15), null, null);
        Component.options.__file = "/Users/yev/Projects/vue/vue-js-modal/src/Dialog.vue", 
        Component.esModule && Object.keys(Component.esModule).some(function(key) {
            return "default" !== key && "__esModule" !== key;
        }) && console.error("named exports are not supported in *.vue files."), Component.options.functional && console.error("[vue-loader] Dialog.vue: functional components are not supported with templates, they should use render functions."), 
        module.exports = Component.exports;
    }, function(module, exports, __webpack_require__) {
        __webpack_require__(19);
        var Component = __webpack_require__(1)(__webpack_require__(8), __webpack_require__(16), null, null);
        Component.options.__file = "/Users/yev/Projects/vue/vue-js-modal/src/Modal.vue", 
        Component.esModule && Object.keys(Component.esModule).some(function(key) {
            return "default" !== key && "__esModule" !== key;
        }) && console.error("named exports are not supported in *.vue files."), Component.options.functional && console.error("[vue-loader] Modal.vue: functional components are not supported with templates, they should use render functions."), 
        module.exports = Component.exports;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.default = {
            name: "Dialog",
            props: {
                width: {
                    type: [ Number, String ],
                    default: 400
                },
                clickToClose: {
                    type: Boolean,
                    default: !0
                },
                transition: {
                    type: String,
                    default: "fade"
                }
            },
            data: function() {
                return {
                    params: {},
                    defaultButtons: [ {
                        title: "CLOSE"
                    } ]
                };
            },
            computed: {
                buttons: function() {
                    return this.params.buttons || this.defaultButtons;
                },
                buttonStyle: function() {
                    return {
                        flex: "1 1 " + 100 / this.buttons.length + "%"
                    };
                }
            },
            methods: {
                beforeOpened: function(event) {
                    this.params = event.params || {}, this.$emit("before-opened", event);
                },
                beforeClosed: function(event) {
                    this.params = {}, this.$emit("before-closed", event);
                },
                click: function(i, event) {
                    var button = this.buttons[i];
                    if ("function" == typeof button.handler) return button.handler(i, event);
                    this.$modal.hide("dialog");
                }
            }
        };
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _index = __webpack_require__(3), _index2 = _interopRequireDefault(_index), _Resizer = __webpack_require__(14), _Resizer2 = _interopRequireDefault(_Resizer), _util = __webpack_require__(4), _parser = __webpack_require__(10), _parser2 = _interopRequireDefault(_parser);
        exports.default = {
            name: "VueJsModal",
            props: {
                name: {
                    required: !0,
                    type: String
                },
                delay: {
                    type: Number,
                    default: 0
                },
                resizable: {
                    type: Boolean,
                    default: !1
                },
                adaptive: {
                    type: Boolean,
                    default: !1
                },
                draggable: {
                    type: [ Boolean, String ],
                    default: !1
                },
                scrollable: {
                    type: Boolean,
                    default: !1
                },
                reset: {
                    type: Boolean,
                    default: !1
                },
                transition: {
                    type: String
                },
                clickToClose: {
                    type: Boolean,
                    default: !0
                },
                classes: {
                    type: [ String, Array ],
                    default: "v--modal"
                },
                minWidth: {
                    type: Number,
                    default: 0,
                    validator: function(value) {
                        return value >= 0;
                    }
                },
                minHeight: {
                    type: Number,
                    default: 0,
                    validator: function(value) {
                        return value >= 0;
                    }
                },
                width: {
                    type: [ Number, String ],
                    default: 600,
                    validator: function(value) {
                        if ("string" == typeof value) {
                            var width = (0, _parser2.default)(value);
                            return ("%" === width.type || "px" === width.type) && width.value > 0;
                        }
                        return value >= 0;
                    }
                },
                height: {
                    type: [ Number, String ],
                    default: 300,
                    validator: function(value) {
                        if ("string" == typeof value) {
                            if ("auto" === value) return !0;
                            var height = (0, _parser2.default)(value);
                            return ("%" === height.type || "px" === height.type) && height.value > 0;
                        }
                        return value >= 0;
                    }
                },
                pivotX: {
                    type: Number,
                    default: .5,
                    validator: function(value) {
                        return value >= 0 && value <= 1;
                    }
                },
                pivotY: {
                    type: Number,
                    default: .5,
                    validator: function(value) {
                        return value >= 0 && value <= 1;
                    }
                }
            },
            components: {
                Resizer: _Resizer2.default
            },
            data: function() {
                return {
                    visible: !1,
                    visibility: {
                        modal: !1,
                        overlay: !1
                    },
                    shift: {
                        left: 0,
                        top: 0
                    },
                    modal: {
                        width: 0,
                        widthType: "px",
                        height: 0,
                        heightType: "px"
                    },
                    window: {
                        width: 0,
                        height: 0
                    }
                };
            },
            watch: {
                visible: function(value) {
                    var _this = this;
                    value ? (this.visibility.overlay = !0, setTimeout(function() {
                        _this.visibility.modal = !0, _this.$nextTick(function() {
                            _this.addDraggableListeners();
                        });
                    }, this.delay)) : (this.visibility.modal = !1, setTimeout(function() {
                        _this.visibility.overlay = !1, _this.$nextTick(function() {
                            _this.removeDraggableListeners();
                        });
                    }, this.delay));
                }
            },
            created: function() {
                this.setInitialSize();
            },
            beforeMount: function() {
                var _this2 = this;
                _index2.default.event.$on("toggle", function(name, state, params) {
                    name === _this2.name && (void 0 === state && (state = !_this2.visible), _this2.toggle(state, params));
                }), window.addEventListener("resize", this.onWindowResize), this.onWindowResize(), 
                this.scrollable && !this.isAutoHeight && console.warn('Modal "' + this.name + '" has scrollable flag set to true but height is not "auto" (' + this.height + ")");
            },
            beforeDestroy: function() {
                window.removeEventListener("resize", this.onWindowResize);
            },
            computed: {
                isAutoHeight: function() {
                    return "auto" === this.modal.heightType;
                },
                position: function() {
                    var window = this.window, shift = this.shift, pivotX = this.pivotX, pivotY = this.pivotY, trueModalWidth = this.trueModalWidth, trueModalHeight = this.trueModalHeight, maxLeft = window.width - trueModalWidth, maxTop = window.height - trueModalHeight, minTop = this.scrollable ? Number.NEGATIVE_INFINITY : 0, left = shift.left + pivotX * maxLeft, top = shift.top + pivotY * maxTop;
                    return {
                        left: (0, _util.inRange)(0, maxLeft, left),
                        top: (0, _util.inRange)(minTop, maxTop, top)
                    };
                },
                trueModalWidth: function() {
                    var window = this.window, modal = this.modal, adaptive = this.adaptive, minWidth = this.minWidth, value = "%" === modal.widthType ? window.width / 100 * modal.width : modal.width;
                    return adaptive ? (0, _util.inRange)(minWidth, window.width, value) : value;
                },
                trueModalHeight: function() {
                    var window = this.window, modal = this.modal, isAutoHeight = this.isAutoHeight, adaptive = this.adaptive, value = "%" === modal.heightType ? window.height / 100 * modal.height : modal.height;
                    return isAutoHeight ? 0 : adaptive ? (0, _util.inRange)(this.minHeight, this.window.height, value) : value;
                },
                overlayClass: function() {
                    return {
                        "v--modal-overlay": !0,
                        scrollable: this.scrollable && this.isAutoHeight
                    };
                },
                modalClass: function() {
                    return [ "v--modal-box", this.classes ];
                },
                modalStyle: function() {
                    return {
                        top: this.position.top + "px",
                        left: this.position.left + "px",
                        width: this.trueModalWidth + "px",
                        height: this.isAutoHeight ? "auto" : this.trueModalHeight + "px"
                    };
                }
            },
            methods: {
                setInitialSize: function() {
                    var modal = this.modal, width = (0, _parser2.default)(this.width), height = (0, 
                    _parser2.default)(this.height);
                    modal.width = width.value, modal.widthType = width.type, modal.height = height.value, 
                    modal.heightType = height.type;
                },
                onWindowResize: function() {
                    this.window.width = window.innerWidth, this.window.height = window.innerHeight;
                },
                genEventObject: function(params) {
                    var data = {
                        name: this.name,
                        timestamp: Date.now(),
                        canceled: !1,
                        ref: this.$refs.modal
                    };
                    return Object.assign(data, params || {});
                },
                onModalResize: function(event) {
                    this.modal.widthType = "px", this.modal.width = event.size.width, this.modal.heightType = "px", 
                    this.modal.height = event.size.height;
                    var size = this.modal.size, resizeEvent = this.genEventObject({
                        size: size
                    });
                    this.$emit("resize", resizeEvent);
                },
                toggle: function(state, params) {
                    var reset = this.reset, scrollable = this.scrollable, visible = this.visible, beforeEventName = visible ? "before-close" : "before-open", afterEventName = visible ? "closed" : "opened";
                    "before-open" === beforeEventName && (reset && (this.setInitialSize(), this.shift.left = 0, 
                    this.shift.top = 0), scrollable && document.body.classList.add("v--modal-block-scroll")), 
                    "before-close" === beforeEventName && scrollable && document.body.classList.remove("v--modal-block-scroll");
                    var stopEventExecution = !1, stop = function() {
                        stopEventExecution = !0;
                    }, beforeEvent = this.genEventObject({
                        stop: stop,
                        state: state,
                        params: params
                    });
                    if (this.$emit(beforeEventName, beforeEvent), !stopEventExecution) {
                        var afterEvent = this.genEventObject({
                            state: state,
                            params: params
                        });
                        this.visible = state, this.$emit(afterEventName, afterEvent);
                    }
                },
                getDraggableElement: function() {
                    var selector = "string" != typeof this.draggable ? ".v--modal-box" : this.draggable;
                    if (selector) {
                        var handler = this.$refs.overlay.querySelector(selector);
                        if (handler) return handler;
                    }
                },
                onBackgroundClick: function() {
                    this.clickToClose && this.toggle(!1);
                },
                addDraggableListeners: function() {
                    var _this3 = this;
                    if (this.draggable) {
                        var dragger = this.getDraggableElement();
                        if (dragger) {
                            var startX = 0, startY = 0, cachedShiftX = 0, cachedShiftY = 0, getPosition = function(event) {
                                return event.touches && event.touches.length > 0 ? event.touches[0] : event;
                            }, mousedown = function(event) {
                                var target = event.target;
                                if (!target || "INPUT" !== target.nodeName) {
                                    var _getPosition = getPosition(event), clientX = _getPosition.clientX, clientY = _getPosition.clientY;
                                    document.addEventListener("mousemove", _mousemove), document.addEventListener("mouseup", _mouseup), 
                                    document.addEventListener("touchmove", _mousemove), document.addEventListener("touchend", _mouseup), 
                                    startX = clientX, startY = clientY, cachedShiftX = _this3.shift.left, cachedShiftY = _this3.shift.top;
                                }
                            }, _mousemove = function(event) {
                                var _getPosition2 = getPosition(event), clientX = _getPosition2.clientX, clientY = _getPosition2.clientY;
                                _this3.shift.left = cachedShiftX + clientX - startX, _this3.shift.top = cachedShiftY + clientY - startY, 
                                event.preventDefault();
                            }, _mouseup = function _mouseup(event) {
                                document.removeEventListener("mousemove", _mousemove), document.removeEventListener("mouseup", _mouseup), 
                                document.removeEventListener("touchmove", _mousemove), document.removeEventListener("touchend", _mouseup), 
                                event.preventDefault();
                            };
                            dragger.addEventListener("mousedown", mousedown), dragger.addEventListener("touchstart", mousedown);
                        }
                    }
                },
                removeDraggableListeners: function() {}
            }
        };
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _util = __webpack_require__(4);
        exports.default = {
            name: "VueJsModalResizer",
            props: {
                minHeight: {
                    type: Number,
                    default: 0
                },
                minWidth: {
                    type: Number,
                    default: 0
                }
            },
            data: function() {
                return {
                    clicked: !1,
                    size: {}
                };
            },
            mounted: function() {
                this.$el.addEventListener("mousedown", this.start, !1);
            },
            computed: {
                className: function() {
                    return {
                        "vue-modal-resizer": !0,
                        clicked: this.clicked
                    };
                }
            },
            methods: {
                start: function(event) {
                    this.clicked = !0, window.addEventListener("mousemove", this.mousemove, !1), window.addEventListener("mouseup", this.stop, !1), 
                    event.stopPropagation(), event.preventDefault();
                },
                stop: function() {
                    this.clicked = !1, window.removeEventListener("mousemove", this.mousemove, !1), 
                    window.removeEventListener("mouseup", this.stop, !1), this.$emit("resize-stop", {
                        element: this.$el.parentElement,
                        size: this.size
                    });
                },
                mousemove: function(event) {
                    this.resize(event);
                },
                resize: function(event) {
                    var el = this.$el.parentElement;
                    if (el) {
                        var width = event.clientX - el.offsetLeft, height = event.clientY - el.offsetTop;
                        width = (0, _util.inRange)(this.minWidth, window.innerWidth, width), height = (0, 
                        _util.inRange)(this.minHeight, window.innerHeight, height), this.size = {
                            width: width,
                            height: height
                        }, el.style.width = width + "px", el.style.height = height + "px", this.$emit("resize", {
                            element: el,
                            size: this.size
                        });
                    }
                }
            }
        };
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
            return typeof obj;
        } : function(obj) {
            return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        }, types = [ {
            name: "px",
            regexp: new RegExp("^[-+]?[0-9]*.?[0-9]+px$")
        }, {
            name: "%",
            regexp: new RegExp("^[-+]?[0-9]*.?[0-9]+%$")
        }, {
            name: "px",
            regexp: new RegExp("^[-+]?[0-9]*.?[0-9]+$")
        } ], getType = function(value) {
            if ("auto" === value) return {
                type: value,
                value: 0
            };
            for (var i = 0; i < types.length; i++) {
                var type = types[i];
                if (type.regexp.test(value)) return {
                    type: type.name,
                    value: parseFloat(value)
                };
            }
            return {
                type: "",
                value: value
            };
        }, parse = exports.parse = function(value) {
            switch (void 0 === value ? "undefined" : _typeof(value)) {
              case "number":
                return {
                    type: "px",
                    value: value
                };

              case "string":
                return getType(value);

              default:
                return {
                    type: "",
                    value: value
                };
            }
        };
        exports.default = parse;
    }, function(module, exports, __webpack_require__) {
        exports = module.exports = __webpack_require__(0)(), exports.push([ module.i, "\n.vue-dialog {\n  font-size: 14px;\n}\n.vue-dialog div {\n  box-sizing: border-box;\n}\n.vue-dialog .dialog-flex {\n  width: 100%;\n  height: 100%;\n}\n.vue-dialog .dialog-content {\n  flex: 1 0 auto;\n  width: 100%;\n  padding: 15px;\n}\n.vue-dialog .dialog-c-title {\n  font-weight: 600;\n  padding-bottom: 15px;\n}\n.vue-dialog .dialog-c-text {\n}\n.vue-dialog .dialog-buttons {\n  display: flex;\n  flex: 0 1 auto;\n  width: 100%;\n  border-top: 1px solid #eee;\n  font-size: 12px;\n}\n.vue-dialog .dialog-buttons-none {\n  width: 100%;\n  padding-bottom: 15px;\n}\n.vue-dialog button {\n  background: transparent;\n  padding: 0;\n  margin: 0;\n  border: 0;\n  cursor: pointer;\n  box-sizing: border-box;\n  line-height: 44px;\n  height: 44px;\n\n/*  text-transform: uppercase; */\n/*  letter-spacing: 1px; */\n\n  color:inherit;\n  font:inherit;\n}\n.vue-dialog button:hover {\n  background: rgba(0, 0, 0, 0.01);\n}\n.vue-dialog button:active {\n  background: rgba(0, 0, 0, 0.025);\n}\n.vue-dialog button:not(:first-of-type) {\n  border-left: 1px solid #eee;\n}\n", "", {
            version: 3,
            sources: [ "/./src/Dialog.vue?5777ebd5" ],
            names: [],
            mappings: ";AA2FA;EACA,gBAAA;CACA;AAEA;EACA,uBAAA;CACA;AAEA;EACA,YAAA;EACA,aAAA;CACA;AAEA;EACA,eAAA;EACA,YAAA;EACA,cAAA;CACA;AAEA;EACA,iBAAA;EACA,qBAAA;CACA;AAEA;CACA;AAEA;EACA,cAAA;EACA,eAAA;EACA,YAAA;EACA,2BAAA;EACA,gBAAA;CACA;AAEA;EACA,YAAA;EACA,qBAAA;CACA;AAEA;EACA,wBAAA;EACA,WAAA;EACA,UAAA;EACA,UAAA;EACA,gBAAA;EACA,uBAAA;EACA,kBAAA;EACA,aAAA;;AAEA,iCAAA;AACA,2BAAA;;EAEA,cAAA;EACA,aAAA;CACA;AAEA;EACA,gCAAA;CACA;AAEA;EACA,iCAAA;CACA;AAEA;EACA,4BAAA;CACA",
            file: "Dialog.vue",
            sourcesContent: [ '<template>\n  <modal name="dialog"\n         height="auto"\n         :classes="[\'v--modal\', \'vue-dialog\', this.params.class]"\n         :width="width"\n         :pivot-y="0.3"\n         :adaptive="true"\n         :clickToClose="clickToClose"\n         :transition="transition"\n         @before-open="beforeOpened"\n         @before-close="beforeClosed"\n         @opened="$emit(\'opened\', $event)"\n         @closed="$emit(\'closed\', $event)">\n      <div class="dialog-content">\n        <div class="dialog-c-title"\n             v-if="params.title"\n             v-html="params.title || \'\'"></div>\n        <div class="dialog-c-text"\n             v-html="params.text || \'\'"></div>\n      </div>\n      <div class="dialog-buttons" v-if="buttons">\n        <button v-for="(button, i) in buttons"\n                :style="buttonStyle"\n                :key="i"\n                v-html="button.title"\n                @click.stop="click(i, $event)">\n          {{button.title}}\n        </button>\n      </div>\n      <div v-else class="dialog-buttons-none"></div>\n  </modal>\n</template>\n<script>\n  export default {\n    name: \'Dialog\',\n    props: {\n      width: {\n        type: [Number, String],\n        default: 400\n      },\n      clickToClose: {\n        type: Boolean,\n        default: true\n      },\n      transition: {\n        type: String,\n        default: \'fade\'\n      }\n    },\n    data () {\n      return {\n        params: {},\n        defaultButtons: [{ title: \'CLOSE\' }]\n      }\n    },\n    computed: {\n      buttons () {\n        return this.params.buttons || this.defaultButtons\n      },\n      /**\n       * Returns FLEX style with correct width for arbitrary number of\n       * buttons.\n       */\n      buttonStyle () {\n        return {\n          flex: `1 1 ${100 / this.buttons.length}%`\n        }\n      }\n    },\n    methods: {\n      beforeOpened (event) {\n        this.params = event.params || {}\n        this.$emit(\'before-opened\', event)\n      },\n      beforeClosed (event) {\n        this.params = {}\n        this.$emit(\'before-closed\', event)\n      },\n      click (i, event) {\n        let button = this.buttons[i]\n\n        if (typeof button.handler === \'function\') {\n          return button.handler(i, event)\n        } else {\n          this.$modal.hide(\'dialog\')\n        }\n      }\n    }\n  }\n<\/script>\n<style>\n  .vue-dialog {\n    font-size: 14px;\n  }\n\n  .vue-dialog div {\n    box-sizing: border-box;\n  }\n\n  .vue-dialog .dialog-flex {\n    width: 100%;\n    height: 100%;\n  }\n\n  .vue-dialog .dialog-content {\n    flex: 1 0 auto;\n    width: 100%;\n    padding: 15px;\n  }\n\n  .vue-dialog .dialog-c-title {\n    font-weight: 600;\n    padding-bottom: 15px;\n  }\n\n  .vue-dialog .dialog-c-text {\n  }\n\n  .vue-dialog .dialog-buttons {\n    display: flex;\n    flex: 0 1 auto;\n    width: 100%;\n    border-top: 1px solid #eee;\n    font-size: 12px;\n  }\n\n  .vue-dialog .dialog-buttons-none {\n    width: 100%;\n    padding-bottom: 15px;\n  }\n\n  .vue-dialog button {\n    background: transparent;\n    padding: 0;\n    margin: 0;\n    border: 0;\n    cursor: pointer;\n    box-sizing: border-box;\n    line-height: 44px;\n    height: 44px;\n\n  /*  text-transform: uppercase; */\n  /*  letter-spacing: 1px; */\n\n    color:inherit;\n    font:inherit;\n  }\n\n  .vue-dialog button:hover {\n    background: rgba(0, 0, 0, 0.01);\n  }\n\n  .vue-dialog button:active {\n    background: rgba(0, 0, 0, 0.025);\n  }\n\n  .vue-dialog button:not(:first-of-type) {\n    border-left: 1px solid #eee;\n  }\n</style>\n' ],
            sourceRoot: "webpack://"
        } ]);
    }, function(module, exports, __webpack_require__) {
        exports = module.exports = __webpack_require__(0)(), exports.push([ module.i, "\n.v--modal-block-scroll {\n  overflow: hidden;\n}\n.v--modal-overlay {\n  position: fixed;\n  box-sizing: border-box;\n  left: 0;\n  top: 0;\n  width: 100vw;\n  height: 100vh;\n  background: rgba(0, 0, 0, 0.2);\n  z-index: 999;\n  opacity: 1;\n}\n.v--modal-overlay.scrollable {\n  height: 100%;\n  min-height: 100vh;\n  overflow-y: auto;\n  padding-bottom: 10px;\n}\n.v--modal-overlay .v--modal-box {\n  position: relative;\n  overflow: hidden;\n  box-sizing: border-box;\n}\n.v--modal-overlay.scrollable .v--modal-box {\n  margin-bottom: 10px;\n}\n.v--modal {\n  background-color: white;\n  text-align: left;\n  border-radius: 3px;\n  box-shadow: 0 20px 60px -2px rgba(27, 33, 58, .4);\n  padding: 0;\n}\n.v--modal.v--modal-fullscreen {\n  width: 100vw;\n  height: 100vh;\n  margin: 0;\n  left: 0;\n  top: 0;\n}\n.v--modal-top-right {\n  display: block;\n  position: absolute;\n  right: 0;\n  top: 0;\n}\n.overlay-fade-enter-active, .overlay-fade-leave-active {\n  transition: all 0.2s;\n}\n.overlay-fade-enter, .overlay-fade-leave-active {\n  opacity: 0;\n}\n.nice-modal-fade-enter-active, .nice-modal-fade-leave-active {\n  transition: all 0.4s;\n}\n.nice-modal-fade-enter, .nice-modal-fade-leave-active {\n  opacity: 0;\n  transform: translateY(-20px);\n}\n", "", {
            version: 3,
            sources: [ "/./src/Modal.vue?2cbada4c" ],
            names: [],
            mappings: ";AA4fA;EACA,iBAAA;CACA;AAEA;EACA,gBAAA;EACA,uBAAA;EACA,QAAA;EACA,OAAA;EACA,aAAA;EACA,cAAA;EACA,+BAAA;EACA,aAAA;EACA,WAAA;CACA;AAEA;EACA,aAAA;EACA,kBAAA;EACA,iBAAA;EACA,qBAAA;CACA;AAEA;EACA,mBAAA;EACA,iBAAA;EACA,uBAAA;CACA;AAEA;EACA,oBAAA;CACA;AAEA;EACA,wBAAA;EACA,iBAAA;EACA,mBAAA;EACA,kDAAA;EACA,WAAA;CACA;AAEA;EACA,aAAA;EACA,cAAA;EACA,UAAA;EACA,QAAA;EACA,OAAA;CACA;AAEA;EACA,eAAA;EACA,mBAAA;EACA,SAAA;EACA,OAAA;CACA;AAEA;EACA,qBAAA;CACA;AAEA;EACA,WAAA;CACA;AAEA;EACA,qBAAA;CACA;AAEA;EACA,WAAA;EACA,6BAAA;CACA",
            file: "Modal.vue",
            sourcesContent: [ "<template>\n  <transition name=\"overlay-fade\">\n    <div v-if=\"visibility.overlay\"\n         ref=\"overlay\"\n         :class=\"overlayClass\"\n         :aria-expanded=\"visible.toString()\"\n         :data-modal=\"name\"\n         @mousedown.stop=\"onBackgroundClick\"\n         @touchstart.stop=\"onBackgroundClick\">\n      <div class=\"v--modal-top-right\">\n        <slot name=\"top-right\"/>\n      </div>\n      <transition :name=\"transition\">\n        <div v-if=\"visibility.modal\"\n             ref=\"modal\"\n             :class=\"modalClass\"\n             :style=\"modalStyle\"\n             @mousedown.stop\n             @touchstart.stop>\n          <slot/>\n          <resizer v-if=\"resizable && !isAutoHeight\"\n                   :min-width=\"minWidth\"\n                   :min-height=\"minHeight\"\n                   @resize=\"onModalResize\"/>\n        </div>\n      </transition>\n    </div>\n  </transition>\n</template>\n<script>\n  import Modal       from './index'\n  import Resizer     from './Resizer.vue'\n  import { inRange } from './util'\n  import parseNumber from './parser'\n\n  export default {\n    name: 'VueJsModal',\n    props: {\n      name: {\n        required: true,\n        type: String\n      },\n      delay: {\n        type: Number,\n        default: 0\n      },\n      resizable: {\n        type: Boolean,\n        default: false\n      },\n      adaptive: {\n        type: Boolean,\n        default: false\n      },\n      draggable: {\n        type: [Boolean, String],\n        default: false\n      },\n      scrollable: {\n        type: Boolean,\n        default: false\n      },\n      reset: {\n        type: Boolean,\n        default: false\n      },\n      transition: {\n        type: String\n      },\n      clickToClose: {\n        type: Boolean,\n        default: true\n      },\n      classes: {\n        type: [String, Array],\n        default: 'v--modal'\n      },\n      minWidth: {\n        type: Number,\n        default: 0,\n        validator (value) {\n          return value >= 0\n        }\n      },\n      minHeight: {\n        type: Number,\n        default: 0,\n        validator (value) {\n          return value >= 0\n        }\n      },\n      width: {\n        type: [Number, String],\n        default: 600,\n        validator (value) {\n          if (typeof value === 'string') {\n            let width = parseNumber(value)\n            return (width.type === '%' || width.type === 'px') &&\n              width.value > 0\n          }\n\n          return value >= 0\n        }\n      },\n      height: {\n        type: [Number, String],\n        default: 300,\n        validator (value) {\n          if (typeof value === 'string') {\n            if (value === 'auto') {\n              return true\n            }\n\n            let height = parseNumber(value)\n            return (height.type === '%' || height.type === 'px') &&\n              height.value > 0\n          }\n\n          return value >= 0\n        }\n      },\n      pivotX: {\n        type: Number,\n        default: 0.5,\n        validator (value) {\n          return value >= 0 && value <= 1\n        }\n      },\n      pivotY: {\n        type: Number,\n        default: 0.5,\n        validator (value) {\n          return value >= 0 && value <= 1\n        }\n      }\n    },\n    components: {\n      Resizer\n    },\n    data () {\n      return {\n        visible: false,\n\n        visibility: {\n          modal: false,\n          overlay: false\n        },\n\n        shift: {\n          left: 0,\n          top: 0\n        },\n\n        modal: {\n          width: 0,\n          widthType: 'px',\n          height: 0,\n          heightType: 'px'\n        },\n\n        window: {\n          width: 0,\n          height: 0\n        }\n      }\n    },\n    watch: {\n      visible (value) {\n        if (value) {\n          this.visibility.overlay = true\n\n          setTimeout(() => {\n            this.visibility.modal = true\n            this.$nextTick(() => {\n              this.addDraggableListeners()\n            })\n          }, this.delay)\n        } else {\n          this.visibility.modal = false\n\n          setTimeout(() => {\n            this.visibility.overlay = false\n            this.$nextTick(() => {\n              this.removeDraggableListeners()\n            })\n          }, this.delay)\n        }\n      }\n    },\n    created () {\n      this.setInitialSize()\n    },\n    /**\n     * Sets global listeners\n     */\n    beforeMount () {\n      Modal.event.$on('toggle', (name, state, params) => {\n        if (name === this.name) {\n          if (typeof state === 'undefined') {\n            state = !this.visible\n          }\n\n          this.toggle(state, params)\n        }\n      })\n\n      window.addEventListener('resize', this.onWindowResize)\n      this.onWindowResize()\n\n      if (this.scrollable && !this.isAutoHeight) {\n        console.warn(`Modal \"${this.name}\" has scrollable flag set to true ` +\n          `but height is not \"auto\" (${this.height})`)\n      }\n    },\n    /**\n     * Removes \"resize\" window listener\n     */\n    beforeDestroy () {\n      window.removeEventListener('resize', this.onWindowResize)\n    },\n    computed: {\n      /**\n       * Returns true if height is set to \"auto\"\n       */\n      isAutoHeight () {\n        return this.modal.heightType === 'auto'\n      },\n      /**\n       * Calculates and returns modal position based on the\n       * pivots, window size and modal size\n       */\n      position () {\n        const { window, shift, pivotX, pivotY,\n          trueModalWidth, trueModalHeight } = this\n\n        const maxLeft = window.width - trueModalWidth\n        const maxTop = window.height - trueModalHeight\n\n        const minTop = this.scrollable\n          ? Number.NEGATIVE_INFINITY\n          : 0\n\n        const left = shift.left + pivotX * maxLeft\n        const top = shift.top + pivotY * maxTop\n\n        return {\n          left: inRange(0, maxLeft, left),\n          top: inRange(minTop, maxTop, top)\n        }\n      },\n      /**\n       * Returns pixel width (if set with %) and makes sure that modal size\n       * fits the window\n       */\n      trueModalWidth () {\n        const { window, modal, adaptive, minWidth } = this\n\n        const value = modal.widthType === '%'\n          ? window.width / 100 * modal.width\n          : modal.width\n\n        return adaptive\n          ? inRange(minWidth, window.width, value)\n          : value\n      },\n      /**\n       * Returns pixel height (if set with %) and makes sure that modal size\n       * fits the window.\n       *\n       * Returns 0 if height set as \"auto\"\n       */\n      trueModalHeight () {\n        const { window, modal, isAutoHeight, adaptive } = this\n\n        const value = (modal.heightType === '%')\n          ? window.height / 100 * modal.height\n          : modal.height\n\n        if (isAutoHeight) {\n          return 0\n        }\n\n        return adaptive\n          ? inRange(this.minHeight, this.window.height, value)\n          : value\n      },\n      /**\n       * Returns class list for screen overlay (modal background)\n       */\n      overlayClass () {\n        return {\n          'v--modal-overlay': true,\n          'scrollable': this.scrollable && this.isAutoHeight\n        }\n      },\n      /**\n       * Returns class list for modal itself\n       */\n      modalClass () {\n        return ['v--modal-box', this.classes]\n      },\n      /**\n       * CSS styles for position and size of the modal\n       */\n      modalStyle () {\n        return {\n          top: this.position.top + 'px',\n          left: this.position.left + 'px',\n          width: this.trueModalWidth + 'px',\n          height: this.isAutoHeight\n            ? 'auto'\n            : (this.trueModalHeight + 'px')\n        }\n      }\n    },\n    methods: {\n      /**\n       * Initializes modal's size & position,\n       * if \"reset\" flag is set to true - this function will be called\n       * every time \"beforeOpen\" is triggered\n       */\n      setInitialSize () {\n        let { modal } = this\n        let width = parseNumber(this.width)\n        let height = parseNumber(this.height)\n\n        modal.width = width.value\n        modal.widthType = width.type\n        modal.height = height.value\n        modal.heightType = height.type\n      },\n\n      onWindowResize () {\n        this.window.width = window.innerWidth\n        this.window.height = window.innerHeight\n      },\n\n      /**\n       * Generates event object\n       */\n      genEventObject (params) {\n        // @todo: clean this up (change to ...)\n        var data = {\n          name: this.name,\n          timestamp: Date.now(),\n          canceled: false,\n          ref: this.$refs.modal\n        }\n\n        return Object.assign(data, params || {})\n      },\n      /**\n       * Event handler which is triggered on modal resize\n       */\n      onModalResize (event) {\n        this.modal.widthType = 'px'\n        this.modal.width = event.size.width\n\n        this.modal.heightType = 'px'\n        this.modal.height = event.size.height\n\n        const { size } = this.modal\n        const resizeEvent = this.genEventObject({ size })\n\n        this.$emit('resize', resizeEvent)\n      },\n      /**\n       * Event handler which is triggered on $modal.show and $modal.hight\n       */\n      toggle (state, params) {\n        const { reset, scrollable, visible } = this\n\n        const beforeEventName = visible\n          ? 'before-close'\n          : 'before-open'\n\n        const afterEventName = visible\n          ? 'closed'\n          : 'opened'\n\n        if (beforeEventName === 'before-open') {\n          if (reset) {\n            this.setInitialSize()\n            this.shift.left = 0\n            this.shift.top = 0\n          }\n\n          if (scrollable) {\n            document.body.classList.add('v--modal-block-scroll')\n          }\n        }\n\n        if (beforeEventName === 'before-close') {\n          if (scrollable) {\n            document.body.classList.remove('v--modal-block-scroll')\n          }\n        }\n\n        let stopEventExecution = false\n\n        const stop = () => {\n          stopEventExecution = true\n        }\n        const beforeEvent = this.genEventObject({ stop, state, params })\n\n        this.$emit(beforeEventName, beforeEvent)\n\n        if (!stopEventExecution) {\n          const afterEvent = this.genEventObject({ state, params })\n\n          this.visible = state\n          this.$emit(afterEventName, afterEvent)\n        }\n      },\n\n      getDraggableElement () {\n        var selector = typeof this.draggable !== 'string'\n          ? '.v--modal-box'\n          : this.draggable\n\n        if (selector) {\n          var handler = this.$refs.overlay.querySelector(selector)\n          if (handler) {\n            return handler\n          }\n        }\n      },\n      /**\n       * Event handler that is triggered when background overlay is clicked\n       */\n      onBackgroundClick () {\n        if (this.clickToClose) {\n          this.toggle(false)\n        }\n      },\n\n      addDraggableListeners () {\n        if (!this.draggable) {\n          return\n        }\n\n        let dragger = this.getDraggableElement()\n\n        if (dragger) {\n          let startX = 0\n          let startY = 0\n          let cachedShiftX = 0\n          let cachedShiftY = 0\n\n          let getPosition = (event) => {\n            return event.touches && event.touches.length > 0\n              ? event.touches[0]\n              : event\n          }\n\n          let mousedown = (event) => {\n            let target = event.target\n\n            if (target && target.nodeName === 'INPUT') {\n              return\n            }\n\n            let { clientX, clientY } = getPosition(event)\n\n            document.addEventListener('mousemove', mousemove)\n            document.addEventListener('mouseup', mouseup)\n\n            document.addEventListener('touchmove', mousemove)\n            document.addEventListener('touchend', mouseup)\n\n            startX = clientX\n            startY = clientY\n            cachedShiftX = this.shift.left\n            cachedShiftY = this.shift.top\n\n          //  event.preventDefault()\n          }\n\n          let mousemove = (event) => {\n            let { clientX, clientY } = getPosition(event)\n\n            this.shift.left = cachedShiftX + clientX - startX\n            this.shift.top = cachedShiftY + clientY - startY\n            event.preventDefault()\n          }\n\n          let mouseup = (event) => {\n            document.removeEventListener('mousemove', mousemove)\n            document.removeEventListener('mouseup', mouseup)\n\n            document.removeEventListener('touchmove', mousemove)\n            document.removeEventListener('touchend', mouseup)\n\n            event.preventDefault()\n          }\n\n          dragger.addEventListener('mousedown', mousedown)\n          dragger.addEventListener('touchstart', mousedown)\n        }\n      },\n\n      removeDraggableListeners () {\n      //  console.log('removing draggable handlers')\n      }\n    }\n  }\n<\/script>\n<style>\n  .v--modal-block-scroll {\n    overflow: hidden;\n  }\n\n  .v--modal-overlay {\n    position: fixed;\n    box-sizing: border-box;\n    left: 0;\n    top: 0;\n    width: 100vw;\n    height: 100vh;\n    background: rgba(0, 0, 0, 0.2);\n    z-index: 999;\n    opacity: 1;\n  }\n\n  .v--modal-overlay.scrollable {\n    height: 100%;\n    min-height: 100vh;\n    overflow-y: auto;\n    padding-bottom: 10px;\n  }\n\n  .v--modal-overlay .v--modal-box {\n    position: relative;\n    overflow: hidden;\n    box-sizing: border-box;\n  }\n\n  .v--modal-overlay.scrollable .v--modal-box {\n    margin-bottom: 10px;\n  }\n\n  .v--modal {\n    background-color: white;\n    text-align: left;\n    border-radius: 3px;\n    box-shadow: 0 20px 60px -2px rgba(27, 33, 58, .4);\n    padding: 0;\n  }\n\n  .v--modal.v--modal-fullscreen {\n    width: 100vw;\n    height: 100vh;\n    margin: 0;\n    left: 0;\n    top: 0;\n  }\n\n  .v--modal-top-right {\n    display: block;\n    position: absolute;\n    right: 0;\n    top: 0;\n  }\n\n  .overlay-fade-enter-active, .overlay-fade-leave-active {\n    transition: all 0.2s;\n  }\n\n  .overlay-fade-enter, .overlay-fade-leave-active {\n    opacity: 0;\n  }\n\n  .nice-modal-fade-enter-active, .nice-modal-fade-leave-active {\n    transition: all 0.4s;\n  }\n\n  .nice-modal-fade-enter, .nice-modal-fade-leave-active {\n    opacity: 0;\n    transform: translateY(-20px);\n  }\n</style>\n" ],
            sourceRoot: "webpack://"
        } ]);
    }, function(module, exports, __webpack_require__) {
        exports = module.exports = __webpack_require__(0)(), exports.push([ module.i, "\n.vue-modal-resizer {\n  display: block;\n  overflow: hidden;\n  position: absolute;\n  width: 12px;\n  height: 12px;\n  right: 0;\n  bottom: 0;\n  z-index: 9999999;\n  background: transparent;\n  cursor: se-resize;\n}\n.vue-modal-resizer::after {\n  display: block;\n  position: absolute;\n  content: '';\n  background: transparent;\n  left: 0;\n  top: 0;\n  width: 0;\n  height: 0;\n  border-bottom: 10px solid #ddd;\n  border-left: 10px solid transparent;\n}\n.vue-modal-resizer.clicked::after {\n  border-bottom: 10px solid #369BE9;\n}\n", "", {
            version: 3,
            sources: [ "/./src/Resizer.vue?29279603" ],
            names: [],
            mappings: ";AA+EA;EACA,eAAA;EACA,iBAAA;EACA,mBAAA;EACA,YAAA;EACA,aAAA;EACA,SAAA;EACA,UAAA;EACA,iBAAA;EACA,wBAAA;EACA,kBAAA;CACA;AAEA;EACA,eAAA;EACA,mBAAA;EACA,YAAA;EACA,wBAAA;EACA,QAAA;EACA,OAAA;EACA,SAAA;EACA,UAAA;EACA,+BAAA;EACA,oCAAA;CACA;AAEA;EACA,kCAAA;CACA",
            file: "Resizer.vue",
            sourcesContent: [ "<template>\n  <div :class=\"className\"></div>\n</template>\n<script>\nimport { inRange } from './util'\n\nexport default {\n  name: 'VueJsModalResizer',\n  props: {\n    minHeight: {\n      type: Number,\n      default: 0\n    },\n    minWidth: {\n      type: Number,\n      default: 0\n    }},\n  data () {\n    return {\n      clicked: false,\n      size: {}\n    }\n  },\n  mounted () {\n    this.$el.addEventListener('mousedown', this.start, false)\n  },\n  computed: {\n    className () {\n      return {'vue-modal-resizer': true, 'clicked': this.clicked}\n    }\n  },\n  methods: {\n    start (event) {\n      this.clicked = true\n\n      window.addEventListener('mousemove', this.mousemove, false)\n      window.addEventListener('mouseup', this.stop, false)\n\n      event.stopPropagation()\n      event.preventDefault()\n    },\n    stop () {\n      this.clicked = false\n\n      window.removeEventListener('mousemove', this.mousemove, false)\n      window.removeEventListener('mouseup', this.stop, false)\n\n      this.$emit('resize-stop', {\n        element: this.$el.parentElement,\n        size: this.size\n      })\n    },\n    mousemove (event) {\n      this.resize(event)\n    },\n    resize (event) {\n      var el = this.$el.parentElement\n\n      if (el) {\n        var width = event.clientX - el.offsetLeft\n        var height = event.clientY - el.offsetTop\n\n        width = inRange(this.minWidth, window.innerWidth, width)\n        height = inRange(this.minHeight, window.innerHeight, height)\n\n        this.size = {width, height}\n        el.style.width = width + 'px'\n        el.style.height = height + 'px'\n\n        this.$emit('resize', {\n          element: el,\n          size: this.size\n        })\n      }\n    }\n  }\n}\n<\/script>\n<style>\n.vue-modal-resizer {\n  display: block;\n  overflow: hidden;\n  position: absolute;\n  width: 12px;\n  height: 12px;\n  right: 0;\n  bottom: 0;\n  z-index: 9999999;\n  background: transparent;\n  cursor: se-resize;\n}\n\n.vue-modal-resizer::after {\n  display: block;\n  position: absolute;\n  content: '';\n  background: transparent;\n  left: 0;\n  top: 0;\n  width: 0;\n  height: 0;\n  border-bottom: 10px solid #ddd;\n  border-left: 10px solid transparent;\n}\n\n.vue-modal-resizer.clicked::after {\n  border-bottom: 10px solid #369BE9;\n}\n</style>\n" ],
            sourceRoot: "webpack://"
        } ]);
    }, function(module, exports, __webpack_require__) {
        __webpack_require__(20);
        var Component = __webpack_require__(1)(__webpack_require__(9), __webpack_require__(17), null, null);
        Component.options.__file = "/Users/yev/Projects/vue/vue-js-modal/src/Resizer.vue", 
        Component.esModule && Object.keys(Component.esModule).some(function(key) {
            return "default" !== key && "__esModule" !== key;
        }) && console.error("named exports are not supported in *.vue files."), Component.options.functional && console.error("[vue-loader] Resizer.vue: functional components are not supported with templates, they should use render functions."), 
        module.exports = Component.exports;
    }, function(module, exports, __webpack_require__) {
        module.exports = {
            render: function() {
                var _vm = this, _h = _vm.$createElement, _c = _vm._self._c || _h;
                return _c("modal", {
                    attrs: {
                        name: "dialog",
                        height: "auto",
                        classes: [ "v--modal", "vue-dialog", this.params.class ],
                        width: _vm.width,
                        "pivot-y": .3,
                        adaptive: !0,
                        clickToClose: _vm.clickToClose,
                        transition: _vm.transition
                    },
                    on: {
                        "before-open": _vm.beforeOpened,
                        "before-close": _vm.beforeClosed,
                        opened: function($event) {
                            _vm.$emit("opened", $event);
                        },
                        closed: function($event) {
                            _vm.$emit("closed", $event);
                        }
                    }
                }, [ _c("div", {
                    staticClass: "dialog-content"
                }, [ _vm.params.title ? _c("div", {
                    staticClass: "dialog-c-title",
                    domProps: {
                        innerHTML: _vm._s(_vm.params.title || "")
                    }
                }) : _vm._e(), _vm._v(" "), _c("div", {
                    staticClass: "dialog-c-text",
                    domProps: {
                        innerHTML: _vm._s(_vm.params.text || "")
                    }
                }) ]), _vm._v(" "), _vm.buttons ? _c("div", {
                    staticClass: "dialog-buttons"
                }, _vm._l(_vm.buttons, function(button, i) {
                    return _c("button", {
                        key: i,
                        style: _vm.buttonStyle,
                        domProps: {
                            innerHTML: _vm._s(button.title)
                        },
                        on: {
                            click: function($event) {
                                $event.stopPropagation(), _vm.click(i, $event);
                            }
                        }
                    }, [ _vm._v("\n        " + _vm._s(button.title) + "\n      ") ]);
                })) : _c("div", {
                    staticClass: "dialog-buttons-none"
                }) ]);
            },
            staticRenderFns: []
        }, module.exports.render._withStripped = !0;
    }, function(module, exports, __webpack_require__) {
        module.exports = {
            render: function() {
                var _vm = this, _h = _vm.$createElement, _c = _vm._self._c || _h;
                return _c("transition", {
                    attrs: {
                        name: "overlay-fade"
                    }
                }, [ _vm.visibility.overlay ? _c("div", {
                    ref: "overlay",
                    class: _vm.overlayClass,
                    attrs: {
                        "aria-expanded": _vm.visible.toString(),
                        "data-modal": _vm.name
                    },
                    on: {
                        mousedown: function($event) {
                            $event.stopPropagation(), _vm.onBackgroundClick($event);
                        },
                        touchstart: function($event) {
                            $event.stopPropagation(), _vm.onBackgroundClick($event);
                        }
                    }
                }, [ _c("div", {
                    staticClass: "v--modal-top-right"
                }, [ _vm._t("top-right") ], 2), _vm._v(" "), _c("transition", {
                    attrs: {
                        name: _vm.transition
                    }
                }, [ _vm.visibility.modal ? _c("div", {
                    ref: "modal",
                    class: _vm.modalClass,
                    style: _vm.modalStyle,
                    on: {
                        mousedown: function($event) {
                            $event.stopPropagation();
                        },
                        touchstart: function($event) {
                            $event.stopPropagation();
                        }
                    }
                }, [ _vm._t("default"), _vm._v(" "), _vm.resizable && !_vm.isAutoHeight ? _c("resizer", {
                    attrs: {
                        "min-width": _vm.minWidth,
                        "min-height": _vm.minHeight
                    },
                    on: {
                        resize: _vm.onModalResize
                    }
                }) : _vm._e() ], 2) : _vm._e() ]) ], 1) : _vm._e() ]);
            },
            staticRenderFns: []
        }, module.exports.render._withStripped = !0;
    }, function(module, exports, __webpack_require__) {
        module.exports = {
            render: function() {
                var _vm = this, _h = _vm.$createElement;
                return (_vm._self._c || _h)("div", {
                    class: _vm.className
                });
            },
            staticRenderFns: []
        }, module.exports.render._withStripped = !0;
    }, function(module, exports, __webpack_require__) {
        var content = __webpack_require__(11);
        "string" == typeof content && (content = [ [ module.i, content, "" ] ]), content.locals && (module.exports = content.locals);
        __webpack_require__(2)("e57c1368", content, !1);
    }, function(module, exports, __webpack_require__) {
        var content = __webpack_require__(12);
        "string" == typeof content && (content = [ [ module.i, content, "" ] ]), content.locals && (module.exports = content.locals);
        __webpack_require__(2)("0ba9730a", content, !1);
    }, function(module, exports, __webpack_require__) {
        var content = __webpack_require__(13);
        "string" == typeof content && (content = [ [ module.i, content, "" ] ]), content.locals && (module.exports = content.locals);
        __webpack_require__(2)("43d3f0d1", content, !1);
    }, function(module, exports) {
        module.exports = function(parentId, list) {
            for (var styles = [], newStyles = {}, i = 0; i < list.length; i++) {
                var item = list[i], id = item[0], css = item[1], media = item[2], sourceMap = item[3], part = {
                    id: parentId + ":" + i,
                    css: css,
                    media: media,
                    sourceMap: sourceMap
                };
                newStyles[id] ? newStyles[id].parts.push(part) : styles.push(newStyles[id] = {
                    id: id,
                    parts: [ part ]
                });
            }
            return styles;
        };
    } ]);
});