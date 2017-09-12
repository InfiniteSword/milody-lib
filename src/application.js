import isElement from 'lodash.iselement';

export default class application {

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
        } else if (input && isElement(input)) {
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
            if(node === 'analyser'){
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
        if (this.states['analyser']){
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
        if (this.states['analyser']){
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