class Game {
  constructor(renderer) {
    this.renderer = renderer;
    this.setupWorld();
    this.startTime = (new Date()).getTime();
    this.lastFrame = this.startTime;
    this.keylistener = new KeyListener();
    this.keylistener.setupControls(this.world);
  }

  setupWorld() {
    this.program = new BlockProgram(this.renderer.gl, 'vertex-shader', 'fragment-shader');
    this.world = new World();
    this.world.light = new Light([-7.0, 1.0, 2]);

    this.setupModels();
  }

  setupModels() {
    const blockGeometry = new CubeGeometry(this.renderer.gl, this.program);
    const level = new LevelGenerator(20, blockGeometry);
    for (let z = 0; z < 50; z++) {
      level.nextLine().filter(b => b).forEach(block => this.world.models.push(block));
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
    const progress = timePassed * 8 * Math.PI * (1 / 60000); // = 4rpm
    // this.world.models.forEach(model => {
    //   model.rotation = [0, progress, 0];
    // });

    //this.world.camera.moveZ(timePassedSinceUpdate / 5000);
  }

  tearDown() {
    this.program.tearDown();
    //this.model.geometry.tearDown();
  }
}
