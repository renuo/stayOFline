function startMusic() {
  var sound = [[0, 2], [], [2, 2], [0, 1], [], [0, 1], [2, 2], [], [], [2, 1], [0, 2], [], [2, 2], [], [0, 2], [2, 1], [2, 2], [8, 2], [2, 1], [2, 1], [8, 2]];
  (function myLoop(i) {
    setTimeout(function () {
      if (sound[i][0] != null) {
        playTriangle(500 - sound[i][0] * 10, sound[i][1] * 100);
      }
      i++;
      if (i >= sound.length) {
        i = 0;
      }
      myLoop(i);
    }, 200)
  })(0);
}

var audioCtx = new (window.AudioContext || window.webkitAudioContext)();


function playTriangle(frequency, duration) {
  playTone(frequency, duration, 'triangle')
}

function playSquare(frequency, duration) {
  playTone(frequency, duration, 'square')
}

function playTone(frequency, duration, type) {
  duration = duration / 1000;
  var oscillator = audioCtx.createOscillator();
  oscillator.type = type;
  oscillator.frequency.value = frequency;
  oscillator.connect(audioCtx.destination);
  oscillator.start(0);
  oscillator.stop(audioCtx.currentTime + duration);
}