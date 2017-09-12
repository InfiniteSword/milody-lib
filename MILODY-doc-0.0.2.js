(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("milody", [], factory);
	else if(typeof exports === 'object')
		exports["milody"] = factory();
	else
		root["milody"] = factory();
})(this, function() {
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
/******/ 	__webpack_require__.p = "./";
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

// EXTERNAL MODULE: ./node_modules/lodash.iselement/index.js
var lodash_iselement = __webpack_require__(1);
var lodash_iselement_default = /*#__PURE__*/__webpack_require__.n(lodash_iselement);

// CONCATENATED MODULE: ./src/application.js


class application_application {

    /**
     * Initialize a new application.
     *
     * @param {DOMElement|String} input
     * @api public
     */
    constructor(input) {
        window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;
        window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
        window.cancelAnimationFrame = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.msCancelAnimationFrame;

        try {
            this.audioContext = new window.AudioContext();
        } catch (e) {
            this.errMsg = 'Your browser does not support Web Audio API!';
        }

        this.nodes = [];
        this.states = {};
        this.createAudio(input);
        this.createNodes();
    }

    /**
     * Create Audio element.
     *
     * @param {DOMElement|String} input
     * @api private
     */
    createAudio(input) {
        if (typeof input === 'undefined') {
            return;
        } else if (input && lodash_iselement_default()(input)) {
            this.audio = input;
        } else {
            let audio = document.createElement('audio');
            audio.setAttribute('src', input);
            audio.setAttribute('crossOrigin', 'anonymous');
            document.body.appendChild(audio);
            this.audio = audio;
        }
    }

    /**
     * Create Nodes.
     *
     * @api private
     */
    createNodes() {
        this.source = this.audioContext.createMediaElementSource(this.audio);
        this.gain = this.audioContext.createGain();
        this.analyser = this.audioContext.createAnalyser();
        this.distortion = this.audioContext.createWaveShaper();
        this.biquadFilter = this.audioContext.createBiquadFilter();
        this.compressor = this.audioContext.createDynamicsCompressor();
        this.convolver = this.audioContext.createConvolver();
        this.panner = this.audioContext.createStereoPanner();
        this.oscillator = this.audioContext.createOscillator();
        this.destination = this.audioContext.destination;
        this.wholeNodes = ['gain', 'analyser', 'distortion', 'biquadFilter', 'compressor', 'convolver', 'panner', 'oscillator'];
    }

    /**
     * Add a Node to use.
     *
     * @param {String} node
     * @api public
     */
    use(node) {
        if (this.wholeNodes.includes(node)) {
            if (node === 'analyser') {
                this.states[node] = true;
            } else {
                this.nodes.push(node);
                this.states[node] = true;
            }
        }
    }

    /**
     * Remove a Node from using.
     *
     * @param {String} node
     * @api public
     */
    abandon(node) {
        if (this.nodes.includes(node)) {
            for (let i = 0, l = this.nodes.length; i < l; i++) {
                if (this.nodes[i] === node) {
                    this.nodes.splice(i, 1);
                    this.states[node] = false;
                }
            }
        }
    }

    /**
     * Analyse if analyser has bean used.
     *
     * @api public
     */
    analyse() {
        if (this.states['analyser']) {
            let array = new Uint8Array(this.analyser.frequencyBinCount);
            this.analyser.getByteFrequencyData(array);
            this.dataArray = array;
            return array;
        }
    }

    /**
     * Start the application.
     *
     * @api public
     */
    start() {
        let nodes = [];
        this.nodes.forEach(n => {
            nodes.push(n);
        });
        nodes.unshift('source');
        if (this.states['analyser']) {
            nodes.push('analyser');
        }
        nodes.push('destination');
        let i = 0;
        while (++i < nodes.length) {
            this[nodes[i - 1]].connect(this[nodes[i]]);
        }
    }

    /**
     * Restart the application.
     *
     * @api public
     */
    restart() {
        let nodes = [];
        let i = 0;
        this.nodes.forEach(n => {
            nodes.push(n);
        });
        nodes.unshift('source');
        if (this.states['analyser']) {
            nodes.push('analyser');
        }
        nodes.push('destination');
        while (++i < nodes.length) {
            this[nodes[i - 1]].disconnect();
        }
        i = 0;
        while (++i < nodes.length) {
            this[nodes[i - 1]].connect(this[nodes[i]]);
        }
    }

    /**
     * Play the music.
     *
     * @api public
     */
    play() {
        this.audio.play();
        this.states.playing = true;
    }

    /**
     * Pause the music.
     *
     * @api public
     */
    pause() {
        this.audio.pause();
        this.states.playing = false;
    }
}
// CONCATENATED MODULE: ./src/CircleAnimate.js
let _deg = Math.PI;

function CircleAnimate(canvas, arr, lastArr, options) {
    const SCREEN_WIDTH = window.innerWidth;
    const SCREEN_HEIGHT = window.innerHeight;
    canvas.width = SCREEN_WIDTH;
    canvas.height = SCREEN_HEIGHT;
    options = options || {};
    let opts = {
        r: options.r || SCREEN_WIDTH > SCREEN_HEIGHT ? SCREEN_HEIGHT / 4 : SCREEN_WIDTH / 4, // 圆半径
        n: options.n || 96, // 点数（必须为偶数）
        w: options.w || 4, // 线宽
        colors: options.colors || [{
            stop: '1',
            color: 'rgba(255,255,255,.8)'
        }], // 颜色及其过渡位置
        blurColor: options.blurColor || '#ffffff', // 模糊颜色
        blurWidth: options.blurWidth || 20,
        rotate: options.rotate || false,
        tempArr: lastArr || []
    };
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let arr1 = [];
    let arr2 = [];
    let x, y, value;
    let DEG = opts.n / 2;
    let step = Math.round(arr.length / opts.n / 2);
    let centerX = SCREEN_WIDTH / 2;
    let centerY = SCREEN_HEIGHT / 2;
    ctx.translate(centerX, centerY);
    ctx.rotate(_deg);
    ctx.translate(-centerX, -centerY);
    if (opts.rotate) {
        _deg += Math.PI / 1080;
    }
    for (let i = 0; i < opts.n / 2; i++) {
        value = arr[i * step] * arr[i * step] / 200;
        let n1 = value || 0;
        let n2;
        if (opts.tempArr[i]) {
            n2 = 0;
        } else {
            n2 = 0;
        }
        n1 = Math.max(n1, n2);
        n1 = Math.min(n1, 300);
        opts.tempArr[i] = n1;
        x = centerX + Math.sin(Math.PI / DEG * i + Math.PI / 4) * (opts.r + n1 / 4);
        y = centerY - Math.cos(Math.PI / DEG * i + Math.PI / 4) * (opts.r + n1 / 4);
        arr1.push({
            'x': x,
            'y': y
        });
        x = centerX + Math.sin(Math.PI / DEG * i + Math.PI / 4) * (opts.r - n1 / 4);
        y = centerY - Math.cos(Math.PI / DEG * i + Math.PI / 4) * (opts.r - n1 / 4);
        arr2.push({
            'x': x,
            'y': y
        });
    }
    for (let i = opts.n / 2, j = 0; i < opts.n; i++, j++) {
        value = arr[j * step] * arr[j * step] / 200;
        let n1 = value || 0;
        let n2;
        if (opts.tempArr[j]) {
            n2 = 0;
        } else {
            n2 = 0;
        }
        n1 = Math.max(n1, n2);
        n1 = Math.min(n1, 300);
        opts.tempArr[j] = n1;
        x = centerX + Math.sin(Math.PI / DEG * i + Math.PI / 4) * (opts.r + n1 / 4);
        y = centerY - Math.cos(Math.PI / DEG * i + Math.PI / 4) * (opts.r + n1 / 4);
        arr1.push({
            'x': x,
            'y': y
        });
        x = centerX + Math.sin(Math.PI / DEG * i + Math.PI / 4) * (opts.r - n1 / 4);
        y = centerY - Math.cos(Math.PI / DEG * i + Math.PI / 4) * (opts.r - n1 / 4);
        arr2.push({
            'x': x,
            'y': y
        });
    }
    let gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    opts.colors.forEach(item => {
        gradient.addColorStop(item.stop, item.color);
    });
    ctx.shadowBlur = opts.blurWidth;
    ctx.shadowColor = opts.blurColor;
    ctx.strokeStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(arr1[opts.n - 1].x, arr1[opts.n - 1].y);
    for (let i = 0; i < opts.n; i++) {
        ctx.lineTo(arr1[i].x, arr1[i].y);
    }
    ctx.closePath();
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(arr2[opts.n - 1].x, arr2[opts.n - 1].y);
    for (let i = 0; i < opts.n; i++) {
        ctx.lineTo(arr2[i].x, arr2[i].y);
    }
    ctx.closePath();
    ctx.stroke();
    ctx.beginPath();
    for (let i = 0; i < opts.n; i++) {
        ctx.moveTo(arr1[i].x, arr1[i].y);
        ctx.lineTo(arr2[i].x, arr2[i].y);
    }
    ctx.closePath();
    ctx.stroke();
    return opts.tempArr;
}

/* harmony default export */ var src_CircleAnimate = (CircleAnimate);
// CONCATENATED MODULE: ./examples/main.js



const audio = document.querySelector('#audio');
const canvas = document.querySelector('#canvas');
const control = document.querySelector('#control');
const biquad = document.querySelector('#biquad');

let milody = new application_application(audio);
milody.use('gain');
milody.gain.gain.value = 1;
milody.use('analyser');
milody.analyser.fftSize = 2048;
milody.start();
biquad.addEventListener('click', function () {
    if (milody.states['biquadFilter']) {
        milody.abandon('biquadFilter');
        milody.restart();
        biquad.innerHTML = 'Use biquadFilter';
    } else {
        milody.use('biquadFilter');
        milody.restart();
        biquad.innerHTML = 'Abandon biquadFilter';
    }
});

audio.addEventListener('canplaythrough', function () {
    milody.play();
    control.innerHTML = 'Pause';
    control.addEventListener('click', function () {
        if (milody.states.playing) {
            milody.pause();
            control.innerHTML = 'Play';
        } else {
            milody.play();
            control.innerHTML = 'Pause';
        }
    });
    window.requestAnimationFrame(animate);
});

let array = [];
let lastArray = [];
let options = {
    show: true,
    colors: [{
        stop: '0.3',
        color: '#66CCFF'
    }, {
        stop: '0.5',
        color: '#CCFFCC'
    }, {
        stop: '0.7',
        color: '#CC66FF'
    }],
    blurColor: '#FFFFFF',
    rotate: false
};

function animate() {
    array = milody.analyse();
    lastArray = src_CircleAnimate(canvas, array, lastArray, {
        colors: options.colors,
        blurColor: options.blurColor,
        rotate: options.rotate
    });

    window.requestAnimationFrame(animate);
}

/***/ }),
/* 1 */
/***/ (function(module, exports) {

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** `Object#toString` result references. */
var objectTag = '[object Object]';

/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */
function isHostObject(value) {
  // Many host objects are `Object` objects that can coerce to strings
  // despite having improperly defined `toString` methods.
  var result = false;
  if (value != null && typeof value.toString != 'function') {
    try {
      result = !!(value + '');
    } catch (e) {}
  }
  return result;
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Built-in value references. */
var getPrototype = overArg(Object.getPrototypeOf, Object);

/**
 * Checks if `value` is likely a DOM element.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a DOM element, else `false`.
 * @example
 *
 * _.isElement(document.body);
 * // => true
 *
 * _.isElement('<body>');
 * // => false
 */
function isElement(value) {
  return !!value && value.nodeType === 1 && isObjectLike(value) && !isPlainObject(value);
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!isObjectLike(value) ||
      objectToString.call(value) != objectTag || isHostObject(value)) {
    return false;
  }
  var proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return (typeof Ctor == 'function' &&
    Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString);
}

module.exports = isElement;


/***/ })
/******/ ]);
});