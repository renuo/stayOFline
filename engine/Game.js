class Game {
  constructor(renderer) {
    this.renderer = renderer;
  }

  loop() {
    this.update();
    this.renderer.render();
  };

  update() {
    // game state change happens here
  }
}
