!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports["vue-js-modal"]=e():t["vue-js-modal"]=e()}(window,function(){return i={},o.m=n=[function(t,e,n){var i=n(7);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);(0,n(4).default)("27d83796",i,!1,{})},function(t,e,n){var i=n(10);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);(0,n(4).default)("0e783494",i,!1,{})},function(t,e,n){var i=n(12);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);(0,n(4).default)("17757f60",i,!1,{})},function(t,e){t.exports=function(n){var a=[];return a.toString=function(){return this.map(function(t){var e=function(t,e){var n=t[1]||"",i=t[3];if(!i)return n;if(e&&"function"==typeof btoa){var o=function(t){return"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(t))))+" */"}(i),r=i.sources.map(function(t){return"/*# sourceURL="+i.sourceRoot+t+" */"});return[n].concat(r).concat([o]).join("\n")}return[n].join("\n")}(t,n);return t[2]?"@media "+t[2]+"{"+e+"}":e}).join("")},a.i=function(t,e){"string"==typeof t&&(t=[[null,t,""]]);for(var n={},i=0;i<this.length;i++){var o=this[i][0];"number"==typeof o&&(n[o]=!0)}for(i=0;i<t.length;i++){var r=t[i];"number"==typeof r[0]&&n[r[0]]||(e&&!r[2]?r[2]=e:e&&(r[2]="("+r[2]+") and ("+e+")"),a.push(r))}},a}},function(t,e,n){"use strict";function l(t,e){for(var n=[],i={},o=0;o<e.length;o++){var r=e[o],a=r[0],s={id:t+":"+o,css:r[1],media:r[2],sourceMap:r[3]};i[a]?i[a].parts.push(s):n.push(i[a]={id:a,parts:[s]})}return n}n.r(e),n.d(e,"default",function(){return p});var i="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!i)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var u={},o=i&&(document.head||document.getElementsByTagName("head")[0]),r=null,a=0,c=!1,s=function(){},d=null,h="data-vue-ssr-id",f="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());function p(a,t,e,n){c=e,d=n||{};var s=l(a,t);return v(s),function(t){for(var e=[],n=0;n<s.length;n++){var i=s[n];(o=u[i.id]).refs--,e.push(o)}t?v(s=l(a,t)):s=[];for(n=0;n<e.length;n++){var o;if(0===(o=e[n]).refs){for(var r=0;r<o.parts.length;r++)o.parts[r]();delete u[o.id]}}}}function v(t){for(var e=0;e<t.length;e++){var n=t[e],i=u[n.id];if(i){i.refs++;for(var o=0;o<i.parts.length;o++)i.parts[o](n.parts[o]);for(;o<n.parts.length;o++)i.parts.push(b(n.parts[o]));i.parts.length>n.parts.length&&(i.parts.length=n.parts.length)}else{var r=[];for(o=0;o<n.parts.length;o++)r.push(b(n.parts[o]));u[n.id]={id:n.id,refs:1,parts:r}}}}function m(){var t=document.createElement("style");return t.type="text/css",o.appendChild(t),t}function b(e){var n,i,t=document.querySelector("style["+h+'~="'+e.id+'"]');if(t){if(c)return s;t.parentNode.removeChild(t)}if(f){var o=a++;t=r=r||m(),n=w.bind(null,t,o,!1),i=w.bind(null,t,o,!0)}else t=m(),n=function(t,e){var n=e.css,i=e.media,o=e.sourceMap;i&&t.setAttribute("media",i);d.ssrId&&t.setAttribute(h,e.id);o&&(n+="\n/*# sourceURL="+o.sources[0]+" */",n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */");if(t.styleSheet)t.styleSheet.cssText=n;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n))}}.bind(null,t),i=function(){t.parentNode.removeChild(t)};return n(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;n(e=t)}else i()}}var y,g=(y=[],function(t,e){return y[t]=e,y.filter(Boolean).join("\n")});function w(t,e,n,i){var o=n?"":i.css;if(t.styleSheet)t.styleSheet.cssText=g(e,o);else{var r=document.createTextNode(o),a=t.childNodes;a[e]&&t.removeChild(a[e]),a.length?t.insertBefore(r,a[e]):t.appendChild(r)}}},function(t,M,e){"use strict";(function(t){var i=function(){if("undefined"!=typeof Map)return Map;function i(t,n){var i=-1;return t.some(function(t,e){return t[0]===n&&(i=e,!0)}),i}return Object.defineProperty(t.prototype,"size",{get:function(){return this.__entries__.length},enumerable:!0,configurable:!0}),t.prototype.get=function(t){var e=i(this.__entries__,t),n=this.__entries__[e];return n&&n[1]},t.prototype.set=function(t,e){var n=i(this.__entries__,t);~n?this.__entries__[n][1]=e:this.__entries__.push([t,e])},t.prototype.delete=function(t){var e=this.__entries__,n=i(e,t);~n&&e.splice(n,1)},t.prototype.has=function(t){return!!~i(this.__entries__,t)},t.prototype.clear=function(){this.__entries__.splice(0)},t.prototype.forEach=function(t,e){void 0===e&&(e=null);for(var n=0,i=this.__entries__;n<i.length;n++){var o=i[n];t.call(e,o[1],o[0])}},t;function t(){this.__entries__=[]}}(),n="undefined"!=typeof window&&"undefined"!=typeof document&&window.document===document,e=void 0!==t&&t.Math===Math?t:"undefined"!=typeof self&&self.Math===Math?self:"undefined"!=typeof window&&window.Math===Math?window:Function("return this")(),l="function"==typeof requestAnimationFrame?requestAnimationFrame.bind(e):function(t){return setTimeout(function(){return t(Date.now())},1e3/60)},u=2;var o=["top","right","bottom","left","width","height","size","weight"],r="undefined"!=typeof MutationObserver,a=(s.prototype.addObserver=function(t){~this.observers_.indexOf(t)||this.observers_.push(t),this.connected_||this.connect_()},s.prototype.removeObserver=function(t){var e=this.observers_,n=e.indexOf(t);~n&&e.splice(n,1),!e.length&&this.connected_&&this.disconnect_()},s.prototype.refresh=function(){this.updateObservers_()&&this.refresh()},s.prototype.updateObservers_=function(){var t=this.observers_.filter(function(t){return t.gatherActive(),t.hasActive()});return t.forEach(function(t){return t.broadcastActive()}),0<t.length},s.prototype.connect_=function(){n&&!this.connected_&&(document.addEventListener("transitionend",this.onTransitionEnd_),window.addEventListener("resize",this.refresh),r?(this.mutationsObserver_=new MutationObserver(this.refresh),this.mutationsObserver_.observe(document,{attributes:!0,childList:!0,characterData:!0,subtree:!0})):(document.addEventListener("DOMSubtreeModified",this.refresh),this.mutationEventsAdded_=!0),this.connected_=!0)},s.prototype.disconnect_=function(){n&&this.connected_&&(document.removeEventListener("transitionend",this.onTransitionEnd_),window.removeEventListener("resize",this.refresh),this.mutationsObserver_&&this.mutationsObserver_.disconnect(),this.mutationEventsAdded_&&document.removeEventListener("DOMSubtreeModified",this.refresh),this.mutationsObserver_=null,this.mutationEventsAdded_=!1,this.connected_=!1)},s.prototype.onTransitionEnd_=function(t){var e=t.propertyName,n=void 0===e?"":e;o.some(function(t){return!!~n.indexOf(t)})&&this.refresh()},s.getInstance=function(){return this.instance_||(this.instance_=new s),this.instance_},s.instance_=null,s);function s(){function t(){r&&(r=!1,i()),a&&n()}function e(){l(t)}function n(){var t=Date.now();if(r){if(t-s<u)return;a=!0}else a=!(r=!0),setTimeout(e,o);s=t}var i,o,r,a,s;this.connected_=!1,this.mutationEventsAdded_=!1,this.mutationsObserver_=null,this.observers_=[],this.onTransitionEnd_=this.onTransitionEnd_.bind(this),this.refresh=(i=this.refresh.bind(this),a=r=!(o=20),s=0,n)}var c=function(t,e){for(var n=0,i=Object.keys(e);n<i.length;n++){var o=i[n];Object.defineProperty(t,o,{value:e[o],enumerable:!1,writable:!1,configurable:!0})}return t},h=function(t){return t&&t.ownerDocument&&t.ownerDocument.defaultView||e},f=y(0,0,0,0);function p(t){return parseFloat(t)||0}function v(n){for(var t=[],e=1;e<arguments.length;e++)t[e-1]=arguments[e];return t.reduce(function(t,e){return t+p(n["border-"+e+"-width"])},0)}function d(t){var e=t.clientWidth,n=t.clientHeight;if(!e&&!n)return f;var i,o=h(t).getComputedStyle(t),r=function(t){for(var e={},n=0,i=["top","right","bottom","left"];n<i.length;n++){var o=i[n],r=t["padding-"+o];e[o]=p(r)}return e}(o),a=r.left+r.right,s=r.top+r.bottom,l=p(o.width),u=p(o.height);if("border-box"===o.boxSizing&&(Math.round(l+a)!==e&&(l-=v(o,"left","right")+a),Math.round(u+s)!==n&&(u-=v(o,"top","bottom")+s)),(i=t)!==h(i).document.documentElement){var c=Math.round(l+a)-e,d=Math.round(u+s)-n;1!==Math.abs(c)&&(l-=c),1!==Math.abs(d)&&(u-=d)}return y(r.left,r.top,l,u)}var m="undefined"!=typeof SVGGraphicsElement?function(t){return t instanceof h(t).SVGGraphicsElement}:function(t){return t instanceof h(t).SVGElement&&"function"==typeof t.getBBox};function b(t){return n?m(t)?y(0,0,(e=t.getBBox()).width,e.height):d(t):f;var e}function y(t,e,n,i){return{x:t,y:e,width:n,height:i}}var g=(w.prototype.isActive=function(){var t=b(this.target);return(this.contentRect_=t).width!==this.broadcastWidth||t.height!==this.broadcastHeight},w.prototype.broadcastRect=function(){var t=this.contentRect_;return this.broadcastWidth=t.width,this.broadcastHeight=t.height,t},w);function w(t){this.broadcastWidth=0,this.broadcastHeight=0,this.contentRect_=y(0,0,0,0),this.target=t}var _=function(t,e){var n,i,o,r,a,s,l,u=(i=(n=e).x,o=n.y,r=n.width,a=n.height,s="undefined"!=typeof DOMRectReadOnly?DOMRectReadOnly:Object,l=Object.create(s.prototype),c(l,{x:i,y:o,width:r,height:a,top:o,right:i+r,bottom:a+o,left:i}),l);c(this,{target:t,contentRect:u})},E=(x.prototype.observe=function(t){if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");if("undefined"!=typeof Element&&Element instanceof Object){if(!(t instanceof h(t).Element))throw new TypeError('parameter 1 is not of type "Element".');var e=this.observations_;e.has(t)||(e.set(t,new g(t)),this.controller_.addObserver(this),this.controller_.refresh())}},x.prototype.unobserve=function(t){if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");if("undefined"!=typeof Element&&Element instanceof Object){if(!(t instanceof h(t).Element))throw new TypeError('parameter 1 is not of type "Element".');var e=this.observations_;e.has(t)&&(e.delete(t),e.size||this.controller_.removeObserver(this))}},x.prototype.disconnect=function(){this.clearActive(),this.observations_.clear(),this.controller_.removeObserver(this)},x.prototype.gatherActive=function(){var e=this;this.clearActive(),this.observations_.forEach(function(t){t.isActive()&&e.activeObservations_.push(t)})},x.prototype.broadcastActive=function(){if(this.hasActive()){var t=this.callbackCtx_,e=this.activeObservations_.map(function(t){return new _(t.target,t.broadcastRect())});this.callback_.call(t,e,t),this.clearActive()}},x.prototype.clearActive=function(){this.activeObservations_.splice(0)},x.prototype.hasActive=function(){return 0<this.activeObservations_.length},x);function x(t,e,n){if(this.activeObservations_=[],this.observations_=new i,"function"!=typeof t)throw new TypeError("The callback provided as parameter 1 is not a function.");this.callback_=t,this.controller_=e,this.callbackCtx_=n}var T=new("undefined"!=typeof WeakMap?WeakMap:i),O=function t(e){if(!(this instanceof t))throw new TypeError("Cannot call a class as a function.");if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");var n=a.getInstance(),i=new E(e,n,this);T.set(this,i)};["observe","unobserve","disconnect"].forEach(function(e){O.prototype[e]=function(){var t;return(t=T.get(this))[e].apply(t,arguments)}});var S=void 0!==e.ResizeObserver?e.ResizeObserver:O;M.a=S}).call(this,e(8))},function(t,e,n){"use strict";var i=n(0);n.n(i).a},function(t,e,n){(t.exports=n(3)(!1)).push([t.i,"\n.vue-modal-resizer {\n  display: block;\n  overflow: hidden;\n  position: absolute;\n  width: 12px;\n  height: 12px;\n  right: 0;\n  bottom: 0;\n  z-index: 9999999;\n  background: transparent;\n  cursor: se-resize;\n}\n.vue-modal-resizer::after {\n  display: block;\n  position: absolute;\n  content: '';\n  background: transparent;\n  left: 0;\n  top: 0;\n  width: 0;\n  height: 0;\n  border-bottom: 10px solid #ddd;\n  border-left: 10px solid transparent;\n}\n.vue-modal-resizer.clicked::after {\n  border-bottom: 10px solid #369be9;\n}\n",""])},function(t,e){var n;n=function(){return this}();try{n=n||new Function("return this")()}catch(t){"object"==typeof window&&(n=window)}t.exports=n},function(t,e,n){"use strict";var i=n(1);n.n(i).a},function(t,e,n){(t.exports=n(3)(!1)).push([t.i,"\n.vm--block-scroll {\n  overflow: hidden;\n  width: 100vw;\n}\n.vm--container {\n  position: fixed;\n  box-sizing: border-box;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100vh;\n  z-index: 999;\n}\n.vm--overlay {\n  position: fixed;\n  box-sizing: border-box;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100vh;\n  background: rgba(0, 0, 0, 0.2);\n  /* z-index: 999; */\n  opacity: 1;\n}\n.vm--container.scrollable {\n  height: 100%;\n  min-height: 100vh;\n  overflow-y: auto;\n  -webkit-overflow-scrolling: touch;\n}\n.vm--modal-box {\n  position: relative;\n  overflow: hidden;\n  box-sizing: border-box;\n}\n.vm--container.scrollable .vm--modal-box {\n  margin-bottom: 2px;\n}\n.v--modal {\n  background-color: white;\n  text-align: left;\n  border-radius: 3px;\n  box-shadow: 0 20px 60px -2px rgba(27, 33, 58, 0.4);\n  padding: 0;\n}\n\n/* .v--modal.v--modal-fullscreen {\n  width: 100vw;\n  height: 100vh;\n  margin: 0;\n  left: 0;\n  top: 0;\n} */\n.vm--top-right-slot {\n  display: block;\n  position: absolute;\n  right: 0;\n  top: 0;\n}\n.vm-transition--overlay-enter-active,\n.vm-transition--overlay-leave-active {\n  transition: all 50ms;\n}\n.vm-transition--overlay-enter,\n.vm-transition--overlay-leave-active {\n  opacity: 0;\n}\n.vm-transition--modal-enter-active,\n.vm-transition--modal-leave-active {\n  transition: all 400ms;\n}\n.vm-transition--modal-enter,\n.vm-transition--modal-leave-active {\n  opacity: 0;\n  transform: translateY(-20px);\n}\n.vm-transition--default-enter-active,\n.vm-transition--default-leave-active {\n  transition: all 2ms;\n}\n.vm-transition--default-enter,\n.vm-transition--default-leave-active {\n  opacity: 0;\n}\n",""])},function(t,e,n){"use strict";var i=n(2);n.n(i).a},function(t,e,n){(t.exports=n(3)(!1)).push([t.i,"\n.vue-dialog div {\n  box-sizing: border-box;\n}\n.vue-dialog .dialog-flex {\n  width: 100%;\n  height: 100%;\n}\n.vue-dialog .dialog-content {\n  flex: 1 0 auto;\n  width: 100%;\n  padding: 15px;\n  font-size: 14px;\n}\n.vue-dialog .dialog-c-title {\n  font-weight: 600;\n  padding-bottom: 15px;\n}\n.vue-dialog .vue-dialog-buttons {\n  display: flex;\n  flex: 0 1 auto;\n  width: 100%;\n  border-top: 1px solid #eee;\n}\n.vue-dialog .vue-dialog-buttons-none {\n  width: 100%;\n  padding-bottom: 15px;\n}\n.vue-dialog-button {\n  font-size: 12px !important;\n  background: transparent;\n  padding: 0;\n  margin: 0;\n  border: 0;\n  cursor: pointer;\n  box-sizing: border-box;\n  line-height: 40px;\n  height: 40px;\n  color: inherit;\n  font: inherit;\n  outline: none;\n}\n.vue-dialog-button:hover {\n  background: rgba(0, 0, 0, 0.01);\n}\n.vue-dialog-button:active {\n  background: rgba(0, 0, 0, 0.025);\n}\n.vue-dialog-button:not(:first-of-type) {\n  border-left: 1px solid #eee;\n}\n",""])},function(t,e,n){"use strict";n.r(e),n.d(e,"getModalsContainer",function(){return Y});function i(){var e=this,t=e.$createElement,n=e._self._c||t;return e.visible?n("div",{class:e.containerClass},[n("transition",{attrs:{name:e.guaranteedOverlayTransition},on:{"before-enter":e.beforeOverlayTransitionEnter,"after-enter":e.afterOverlayTransitionEnter,"before-leave":e.beforeOverlayTransitionLeave,"after-leave":e.afterOverlayTransitionLeave}},[e.visibility.overlay?n("div",{staticClass:"vm--overlay",attrs:{"data-modal":e.name,"aria-expanded":e.visibility.overlay.toString()},on:{mousedown:function(t){return t.target!==t.currentTarget?null:e.onOverlayClick(t)},touchstart:function(t){return t.target!==t.currentTarget?null:e.onOverlayClick(t)}}},[n("div",{staticClass:"vm--top-right-slot"},[e._t("top-right")],2)]):e._e()]),e._v(" "),n("transition",{attrs:{name:e.guaranteedModalTransition},on:{"before-enter":e.beforeModalTransitionEnter,"after-enter":e.afterModalTransitionEnter,"before-leave":e.beforeModalTransitionLeave,"after-leave":e.afterModalTransitionLeave}},[e.visibility.modal?n("div",{ref:"modal",class:e.modalClass,style:e.modalStyle,attrs:{"aria-expanded":e.visibility.modal.toString(),role:"“dialog”","aria-modal":"“true”"}},[e._t("default"),e._v(" "),e.resizable&&!e.isAutoHeight?n("resizer",{attrs:{"min-width":e.minWidth,"min-height":e.minHeight,"max-width":e.maxWidth,"max-height":e.maxHeight},on:{resize:e.handleModalResize}}):e._e()],2):e._e()])],1):e._e()}function o(){var t=this.$createElement;return(this._self._c||t)("div",{class:this.className})}function r(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function a(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var n=[],i=!0,o=!1,r=void 0;try{for(var a,s=t[Symbol.iterator]();!(i=(a=s.next()).done)&&(n.push(a.value),!e||n.length!==e);i=!0);}catch(t){o=!0,r=t}finally{try{i||null==s.return||s.return()}finally{if(o)throw r}}return n}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}o._withStripped=i._withStripped=!0;function h(t,e,n){return n<t?t:e<n?e:n}function s(){var t=window.innerWidth,e=document.documentElement.clientWidth;return t&&e?Math.min(t,e):e||t}function l(t){return t.split(";").map(function(t){return t.trim()}).filter(Boolean).map(function(t){return t.split(":")}).reduce(function(t,e){var n=a(e,2);return function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},i=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(i=i.concat(Object.getOwnPropertySymbols(n).filter(function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),i.forEach(function(t){r(e,t,n[t])})}return e}({},t,r({},n[0],n[1]))},{})}function f(t){return t.touches&&0<t.touches.length?t.touches[0]:t}var c=function(t){var e=0<arguments.length&&void 0!==t?t:0;return function(){return(e++).toString()}}(),p=["INPUT","TEXTAREA","SELECT"],u={name:"VueJsModalResizer",props:{minHeight:{type:Number,default:0},minWidth:{type:Number,default:0},maxWidth:{type:Number,default:Number.MAX_SAFE_INTEGER},maxHeight:{type:Number,default:Number.MAX_SAFE_INTEGER}},data:function(){return{clicked:!1,size:{}}},mounted:function(){this.$el.addEventListener("mousedown",this.start,!1)},computed:{className:function(){return["vue-modal-resizer",{clicked:this.clicked}]}},methods:{start:function(t){this.clicked=!0,window.addEventListener("mousemove",this.mousemove,!1),window.addEventListener("mouseup",this.stop,!1),t.stopPropagation(),t.preventDefault()},stop:function(){this.clicked=!1,window.removeEventListener("mousemove",this.mousemove,!1),window.removeEventListener("mouseup",this.stop,!1),this.$emit("resize-stop",{element:this.$el.parentElement,size:this.size})},mousemove:function(t){this.resize(t)},resize:function(t){var e=this.$el.parentElement;if(e){var n=t.clientX-e.offsetLeft,i=t.clientY-e.offsetTop,o=Math.min(s(),this.maxWidth),r=Math.min(window.innerHeight,this.maxHeight);n=h(this.minWidth,o,n),i=h(this.minHeight,r,i),this.size={width:n,height:i},e.style.width=n+"px",e.style.height=i+"px",this.$emit("resize",{element:e,size:this.size})}}}};n(6);function d(t,e,n,i,o,r,a,s){var l,u="function"==typeof t?t.options:t;if(e&&(u.render=e,u.staticRenderFns=n,u._compiled=!0),i&&(u.functional=!0),r&&(u._scopeId="data-v-"+r),a?(l=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),o&&o.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(a)},u._ssrRegister=l):o&&(l=s?function(){o.call(this,this.$root.$options.shadowRoot)}:o),l)if(u.functional){u._injectStyles=l;var c=u.render;u.render=function(t,e){return l.call(e),c(t,e)}}else{var d=u.beforeCreate;u.beforeCreate=d?[].concat(d,l):[l]}return{exports:t,options:u}}var v=d(u,o,[],!1,null,null,null);v.options.__file="src/Resizer.vue";var m=v.exports;var b=function t(){var e=this,n=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.timestamp=Date.now(),this.id=c(),Object.keys(n).forEach(function(t){e[t]=n[t]})};function y(t){return(y="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function g(t){switch(y(t)){case"number":return{type:"px",value:t};case"string":return function(e){if("auto"===e)return{type:e,value:0};var t=E.find(function(t){return t.regexp.test(e)});return t?{type:t.name,value:parseFloat(e)}:{type:"",value:e}}(t);default:return{type:"",value:t}}}function w(t){if("string"!=typeof t)return 0<=t;var e=g(t);return("%"===e.type||"px"===e.type)&&0<e.value}var _="[-+]?[0-9]*.?[0-9]+",E=[{name:"px",regexp:new RegExp("^".concat(_,"px$"))},{name:"%",regexp:new RegExp("^".concat(_,"%$"))},{name:"px",regexp:new RegExp("^".concat(_,"$"))}],x=n(5),T=window&&window.ResizeObserver?ResizeObserver:x.a;function O(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function S(t){return function(t){if(Array.isArray(t)){for(var e=0,n=new Array(t.length);e<t.length;e++)n[e]=t[e];return n}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function M(t){return e=t,n='button:not([disabled]), select:not([disabled]), a[href]:not([disabled]), area[href]:not([disabled]), [contentEditable=""]:not([disabled]), [contentEditable="true"]:not([disabled]), [contentEditable="TRUE"]:not([disabled]), textarea:not([disabled]), iframe:not([disabled]), input:not([disabled]), summary:not([disabled]), [tabindex]:not([tabindex="-1"])',console.log(e),S(e.querySelectorAll(n)||[]);var e,n}function k(t){return t==document.activeElement}var L=function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.root=null,this.elements=[],this.onKeyDown=this.onKeyDown.bind(this),this.enable=this.enable.bind(this),this.disable=this.disable.bind(this),this.firstElement=this.firstElement.bind(this),this.lastElement=this.lastElement.bind(this)}var e,n,i;return e=t,(n=[{key:"lastElement",value:function(){return this.elements[this.elements.length-1]||null}},{key:"firstElement",value:function(){return this.elements[0]||null}},{key:"onKeyDown",value:function(t){var e;if("Tab"===(e=t).key||9===e.keyCode)return t.shiftKey&&k(this.firstElement())?(this.lastElement().focus(),void t.preventDefault()):k(this.lastElement())?(this.firstElement().focus(),void t.preventDefault()):void 0}},{key:"enabled",value:function(){return!!this.root}},{key:"enable",value:function(t){if(t){this.root=t,this.elements=M(this.root);var e=this.firstElement();e&&e.focus(),this.root.addEventListener("keydown",this.onKeyDown)}}},{key:"disable",value:function(){this.root.removeEventListener("keydown",this.onKeyDown),this.root=null}}])&&O(e.prototype,n),i&&O(e,i),t}();function C(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function z(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var n=[],i=!0,o=!1,r=void 0;try{for(var a,s=t[Symbol.iterator]();!(i=(a=s.next()).done)&&(n.push(a.value),!e||n.length!==e);i=!0);}catch(t){o=!0,r=t}finally{try{i||null==s.return||s.return()}finally{if(o)throw r}}return n}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var j="vm-transition--default",$="enter",A="entering",R="leave",N="leavng",D={name:"VueJsModal",props:{name:{required:!0,type:String},resizable:{type:Boolean,default:!1},adaptive:{type:Boolean,default:!1},draggable:{type:[Boolean,String],default:!1},scrollable:{type:Boolean,default:!1},focusTrap:{type:Boolean,default:!1},reset:{type:Boolean,default:!1},overlayTransition:{type:String,default:"vm-transition--overlay"},transition:{type:String,default:"vm-transition--modal"},clickToClose:{type:Boolean,default:!0},classes:{type:[String,Array],default:"v--modal"},styles:{type:[String,Array,Object]},minWidth:{type:Number,default:0,validator:function(t){return 0<=t}},minHeight:{type:Number,default:0,validator:function(t){return 0<=t}},maxWidth:{type:Number,default:Number.MAX_SAFE_INTEGER},maxHeight:{type:Number,default:Number.MAX_SAFE_INTEGER},width:{type:[Number,String],default:600,validator:w},height:{type:[Number,String],default:300,validator:function(t){return"auto"===t||w(t)}},pivotX:{type:Number,default:.5,validator:function(t){return 0<=t&&t<=1}},pivotY:{type:Number,default:.5,validator:function(t){return 0<=t&&t<=1}}},components:{Resizer:m},data:function(){return{visible:!1,visibility:{modal:!1,overlay:!1},overlayTransitionState:null,modalTransitionState:null,shiftLeft:0,shiftTop:0,modal:{width:0,widthType:"px",height:0,heightType:"px",renderedHeight:0},viewportHeight:0,viewportWidth:0}},created:function(){this.setInitialSize()},beforeMount:function(){Q.event.$on("toggle",this.onToggle),window.addEventListener("resize",this.onWindowResize),this.onWindowResize(),this.scrollable&&!this.isAutoHeight&&console.warn('Modal "'.concat(this.name,'" has scrollable flag set to true ')+'but height is not "auto" ('.concat(this.height,")")),this.clickToClose&&window.addEventListener("keyup",this.onEscapeKeyUp)},mounted:function(){var n=this;this.resizeObserver=new T(function(t){if(0<t.length){var e=z(t,1)[0];n.modal.renderedHeight=e.contentRect.height}}),this.$focusTrap=new L},beforeDestroy:function(){Q.event.$off("toggle",this.onToggle),window.removeEventListener("resize",this.onWindowResize),this.clickToClose&&window.removeEventListener("keyup",this.onEscapeKeyUp),document.body.classList.remove("vm--block-scroll")},computed:{guaranteedOverlayTransition:function(){return this.overlayTransition||j},guaranteedModalTransition:function(){return this.transition||j},isAutoHeight:function(){return"auto"===this.modal.heightType},position:function(){var t=this.viewportHeight,e=this.viewportWidth,n=this.shiftLeft,i=this.shiftTop,o=this.pivotX,r=this.pivotY,a=this.trueModalWidth,s=this.trueModalHeight,l=e-a,u=Math.max(t-s,0),c=i+r*u;return{left:parseInt(h(0,l,n+o*l)),top:parseInt(h(0,u,c))}},trueModalWidth:function(){var t=this.viewportWidth,e=this.modal,n=this.adaptive,i=this.minWidth,o=this.maxWidth,r="%"===e.widthType?t/100*e.width:e.width;if(n){var a=Math.max(i,Math.min(t,o));return h(i,a,r)}return r},trueModalHeight:function(){var t=this.viewportHeight,e=this.modal,n=this.isAutoHeight,i=this.adaptive,o=this.minHeight,r=this.maxHeight,a="%"===e.heightType?t/100*e.height:e.height;if(n)return this.modal.renderedHeight;if(i){var s=Math.max(o,Math.min(t,r));return h(o,s,a)}return a},containerClass:function(){return["vm--container",this.scrollable&&this.isAutoHeight&&"scrollable"]},modalClass:function(){return["vm--modal-box",this.classes]},stylesProp:function(){return"string"==typeof this.styles?l(this.styles):this.styles},modalStyle:function(){return[this.stylesProp,{top:this.position.top+"px",left:this.position.left+"px",width:this.trueModalWidth+"px",height:this.isAutoHeight?"auto":this.trueModalHeight+"px"}]},isComponentReadyToBeDestroyed:function(){return this.overlayTransitionState===R&&this.modalTransitionState===R}},watch:{isComponentReadyToBeDestroyed:function(t){t&&(this.visible=!1)}},methods:{startTransitionEnter:function(){this.visibility.overlay=!0,this.visibility.modal=!0},startTransitionLeave:function(){this.visibility.overlay=!1,this.visibility.modal=!1},beforeOverlayTransitionEnter:function(){this.overlayTransitionState=A},afterOverlayTransitionEnter:function(){this.overlayTransitionState=$},beforeOverlayTransitionLeave:function(){this.overlayTransitionState=N},afterOverlayTransitionLeave:function(){this.overlayTransitionState=R},beforeModalTransitionEnter:function(){var t=this;this.modalTransitionState=A,this.$nextTick(function(){t.resizeObserver.observe(t.$refs.modal)})},afterModalTransitionEnter:function(){this.modalTransitionState=$,this.draggable&&this.addDraggableListeners(),this.focusTrap&&this.$focusTrap.enable(this.$refs.modal);var t=this.createModalEvent({state:"opened"});this.$emit("opened",t)},beforeModalTransitionLeave:function(){this.modalTransitionState=N,this.resizeObserver.unobserve(this.$refs.modal),this.$focusTrap.enabled()&&this.$focusTrap.disable()},afterModalTransitionLeave:function(){this.modalTransitionState=R;var t=this.createModalEvent({state:"closed"});this.$emit("closed",t)},onToggle:function(t,e,n){if(this.name===t){var i=void 0===e?!this.visible:e;this.toggle(i,n)}},setInitialSize:function(){var t=g(this.width),e=g(this.height);this.modal.width=t.value,this.modal.widthType=t.type,this.modal.height=e.value,this.modal.heightType=e.type},onEscapeKeyUp:function(t){27===t.which&&this.visible&&this.$modal.hide(this.name)},onWindowResize:function(){this.viewportWidth=s(),this.viewportHeight=window.innerHeight,this.ensureShiftInWindowBounds()},createModalEvent:function(t){var e=0<arguments.length&&void 0!==t?t:{};return new b(function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},i=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(i=i.concat(Object.getOwnPropertySymbols(n).filter(function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),i.forEach(function(t){C(e,t,n[t])})}return e}({name:this.name,ref:this.$refs.modal||null},e))},handleModalResize:function(t){this.modal.widthType="px",this.modal.width=t.size.width,this.modal.heightType="px",this.modal.height=t.size.height;var e=this.modal.size;this.$emit("resize",this.createModalEvent({size:e}))},open:function(t){var e=this;"undefined"!=typeof document&&document.activeElement&&"BODY"!==document.activeElement.tagName&&document.activeElement.blur&&document.activeElement.blur(),this.reset&&(this.setInitialSize(),this.shiftLeft=0,this.shiftTop=0),this.scrollable&&document.body.classList.add("vm--block-scroll");var n=!1,i=this.createModalEvent({cancel:function(){n=!0},state:"before-open",params:t});this.$emit("before-open",i),n||(this.visible=!0,this.$nextTick(function(){e.startTransitionEnter()}))},close:function(t){this.scrollable&&document.body.classList.remove("vm--block-scroll");var e=!1,n=this.createModalEvent({cancel:function(){e=!0},state:"before-close",params:t});this.$emit("before-close",n),e||this.startTransitionLeave()},toggle:function(t,e){this.visible!==t&&(t?this.open(e):this.close(e))},getDraggableElement:function(){return!0===this.draggable?this.$refs.modal:"string"==typeof this.draggable?this.$refs.modal.querySelector(this.draggable):null},onOverlayClick:function(){this.clickToClose&&this.toggle(!1)},addDraggableListeners:function(){var a=this,t=this.getDraggableElement();if(t){var s=0,l=0,u=0,c=0,e=function(t){var e=t.target;if(!(n=e)||-1===p.indexOf(n.nodeName)){var n,i=f(t),o=i.clientX,r=i.clientY;document.addEventListener("mousemove",d),document.addEventListener("touchmove",d),document.addEventListener("mouseup",h),document.addEventListener("touchend",h),s=o,l=r,u=a.shiftLeft,c=a.shiftTop}},d=function(t){var e=f(t),n=e.clientX,i=e.clientY;a.shiftLeft=u+n-s,a.shiftTop=c+i-l,t.preventDefault()},h=function t(e){a.ensureShiftInWindowBounds(),document.removeEventListener("mousemove",d),document.removeEventListener("touchmove",d),document.removeEventListener("mouseup",t),document.removeEventListener("touchend",t),e.preventDefault()};t.addEventListener("mousedown",e),t.addEventListener("touchstart",e)}},ensureShiftInWindowBounds:function(){var t=this.viewportHeight,e=this.viewportWidth,n=this.shiftLeft,i=this.shiftTop,o=this.pivotX,r=this.pivotY,a=this.trueModalWidth,s=this.trueModalHeight,l=e-a,u=Math.max(t-s,0),c=n+o*l,d=i+r*u;this.shiftLeft-=c-h(0,l,c),this.shiftTop-=d-h(0,u,d)}}},H=(n(9),d(D,i,[],!1,null,null,null));H.options.__file="src/Modal.vue";function W(){var n=this,t=n.$createElement,i=n._self._c||t;return i(n.$modal.context.componentName,{tag:"component",attrs:{name:"dialog",height:"auto",classes:["v--modal","vue-dialog",this.params.class],width:n.width,"pivot-y":.3,adaptive:!0,clickToClose:n.clickToClose,transition:n.transition},on:{"before-open":n.beforeOpened,"before-close":n.beforeClosed,opened:function(t){n.$emit("opened",t)},closed:function(t){n.$emit("closed",t)}}},[i("div",{staticClass:"dialog-content"},[n.params.title?i("div",{staticClass:"dialog-c-title",domProps:{innerHTML:n._s(n.params.title||"")}}):n._e(),n._v(" "),n.params.component?i(n.params.component,n._b({tag:"component"},"component",n.params.props,!1)):i("div",{staticClass:"dialog-c-text",domProps:{innerHTML:n._s(n.params.text||"")}})],1),n._v(" "),n.buttons?i("div",{staticClass:"vue-dialog-buttons"},n._l(n.buttons,function(t,e){return i("button",{key:e,class:t.class||"vue-dialog-button",style:n.buttonStyle,attrs:{type:"button"},domProps:{innerHTML:n._s(t.title)},on:{click:function(t){t.stopPropagation(),n.click(e,t)}}},[n._v("\n      "+n._s(t.title)+"\n    ")])})):i("div",{staticClass:"vue-dialog-buttons-none"})])}var P=H.exports;W._withStripped=!0;var I={name:"VueJsDialog",props:{width:{type:[Number,String],default:400},clickToClose:{type:Boolean,default:!0},transition:{type:String,default:"fade"}},data:function(){return{params:{},defaultButtons:[{title:"CLOSE"}]}},computed:{buttons:function(){return this.params.buttons||this.defaultButtons},buttonStyle:function(){return{flex:"1 1 ".concat(100/this.buttons.length,"%")}}},methods:{beforeOpened:function(t){window.addEventListener("keyup",this.onKeyUp),this.params=t.params||{},this.$emit("before-opened",t)},beforeClosed:function(t){window.removeEventListener("keyup",this.onKeyUp),this.params={},this.$emit("before-closed",t)},click:function(t,e,n){var i=2<arguments.length&&void 0!==n?n:"click",o=this.buttons[t];o&&"function"==typeof o.handler?o.handler(t,e,{source:i}):this.$modal.hide("dialog")},onKeyUp:function(t){if(13===t.which&&0<this.buttons.length){var e=1===this.buttons.length?0:this.buttons.findIndex(function(t){return t.default});-1!==e&&this.click(e,t,"keypress")}}}},B=(n(11),d(I,W,[],!1,null,null,null));B.options.__file="src/Dialog.vue";function U(){var n=this,t=n.$createElement,i=n._self._c||t;return i("div",{attrs:{id:"modals-container"}},n._l(n.modals,function(e){return i("modal",n._g(n._b({key:e.id,on:{closed:function(t){n.remove(e.id)}}},"modal",e.modalAttrs,!1),e.modalListeners),[i(e.component,n._g(n._b({tag:"component",on:{close:function(t){n.$modal.hide(e.modalAttrs.name)}}},"component",e.componentAttrs,!1),n.$listeners))],1)}))}var X=B.exports;function K(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}U._withStripped=!0;var F=d({data:function(){return{modals:[]}},created:function(){this.$root._dynamicContainer=this},methods:{add:function(t,e,n,i){var o=this,r=1<arguments.length&&void 0!==e?e:{},a=2<arguments.length&&void 0!==n?n:{},s=3<arguments.length&&void 0!==i?i:{},l=c(),u=a.name||"_dynamic_modal_"+l;this.modals.push({id:l,modalAttrs:function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},i=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(i=i.concat(Object.getOwnPropertySymbols(n).filter(function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),i.forEach(function(t){K(e,t,n[t])})}return e}({},a,{name:u}),modalListeners:s,component:t,componentAttrs:r}),this.$nextTick(function(){o.$modal.show(u)})},remove:function(e){var t=this.modals.findIndex(function(t){return t.id===e});-1!==t&&this.modals.splice(t,1)}}},U,[],!1,null,null,null);F.options.__file="src/ModalsContainer.vue";var G=F.exports;function V(t){return(V="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function q(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var Y=function(t,e,n){if(!n._dynamicContainer&&e.injectModalsContainer){var i=(o=document.createElement("div"),document.body.appendChild(o),o);new t({parent:n,render:function(t){return t(G)}}).$mount(i)}var o;return n._dynamicContainer},J={install:function(a,t){var s=1<arguments.length&&void 0!==t?t:{};if(!this.installed){this.installed=!0,this.event=new a,this.rootInstance=null;var e=s.componentName||"Modal",l=s.dynamicDefaults||{},o=function(t,e,n,i){var o=n&&n.root?n.root:J.rootInstance,r=Y(a,s,o);r?r.add(t,e,function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},i=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(i=i.concat(Object.getOwnPropertySymbols(n).filter(function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),i.forEach(function(t){q(e,t,n[t])})}return e}({},l,n),i):console.warn("[vue-js-modal] In order to render dynamic modals, a <modals-container> component must be present on the page.")};a.prototype.$modal={get context(){return{componentName:e}},show:function(t){for(var e=arguments.length,n=new Array(1<e?e-1:0),i=1;i<e;i++)n[i-1]=arguments[i];switch(V(t)){case"string":return function(t,e){J.event.$emit("toggle",t,!0,e)}.apply(void 0,[t].concat(n));case"object":case"function":return s.dynamic?o.apply(void 0,[t].concat(n)):console.warn("[vue-js-modal] $modal() received object as a first argument, but dynamic modals are switched off. https://github.com/euvl/vue-js-modal/#dynamic-modals");default:console.warn("[vue-js-modal] $modal() received an unsupported argument as a first argument.",t)}},hide:function(t,e){J.event.$emit("toggle",t,!1,e)},toggle:function(t,e){J.event.$emit("toggle",t,void 0,e)}},a.component(e,P),s.dialog&&a.component("VDialog",X),s.dynamic&&(a.component("ModalsContainer",G),a.mixin({beforeMount:function(){null===J.rootInstance&&(J.rootInstance=this.$root)}}))}}},Q=e.default=J}],o.c=i,o.d=function(t,e,n){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},o.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)o.d(n,i,function(t){return e[t]}.bind(null,i));return n},o.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="/dist/",o(o.s=13);function o(t){if(i[t])return i[t].exports;var e=i[t]={i:t,l:!1,exports:{}};return n[t].call(e.exports,e,e.exports,o),e.l=!0,e.exports}var n,i});
//# sourceMappingURL=index.js.map