!function(e,n){"function"==typeof define&&define.amd?define([],n):e.WidthWatcher=n()}(this,function(){"use strict";return function(){function e(){var e,t=n(arguments);for(e=0;e<t.length;e++){if("number"!=typeof t[e]||t[e]<=0)throw new Error("WidthWatcher only accepts unsigned integers");"undefined"==typeof s[t[e]]&&(s[t[e]]={max:matchMedia("screen and (max-width: "+t[e]+"px)"),min:matchMedia("screen and (min-width: "+t[e]+"px)")})}}function n(e){var n,t=[];for(n=0;n<e.length;n++)"[object Array]"===Object.prototype.toString.call(e[n])?t=t.concat(e[n]):t.push(e[n]);return t}function t(e){s.hasOwnProperty(e)}function r(e,n,t,r){var i;r=r||"add","object"!=typeof e&&(e={fn:e,direction:t,breakpoint:n}),console.log(d(e.fn)==d(e.fn));for(i in s)s.hasOwnProperty(i)&&("undefined"==typeof e.breakpoint||e.breakpoint===parseInt(i))&&(("undefined"==typeof e.direction||"up"==e.direction||"increase"==e.direction)&&("add"===r?s[i].min.addListener(d(e.fn)):s[i].min.removeListener(d(e.fn))),("undefined"==typeof e.direction||"down"==e.direction||"decrease"==e.direction)&&("add"===r?s[i].max.addListener(d(e.fn)):s[i].max.removeListener(d(e.fn))))}function i(e,n,t){r(e,n,t,"add")}function o(e,n,t){r(e,n,t,"remove")}function d(e){return"undefined"==typeof p[e]&&(p[e]=function(n){n.matches&&e(u(n))}),p[e]}function a(e,n){i({fn:e,breakpoint:n,direction:"increase"})}function c(e,n){i({fn:e,breakpoint:n,direction:"decrease"})}function f(){var e=[];for(var n in s)s.hasOwnProperty(n)&&e.push(parseInt(n));return e}function u(e){return e.getValue=function(){var n=e.media.match(/\d+/);return n?n[0]:!1},e}var s={},p={};return{add:e,remove:t,addListener:i,addDecreaseListener:c,addIncreaseListener:a,removeListener:o,getBreakpoints:f}}});