class Game {
  constructor(renderer) {
    debug('Use wasdrf to move');
    this.renderer = renderer;
    this.setupWorld();
    this.startTime = (new Date()).getTime();
    this.lastFrame = this.startTime;
    this.setupControls();
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
      level.nextLine().forEach(block => this.world.models.push(block));
    }
  }

  setupControls() {
    window.addEventListener('keydown', (event) => {
      const v = 0.1;
      const mapping = {
        w: [0, 0, -v],
        s: [0, 0, v],
        a: [-v, 0, 0],
        d: [v, 0, 0],
        r: [0, v, 0],
        f: [0, -v, 0]
      };

      if (mapping[event.key] === undefined) return;
      this.world.camera.translate(mapping[event.key]);
      debug(this.world.camera.transformationMatrix);
    });
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
