(function () {
  "use strict";

  var game, canvas, renderer, startBtn;

  window.onload = function () {
    document.ontouchmove = function (event) {
      event.preventDefault();
    };

    canvas = document.getElementById('the-game');
    startBtn = document.getElementById('start-btn');
    startBtn.onclick = function () {
      canvas.classList.toggle('game-stopped')
      startGame(canvas);
    };
  };

  window.addEventListener('resize', resizeCanvas);

  function startGame(canvas) {
    renderer = new Renderer(canvas);
    game = new Game(renderer);
    resizeCanvas();
    mainLoop();
  }

  function resizeCanvas() {
    var devicePixelRatio = window.devicePixelRatio || 1;

    canvas.width = window.innerWidth * devicePixelRatio;
    canvas.height = window.innerHeight * devicePixelRatio;
    renderer.resizeViewport();
  }

  function mainLoop() {
    game.loop();
    requestAnimationFrame(mainLoop);
  }
})();
