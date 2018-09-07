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
    this.world.light = new Light([10.0, 20.0, -20], [0.6, 0.002, 0.00005]);
    this.world.camera.position = [10.0, 10.0, 0.0];
    this.world.camera.offset[1] = 2.5;

    this.cubeGeometry = new CubeGeometry(this.renderer.gl, this.program);
    this.setupModels();
    this.setupPlayer();
    this.setupGoal();
  }

  setupModels() {
    const level = new LevelGenerator(20, this.cubeGeometry);
    for (let z = 0; z < 50; z++) {
      level.produceGridLine().filter(b => b).forEach(block => this.world.models.push(block));
    }
  }

  setupGoal() {
    const flagBlocks = [
      new Block(this.cubeGeometry, 1, 4, 1, [10, 3.5, -49]),
      new Block(this.cubeGeometry, 2, 1, 2, [10, 4, -49], Colors.green),
      new Block(this.cubeGeometry, 1.5, 1.5, 1.5, [10, 4, -49]),
      new Block(this.cubeGeometry, 10, 2, 2, [10, 2, -30])
    ];
    flagBlocks.forEach(block => this.world.models.push(block));
  }

  setupPlayer() {
    this.player = this.world.player;
  }

  loop() {
    const currentTime = new Date().getTime();
    this.update(currentTime - this.startTime, currentTime - this.lastFrame);
    this.lastFrame = currentTime;

    this.renderer.prepareRendering();
    this.renderer.render(this.world.models, this.program, this.world.camera, this.world.light);
  };

  update(timePassedMs, msTimePassedSinceUpdate) {
    this.checkVictory();

    this.world.light.position = this.world.camera.positionVector;
    this.world.light.position[1] += 1.5;

    const secondsPassedSinceUpdate = msTimePassedSinceUpdate / 1000;
    this.updatePlayerMovement(secondsPassedSinceUpdate);
    this.updatePlayerGravity(secondsPassedSinceUpdate);
    this.updatePlayerPosition(secondsPassedSinceUpdate);
  }

  tearDown() {
    this.program.tearDown();
    //this.model.geometry.tearDown();
  }

  checkVictory() {

  }

  updatePlayerMovement(dt) {
    const vz = -2;
    this.player.v[2] = vz * dt;
  }

  updatePlayerGravity(dt) {
    const g = -9.81 / 5;
    const vy = g * dt;
    this.player.v[1] += vy;
  }

  updatePlayerPosition(dt) {
    if (this.world.inAnyModel(this.player.position)) {
      console.log('You\'re in a wall… WAT?');
      return;
    }

    const vectorAdd = (a, b) => a.map((memo, i) => memo + b[i]); // TODO: where to put this?
    let next_position = vectorAdd(this.player.position, this.player.v);

    const minAboveGroundConstraint = 0.0;

    // correct next position on collision
    if (this.world.inAnyModel(next_position)) {
      if (this.world.aboveGround(next_position) > minAboveGroundConstraint) {
        // wall proximity
        this.player.v[0] = 0;
        this.player.v[2] = 0;
      } else {
        // floor collision imminent
        const mAboveGround = this.world.aboveGround(this.player.position);
        this.player.v[1] = minAboveGroundConstraint - Math.floor(mAboveGround*1000)/1000;
      }
      next_position = vectorAdd(this.player.position, this.player.v);
    }

    this.player.position = next_position;
  }
}
