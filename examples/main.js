import Milody from '@/application';
import CircleAnimate from '@/CircleAnimate';

const audio = document.querySelector('#audio');
const canvas = document.querySelector('#canvas');
const control = document.querySelector('#control');
const biquad = document.querySelector('#biquad');

let milody = new Milody(audio);
milody.use('gain');
milody.gain.gain.value = 1;
milody.use('analyser');
milody.analyser.fftSize = 2048;
milody.start();
biquad.addEventListener('click', function(){
    if (milody.states['biquadFilter']){
        milody.abandon('biquadFilter');
        milody.restart();
        biquad.innerHTML = 'Use biquadFilter';
    } else {
        milody.use('biquadFilter');
        milody.restart();
        biquad.innerHTML = 'Abandon biquadFilter';
    }
});

audio.addEventListener('canplaythrough', function(){
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
    lastArray = CircleAnimate(canvas, array, lastArray, {
        colors: options.colors,
        blurColor: options.blurColor,
        rotate: options.rotate
    });

    window.requestAnimationFrame(animate);
}



