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
    this.world.camera.position = [10.0, 2.0, -1.0];

    this.setupModels();
    this.setupPlayer();
  }

  setupModels() {
    const blockGeometry = new CubeGeometry(this.renderer.gl, this.program);
    const level = new LevelGenerator(20, blockGeometry);
    for (let z = 0; z < 50; z++) {
      level.nextLine().filter(b => b).forEach(block => this.world.models.push(block));
    }
  }

  setupPlayer() {
    this.player = this.world.camera;
    this.player.v = [0, 0, 0];
  }

  loop() {
    const currentTime = new Date().getTime();
    this.update(currentTime - this.startTime, currentTime - this.lastFrame);
    this.lastFrame = currentTime;

    this.renderer.prepareRendering();
    this.renderer.render(this.world.models, this.program, this.world.camera, this.world.light);
  };

  update(timePassedMs, timePassedSinceUpdateMs) {
    this.updatePlayerGravity(timePassedSinceUpdateMs);
  }

  tearDown() {
    this.program.tearDown();
    //this.model.geometry.tearDown();
  }

  updatePlayerGravity(timePassedSinceUpdateMs) {
    const vectorAdd = (a, b) => a.map((memo, i) => memo + b[i]); // TODO: where to put this?

    const g = -9.81;
    const dt = (timePassedSinceUpdateMs / 1000);
    const dv = g * dt;

    this.player.v[1] += dv;
    const next_position = vectorAdd(this.player.position, this.player.v);

    const mAboveGround = this.world.aboveGround(this.player.position);
    const minAboveGroundConstraint = 0.1;
    //console.log(`${mAboveGround}m above ground`);

    if (mAboveGround > minAboveGroundConstraint) {
      if (this.world.aboveGround(next_position) > minAboveGroundConstraint) {
        this.player.position = next_position; // falling
      } else {
        this.player.v[1] = 0; // regular collision
        this.player.moveY(minAboveGroundConstraint - Math.floor(mAboveGround*1000)/1000);
      }
    } else {
      if (this.world.inAnyModel(this.player.position)) {
        console.log('You\'re in a wall… WAT?');
        // TODO: handle error
      } else if (this.world.inAnyModel(next_position)) {
        console.log('You\'re walking into a wall');
        // TODO: handle collision
      } else {
        console.log('You\'re falling into the nether!')
        this.player.position = next_position;
      }
    }
  }
}
