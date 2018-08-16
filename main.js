(function() {
  "use strict";

  var game, canvas, renderer;
  window.addEventListener('load', function() {
    canvas = document.getElementById('the-game');
    renderer = new Renderer(canvas);
    renderer.initialize();
    game = new Game(renderer);
    resizeCanvas();
    mainLoop();
  });

  window.addEventListener('resize', resizeCanvas);

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
