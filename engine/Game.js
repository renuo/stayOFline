class Game {
  constructor(renderer) {
    this.renderer = renderer;
    this.setupWorld();
    this.startTime = (new Date()).getTime();
    this.lastFrame = this.startTime;
  }

  setupWorld() {
    this.program = new BlockProgram(this.renderer.gl, 'vertex-shader', 'fragment-shader');
    this.world = new World();
    this.world.light = new Light([0.0, 1.0, -1.0]);

    this.setupModels();
  }

  setupModels() {
    const blockGeometry = new CubeGeometry(this.renderer.gl, this.program);
    for (let i = 0; i < 100; i++) {
      const factor = 10;
      const factor2 = factor / 2;
      this.world.models.push(new Block(blockGeometry, 1, 1, 1, [(Math.random() * factor) - factor2, (Math.random() * factor) - factor2, (Math.random() * factor) - factor2]));
    }
  }

  loop() {
    const currentTime = new Date().getTime();
    this.update(currentTime - this.startTime, currentTime - this.lastFrame);
    this.lastFrame = currentTime;

    this.renderer.prepareRendering();
    this.world.models.forEach(model => {
      this.renderer.render(model, this.program, this.world.camera, this.world.light);
    });
  };

  update(timePassed, timePassedSinceUpdate) {
    // game state change happens here
    const progress = timePassed * 8 * Math.PI * (1/60000); // = 4rpm
    this.world.models.forEach(model => {
      model.rotation = [0, progress, 0];
    });

    this.world.camera.moveZ(timePassedSinceUpdate / 5000);
  }

  tearDown() {
    this.program.tearDown();
    //this.model.geometry.tearDown();
  }
}
