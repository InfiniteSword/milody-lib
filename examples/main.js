import Milody from '@/application';

const audio = document.querySelector('#audio');
let milody = new Milody(audio);
milody.use('gain');
milody.gain.gain.value = 1;
milody.start();
console.log(milody);