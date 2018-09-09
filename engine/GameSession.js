class GameSession {
  constructor(renderer, onSuccess, onFailure, levelNumber) {
    this.renderer = renderer;
    this.setupWorld();
    this.startTime = (new Date()).getTime();
    this.lastFrame = this.startTime;
    this.keylistener = new KeyListener();
    this.keylistener.setupControls(this.world);
    this.onSuccess = onSuccess;
    this.onFailure = onFailure;
    this.isRunning = true;
    this.levelNumber = levelNumber;
  }

  setupWorld() {
    this.program = new BlockProgram(this.renderer.gl, 'vertex-shader', 'fragment-shader');
    this.world = new World();
    this.world.light = new Light([10.0, 20.0, -20], [0.6, 0.002, 0.00005]);
    this.world.camera.position = [10.0, 10.0, 0.0];
    this.world.camera.offset[1] = 1.7;
    this.world.camera.offset[2] = 0.1;

    this.cubeGeometry = new CubeGeometry(this.renderer.gl, this.program);
    this.setupLevel();
    this.setupPlayer();
    this.setupGoal();
  }

  setupLevel() {
    const level = new LevelGenerator(20, this.cubeGeometry, this.levelNumber);
    for (let z = 0; z < 50; z++) {
      level.produceGridLine().filter(b => b).forEach(block => this.world.models.push(block));
    }
  }

  setupGoal() {
    this.goalPosition = [10, 0, -49];

    const goalDoor = [
       new Block(this.cubeGeometry, 1, 1, 1, [2, 0.5, 0]),
       new Block(this.cubeGeometry, 1, 1, 1, [-2, 0.5, 0]),
       new Block(this.cubeGeometry, 0.7, 3, 0.7, [2, 2.5, 0], Colors.green),
       new Block(this.cubeGeometry, 0.7, 3, 0.7, [-2, 2.5, 0]),
       new Block(this.cubeGeometry, 1, 0.5, 1, [2, 4.25, 0]),
       new Block(this.cubeGeometry, 1, 0.5, 1, [-2, 4.25, 0]),
       new Block(this.cubeGeometry, 5.5, 0.5, 2, [0, 4.5, 0]),
    ];

    goalDoor.forEach(block => block.position = VMath.vectorAdd(this.goalPosition, block.position));
    goalDoor.forEach(block => this.world.models.push(block));
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
    this.checkGameState();

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

  checkGameState() {
    if (VMath.vectorDistance(this.goalPosition, this.player.position) < 3) {
      this.onSuccess();
      this.isRunning = false;
    }

    if (this.player.position[1] < -10) {
      this.onFailure();
      this.isRunning = false;
    }
  }

  updatePlayerMovement(dt) {
    const vz = -5;
    this.player.v[2] = vz * dt;
  }

  updatePlayerGravity(dt) {
    const g = -9.81 / 5;
    this.player.v[1] += g * dt;
  }

  updatePlayerPosition(dt) {
    const position = this.player.position;

    if (this.world.inAnyModel(position)) {
      console.log('You\'re in a wall… WAT?');
      // TODO: correct position
      return;
    }

    let iterations = 0;
    const interpolateCollisionPoint = (a, b) => {
      if (iterations++ >= 2) return a;

      let intermediate = VMath.vectorAdd(a, b).map(x => x/2);
      if (this.world.inAnyModel(intermediate)) {
        return interpolateCollisionPoint(a, intermediate)
      } else {
        return interpolateCollisionPoint(intermediate, b)
      }
    };

    let next_position = VMath.vectorAdd(position, this.player.v);

    if (this.world.inAnyModel(next_position)) {
      const next_in_x = [next_position[0], position[1], position[2]];
      if (this.world.inAnyModel(next_in_x)) {
        this.player.v[0] = VMath.vectorSub(interpolateCollisionPoint(position, next_in_x), position)[0];
      }

      const next_in_y = [position[0], next_position[1], position[2]];
      if (this.world.inAnyModel(next_in_y)) {
        this.player.v[1] = VMath.vectorSub(interpolateCollisionPoint(position, next_in_y), position)[1];
      }

      const next_in_z = [position[0], position[1], next_position[2]];
      if (this.world.inAnyModel(next_in_z)) {
        this.player.v[2] = VMath.vectorSub(interpolateCollisionPoint(position, next_in_z), position)[2];
      }
    }

    this.player.position = VMath.vectorAdd(position, this.player.v);
  }
}
