(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("vue"));
	else if(typeof define === 'function' && define.amd)
		define(["vue"], factory);
	else if(typeof exports === 'object')
		exports["VueJsModal"] = factory(require("vue"));
	else
		root["VueJsModal"] = factory(root["vue"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_16__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Modal_vue__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Modal_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Modal_vue__);


var ModalPlugin = {
  install: function install(Vue) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (!this.hasOwnProperty("event")) {
      this.event = new Vue();
    }

    var $modal = {
      show: function show(name, params) {
        ModalPlugin.event.$emit('toggle', name, true, params);
      },
      hide: function hide(name, params) {
        ModalPlugin.event.$emit('toggle', name, false, params);
      },
      toggle: function toggle(name, params) {
        ModalPlugin.event.$emit('toggle', name, undefined, params);
      }
    };

    Object.defineProperty(Vue.prototype, '$modal', {
      get: function get() {
        return $modal;
      }
    });

    Vue.component('modal', __WEBPACK_IMPORTED_MODULE_0__Modal_vue___default.a);
    return null;
  }
};

/* harmony default export */ __webpack_exports__["default"] = (ModalPlugin);

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return inRange; });
var inRange = function inRange(from, to, value) {
  if (value < from) {
    return from;
  }

  if (value > to) {
    return to;
  }

  return value;
};

/***/ }),
/* 2 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  scopeId,
  cssModules
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  // inject cssModules
  if (cssModules) {
    var computed = options.computed || (options.computed = {})
    Object.keys(cssModules).forEach(function (key) {
      var module = cssModules[key]
      computed[key] = function () { return module }
    })
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(15)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction) {
  isProduction = _isProduction

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(13)

var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(6),
  /* template */
  __webpack_require__(11),
  /* scopeId */
  "data-v-40dd3b1e",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Resizer_vue__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Resizer_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__Resizer_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util__ = __webpack_require__(1);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//






