class Game {
  constructor(renderer) {
    this.renderer = renderer;
    this.setupWorld();
    this.startTime = (new Date()).getTime();
    this.lastFrame = this.startTime;
  }

  setupWorld() {
    this.program = new BlockProgram(this.renderer.gl, 'vertex-shader', 'fragment-shader');
    this.camera = new Camera();

    const blockGeometry = new CubeGeometry(this.renderer.gl, this.program);
    this.models = [];
    for (let i = 0; i < 100; i++) {
      const factor = 10;
      const factor2 = factor / 2;
      this.models.push(new Block(blockGeometry, 1, 1, 1, [(Math.random() * factor) - factor2, (Math.random() * factor) - factor2, (Math.random() * factor) - factor2]));
    }
  }

  loop() {
    const currentTime = new Date().getTime();
    this.update(currentTime - this.startTime, currentTime - this.lastFrame);
    this.lastFrame = currentTime;

    this.renderer.prepareRendering();
    this.models.forEach(model => {
      this.renderer.render(model, this.program, this.camera);
    });
  };

  update(timePassed, timePassedSinceUpdate) {
    // game state change happens here
    const progress = timePassed * 8 * Math.PI * (1/60000); // = 4rpm
    this.models.forEach(model => {
      model.rotation = [0, progress, 0];
    });

    this.camera.moveZ(timePassedSinceUpdate / 5000);
  }

  tearDown() {
    this.program.tearDown();
    //this.model.geometry.tearDown();
  }
}
