(function () {
  "use strict";

  let game, canvas, renderer, startBtn, startMenu;

  window.onload = function () {
    document.ontouchmove = function (event) {
      event.preventDefault();
    };

    canvas = document.getElementById('the-game');
    startMenu = document.getElementById('start-menu');
    startBtn = document.getElementById('start-btn');
    startBtn.onclick = function () {
      canvas.classList.toggle('game-stopped');
      startMenu.classList.toggle('game-stopped');
      startGame(canvas);
      startMusic();
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
    const devicePixelRatio = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * devicePixelRatio;
    canvas.height = window.innerHeight * devicePixelRatio;
    renderer.resizeViewport();
  }

  function mainLoop() {
    game.loop();
    requestAnimationFrame(mainLoop);
  }
})();