/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'VueJsModal',
  props: {
    name: {
      required: true,
      type: [String, Number]
    },
    delay: {
      type: Number,
      default: 0
    },
    resizable: {
      type: Boolean,
      default: false
    },
    adaptive: {
      type: Boolean,
      default: false
    },
    draggable: {
      type: [Boolean, String],
      default: false
    },
    transition: {
      type: String
    },
    classes: {
      type: [String, Array],
      default: 'v--modal'
    },
    minWidth: {
      type: Number,
      default: 0
    },
    minHeight: {
      type: Number,
      default: 0
    },
    width: {
      type: Number,
      default: 600
    },
    height: {
      type: Number,
      default: 300
    },
    pivotX: {
      type: Number,
      default: 0.5
    },
    pivotY: {
      type: Number,
      default: 0.5
    }
  },
  components: {
    Resizer: __WEBPACK_IMPORTED_MODULE_2__Resizer_vue___default.a
  },
  data: function data() {
    return {
      visible: false,

      visibility: {
        modal: false,
        overlay: false
      },

      shift: {
        left: 0,
        top: 0
      },

      modal: {
        width: this.width,
        height: this.height
      },

      window: {
        width: window.innerWidth,
        height: window.innerWidth
      },

      draggableElement: false
    };
  },

  watch: {
    visible: function visible(value) {
      var _this = this;

      if (value) {
        this.visibility.overlay = true;
        this.adaptSize();

        setTimeout(function () {
          _this.visibility.modal = true;
          _this.$nextTick(function () {
            _this.addDraggableListeners();
          });
        }, this.delay);
      } else {
        this.visibility.modal = false;

        setTimeout(function () {
          _this.visibility.overlay = false;
          _this.$nextTick(function () {
            _this.removeDraggableListeners();
          });
        }, this.delay);
      }
    }
  },
  created: function created() {
    var _this2 = this;

    __WEBPACK_IMPORTED_MODULE_1__index__["default"].event.$on('toggle', function (name, state, params) {
      if (name === _this2.name) {
        if (typeof state === 'undefined') {
          state = !_this2.visible;
        }

        _this2.toggle(state, params);
      }
    });

    window.addEventListener('resize', this.onWindowResize);
  },
  beforeDestroy: function beforeDestroy() {
    window.removeEventListener('resize', this.onWindowResize);
  },
  beforeMount: function beforeMount() {
    this.onWindowResize();
  },

  computed: {
    position: function position() {
      var window = this.window,
          modal = this.modal,
          shift = this.shift;

      var maxLeft = window.width - modal.width;
      var maxTop = window.height - modal.height;

      var left = shift.left + this.pivotX * (window.width - modal.width);
      var top = shift.top + this.pivotY * (window.height - modal.height);

      return {
        left: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__util__["a" /* inRange */])(0, maxLeft, left),
        top: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__util__["a" /* inRange */])(0, maxTop, top)
      };
    },
    modalClass: function modalClass() {
      return ['v--modal-box', this.classes];
    },
    modalStyle: function modalStyle() {
      return {
        top: this.position.top + 'px',
        left: this.position.left + 'px',
        width: this.modal.width + 'px',
        height: this.modal.height + 'px'
      };
    }
  },
  methods: {
    onWindowResize: function onWindowResize() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;
      this.adaptSize();
    },
    genEventObject: function genEventObject(params) {
      //todo: clean this up (change to ...)
      var data = {
        name: this.name,
        timestamp: Date.now(),
        canceled: false,
        ref: this.$refs.modal,
        stop: function stop() {
          this.canceled = true;
        }
      };

      return __WEBPACK_IMPORTED_MODULE_0_vue___default.a.util.extend(data, params || {});
      //        return event
    },
    adaptSize: function adaptSize() {
      if (this.adaptive) {
        this.modal.width = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__util__["a" /* inRange */])(0, this.window.width, this.modal.width);
        this.modal.height = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__util__["a" /* inRange */])(0, this.window.height, this.modal.height);
      }
    },
    resize: function resize(event) {
      this.modal.width = event.size.width;
      this.modal.height = event.size.height;

      var size = this.modal.size;

      var resizeEvent = this.genEventObject({ size: size });

      this.$emit('resize', resizeEvent);
    },
    toggle: function toggle(state, params) {
      var beforeEventName = this.visible ? 'before-close' : 'before-open';
      var afterEventName = this.visible ? 'closed' : 'opened';

      var stopEventExecution = false;

      var stop = function stop() {
        stopEventExecution = true;
      };
      var beforeEvent = this.genEventObject({ stop: stop, state: state, params: params });

      this.$emit(beforeEventName, beforeEvent);

      if (!stopEventExecution) {
        var afterEvent = this.genEventObject({ state: state, params: params });

        this.visible = state;
        this.$emit(afterEventName, afterEvent);
      }
    },
    emitCancelableEvent: function emitCancelableEvent(data) {
      var stopEventExecution = false;
      var stop = function stop() {
        stopEventExecution = true;
      };
      var event = this.genEventObject(data);
    },
    getDraggableElement: function getDraggableElement() {
      var selector = typeof this.draggable !== 'string' ? '.v--modal-box' : this.draggable;

      if (selector) {
        var handler = this.$refs.overlay.querySelector(selector);
        if (handler) {
          return handler;
        }
      }
    },
    addDraggableListeners: function addDraggableListeners() {
      var _this3 = this;

      if (!this.draggable) {
        return;
      }

      var dragger = this.getDraggableElement();

      if (dragger) {
        var startX = 0;
        var startY = 0;
        var cachedShiftX = 0;
        var cachedShiftY = 0;

        var getPosition = function getPosition(event) {
          return event.touches && event.touches.length > 0 ? event.touches[0] : event;
        };

        var mousedown = function mousedown(event) {
          var _getPosition = getPosition(event),
              clientX = _getPosition.clientX,
              clientY = _getPosition.clientY;

          document.addEventListener('mousemove', _mousemove);
          document.addEventListener('mouseup', _mouseup);

          document.addEventListener('touchmove', _mousemove);
          document.addEventListener('touchend', _mouseup);

          startX = clientX;
          startY = clientY;
          cachedShiftX = _this3.shift.left;
          cachedShiftY = _this3.shift.top;

          event.preventDefault();
        };

        var _mousemove = function _mousemove(event) {
          var _getPosition2 = getPosition(event),
              clientX = _getPosition2.clientX,
              clientY = _getPosition2.clientY;

          _this3.shift.left = cachedShiftX + clientX - startX;
          _this3.shift.top = cachedShiftY + clientY - startY;
          event.preventDefault();
        };

        var _mouseup = function _mouseup(event) {
          document.removeEventListener('mousemove', _mousemove);
          document.removeEventListener('mouseup', _mouseup);

          document.removeEventListener('touchmove', _mousemove);
          document.removeEventListener('touchend', _mouseup);

          event.preventDefault();
        };

        dragger.addEventListener('mousedown', mousedown);
        dragger.addEventListener('touchstart', mousedown);
      }
    },
    removeDraggableListeners: function removeDraggableListeners() {
      //  console.log('removing draggable handlers')
    }
  }
});

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(1);
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'VueJsModalResizer',
  props: {
    minHeight: {
      type: Number,
      default: 0
    },
    minWidth: {
      type: Number,
      default: 0
    } },
  data: function data() {
    return {
      clicked: false,
      size: {}
    };
  },
  mounted: function mounted() {
    this.$el.addEventListener('mousedown', this.start, false);
  },

  computed: {
    className: function className() {
      return { 'vue-modal-resizer': true, 'clicked': this.clicked };
    }
  },
  methods: {
    start: function start(event) {
      this.clicked = true;

      window.addEventListener('mousemove', this.mousemove, false);
      window.addEventListener('mouseup', this.stop, false);

      event.stopPropagation();
      event.preventDefault();
    },
    stop: function stop() {
      this.clicked = false;

      window.removeEventListener('mousemove', this.mousemove, false);
      window.removeEventListener('mouseup', this.stop, false);

      this.$emit('resize-stop', {
        element: this.$el.parentElement,
        size: this.size
      });
    },
    mousemove: function mousemove(event) {
      this.resize(event);
    },
    resize: function resize(event) {
      var el = this.$el.parentElement;

      if (el) {
        var width = event.clientX - el.offsetLeft;
        var height = event.clientY - el.offsetTop;

        width = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["a" /* inRange */])(this.minWidth, window.innerWidth, width);
        height = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["a" /* inRange */])(this.minHeight, window.innerHeight, height);

        this.size = { width: width, height: height };
        el.style.width = width + 'px';
        el.style.height = height + 'px';

        this.$emit('resize', {
          element: el,
          size: this.size
        });
      }
    }
  }
});

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)();
// imports


