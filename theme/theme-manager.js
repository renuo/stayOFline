function startMusic() {
  (function myLoop(i) {
    setTimeout(function () {
      var x = i / 100;
      var tone = Math.floor(Math.sin(Math.PI * x) * 100);
      console.log(tone);
      playNote(500 - tone, 50);
      i++;
      myLoop(i);
    }, 30)
  })(1);
}

var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playNote(frequency, duration) {
  duration = duration / 1000;
  var oscillator = audioCtx.createOscillator();
  oscillator.type = 'square';
  oscillator.frequency.value = frequency;
  oscillator.connect(audioCtx.destination);
  oscillator.start(0);
  oscillator.stop(audioCtx.currentTime + duration);
}