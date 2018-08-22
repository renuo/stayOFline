function startMusic() {
  (function myLoop(i, f, l) {
    setTimeout(function () {
      playNote(600 - f * 10, 40);
      if (l === 1) {
        f++;
        if (f > 20) {
          l = 0;
        }
      } else {
        f--;
        if (f < 0) {
          l = 1;
        }
      }
      if (f > 20) {
        l = 0
      }
      console.log(f + "  " + l);
      myLoop(i, f, l);
    }, 30)
  })(1, 1, 1);
}

var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playNote(frequency, duration, callback) {
  duration = duration / 1000;

  // create Oscillator node
  var oscillator = audioCtx.createOscillator();

  oscillator.type = 'square';
  oscillator.frequency.value = frequency; // value in hertz
  oscillator.connect(audioCtx.destination);

  oscillator.onended = callback;
  oscillator.start(0);
  oscillator.stop(audioCtx.currentTime + duration);
}