import context from './context';
import isElement from 'lodash.isElement';

export default class application {

    /**
     * Initialize a new `Application`.
     *
     * @param {DOMElement|String} input
     * @api private
     */
    constructor(input) {
        this.middleware = [];
        this.context = Object.create(context);
        this.init(input);
    }

    init(input) {
        window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;
        window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
        window.cancelAnimationFrame = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.msCancelAnimationFrame;

        if (isElement(input)) {
            this.audio = input;
        }
    }

    start() {
        console.log(this.audio);
    }
}