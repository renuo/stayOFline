(function () {
  "use strict";

  let game, canvas, renderer, startBtn, startMenu, restartBtn, themeManager;

  window.onload = function () {
    if ("ontouchstart" in document.documentElement) {
      debug("your device is a touch screen device.");
      localStorage['isTouch'] = 1;
    } else {
      debug("your device is NOT a touch device");
      localStorage['isTouch'] = 0;
    }

    canvas = document.getElementById('the-game');
    startMenu = document.getElementById('start-menu');
    startBtn = document.getElementById('start-btn');
    restartBtn = document.getElementById('restart-btn');
    startBtn.onclick = function () {
      canvas.classList.toggle('game-stopped');
      startMenu.classList.toggle('game-stopped');
      startGame(canvas);
    };

    restartBtn.onclick = function () {
      location.reload();
    };
  };

  window.addEventListener('resize', resizeCanvas);

  function startGame(canvas) {
    localStorage['running'] = 1;
    themeManager = new ThemeManager();
    themeManager.startMusic();
    renderer = new Renderer(canvas);
    game = new Game(renderer);
    resizeCanvas();
    mainLoop();
  }

  // TODO call this to stop the game
  function stopGame() {
    localStorage['running'] = 0;
    let deathMenu = document.getElementById('death-menu');
    deathMenu.style.removeProperty('display');
    canvas = document.getElementById('the-game');
    canvas.classList.toggle('game-stopped');
    themeManager.stopMusic()
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