// module
exports.push([module.i, ".v--modal-overlay[data-v-40dd3b1e]{position:fixed;left:0;top:0;width:100vw;height:100vh;background:rgba(0,0,0,.2);z-index:999;opacity:1}.v--modal-overlay .v--modal-box[data-v-40dd3b1e]{position:relative;overflow:hidden;box-sizing:border-box;background-color:#fff}.v--modal[data-v-40dd3b1e]{background:#fff;text-align:left;border-radius:3px;box-shadow:0 20px 60px -2px rgba(27,33,58,.4);padding:0}.v--modal.v--modal-fullscreen[data-v-40dd3b1e]{width:100vw;height:100vh;margin:0;left:0;top:0}.v--modal-top-right[data-v-40dd3b1e]{display:block;position:absolute;right:0;top:0}.overlay-fade-enter-active[data-v-40dd3b1e],.overlay-fade-leave-active[data-v-40dd3b1e]{transition:all .2s}.overlay-fade-enter[data-v-40dd3b1e],.overlay-fade-leave-active[data-v-40dd3b1e]{opacity:0}.nice-modal-fade-enter-active[data-v-40dd3b1e],.nice-modal-fade-leave-active[data-v-40dd3b1e]{transition:all .4s}.nice-modal-fade-enter[data-v-40dd3b1e],.nice-modal-fade-leave-active[data-v-40dd3b1e]{opacity:0;transform:translateY(-20px)}", ""]);

// exports


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)();
// imports


// module
exports.push([module.i, ".vue-modal-resizer{overflow:hidden;width:12px;height:12px;right:0;bottom:0;z-index:9999999;cursor:se-resize}.vue-modal-resizer,.vue-modal-resizer:after{display:block;position:absolute;background:transparent}.vue-modal-resizer:after{content:\"\";left:0;top:0;width:0;height:0;border-bottom:10px solid #ddd;border-left:10px solid transparent}.vue-modal-resizer.clicked:after{border-bottom:10px solid #369be9}", ""]);

// exports


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(14)

var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(7),
  /* template */
  __webpack_require__(12),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('transition', {
    attrs: {
      "name": "overlay-fade"
    }
  }, [(_vm.visibility.overlay) ? _c('div', {
    ref: "overlay",
    staticClass: "v--modal-overlay",
    attrs: {
      "aria-expanded": _vm.visible.toString(),
      "data-modal": _vm.name
    },
    on: {
      "mousedown": function($event) {
        $event.stopPropagation();
        _vm.toggle(false)
      }
    }
  }, [_c('div', {
    staticClass: "v--modal-top-right"
  }, [_vm._t("top-right")], 2), _vm._v(" "), _c('transition', {
    attrs: {
      "name": _vm.transition
    }
  }, [(_vm.visibility.modal) ? _c('div', {
    ref: "modal",
    class: _vm.modalClass,
    style: (_vm.modalStyle),
    on: {
      "mousedown": function($event) {
        $event.stopPropagation();
      }
    }
  }, [_vm._t("default"), _vm._v(" "), (_vm.resizable) ? _c('resizer', {
    attrs: {
      "min-width": _vm.minWidth,
      "min-height": _vm.minHeight
    },
    on: {
      "resize": _vm.resize
    }
  }) : _vm._e()], 2) : _vm._e()])], 1) : _vm._e()])
},staticRenderFns: []}

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    class: _vm.className
  })
},staticRenderFns: []}

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(8);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(4)("50c27c50", content, true);

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(9);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(4)("7054fa02", content, true);

/***/ }),
/* 15 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_16__;

/***/ })
/******/ ]);
});
//# sourceMappingURL=index.js.map