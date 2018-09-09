class GameManager {
  constructor(canvas) {
    this.canvas = canvas;
    this.renderer = new Renderer(this.canvas);
    this.themeManager = new ThemeManager();
  }

  startLevel(levelNumber) {
    this.canvas.classList.toggle('game-stopped');

    this.themeManager.startMusic();
    this.game = new GameSession(
      this.renderer,
      this.gameSuccessHandler.bind(this),
      this.gameFailureHandler.bind(this),
      levelNumber
    );
    this.resizeCanvas();
    this.mainLoop();
  }

  gameSuccessHandler() {
    let victoryMenu = document.getElementById('victory-menu');
    victoryMenu.style.removeProperty('display');
    this.canvas = document.getElementById('the-game');
    this.canvas.classList.toggle('game-stopped');
    this.themeManager.stopMusic();
    this.game.tearDown();
  }

  gameFailureHandler() {
    let deathMenu = document.getElementById('death-menu');
    deathMenu.style.removeProperty('display');
    this.canvas = document.getElementById('the-game');
    this.canvas.classList.toggle('game-stopped');
    this.themeManager.stopMusic();
    this.game.tearDown();
  }

  resizeCanvas() {
    const devicePixelRatio = window.devicePixelRatio || 1;
    this.canvas.width = window.innerWidth * devicePixelRatio;
    this.canvas.height = window.innerHeight * devicePixelRatio;
    this.renderer.resizeViewport();
  }

  mainLoop() {
    if (this.game.isRunning) {
      this.game.loop();
      requestAnimationFrame(this.mainLoop.bind(this));
    }
  }
}

let g;
window.addEventListener('resize', () => g.resizeCanvas());
window.onload = function () {
  localStorage.setItem('isTouch', ("ontouchstart" in document.documentElement) | 0);
  g = new GameManager(document.getElementById('the-game'));
};
