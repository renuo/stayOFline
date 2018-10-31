class GameSession {
  constructor(renderer, onSuccess, onFailure, levelNumber) {
    this.renderer = renderer;
    this.onSuccess = onSuccess;
    this.onFailure = onFailure;
    this.levelNumber = levelNumber; // TODO: select different level
    this.setupWorld();
    this.startTime = (new Date()).getTime();
    this.lastFrame = this.startTime;
    this.keylistener = new KeyListener();
    this.keylistener.setupControls(this.world);
    this.isRunning = true;
  }

  setupWorld() {
    this.program = new BlockProgram(this.renderer.gl, 'vertex-shader', 'fragment-shader');
    this.world = new World();
    this.world.light = new Light([10.0, 20.0, -20], [1.0, 0.005, 0.0004]);
    this.world.camera.position = [10.0, 10.0, 0.0];
    this.world.camera.offset[1] = 1.7;
    this.world.camera.offset[2] = 0.1;

    this.cubeGeometry = new CubeGeometry(this.renderer.gl, this.program);
    this.setupLevel();
    this.setupPlayer();
    this.setupGoal();
  }

  setupLevel() {
    const level = new LevelGenerator(this.cubeGeometry);
    level.allBlocks.forEach(block => this.world.models.push(block));
  }

  setupGoal() {
    this.goalPosition = [10, 0, -49];

    const tintColor = [...Colors.green, 0.6];
    const goalDoor = [
       new Block(this.cubeGeometry, 1, 1, 1, [2, 0.5, 0], tintColor),
       new Block(this.cubeGeometry, 1, 1, 1, [-2, 0.5, 0], tintColor),
       new Block(this.cubeGeometry, 0.7, 3, 0.7, [2, 2.5, 0], tintColor),
       new Block(this.cubeGeometry, 0.7, 3, 0.7, [-2, 2.5, 0], tintColor),
       new Block(this.cubeGeometry, 1, 0.5, 1, [2, 4.25, 0], tintColor),
       new Block(this.cubeGeometry, 1, 0.5, 1, [-2, 4.25, 0], tintColor),
       new Block(this.cubeGeometry, 5.5, 0.5, 2, [0, 4.5, 0], tintColor),
    ];

    goalDoor.forEach(block => block.position = VMath.vectorAdd(this.goalPosition, block.position));
    this.world.goal = goalDoor;
  }

  setupPlayer() {
    this.player = this.world.player;
  }

  loop() {
    const currentTime = new Date().getTime();
    this.update(currentTime - this.startTime, currentTime - this.lastFrame);
    this.lastFrame = currentTime;

    if (!this.isRunning)
      return;

    this.drawFrame();
  };

  drawFrame() {
    this.renderer.renderRequest(context => {
      context.withEnvironment(this.world.camera, this.world.light, this.world.ambientLightColor, () => {
        context.withGeometryAndProgram(this.cubeGeometry, this.program, () => {
          context.render(this.world.models);
          context.render(this.world.goal);
        });
      });
    });
  }

  update(timePassedMs, msTimePassedSinceUpdate) {
    debug(this.player.position);
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
    this.cubeGeometry.tearDown();
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
    const vz = -6;
    this.player.v[2] = vz * dt;
  }

  updatePlayerGravity(dt) {
    const g = -9.81 / 8.5;
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

    let nextPosition = VMath.vectorAdd(position, this.player.v);

    if (this.world.inAnyModel(nextPosition)) {
      const nextInX = [nextPosition[0], position[1], position[2]];
      if (this.world.inAnyModel(nextInX)) {
        this.player.v[0] = VMath.vectorSub(interpolateCollisionPoint(position, nextInX), position)[0];
      }

      const nextInY = [position[0], nextPosition[1], position[2]];
      if (this.world.inAnyModel(nextInY)) {
        this.player.v[1] = VMath.vectorSub(interpolateCollisionPoint(position, nextInY), position)[1];
      }

      const nextInZ = [position[0], position[1], nextPosition[2]];
      if (this.world.inAnyModel(nextInZ)) {
        this.player.v[2] = VMath.vectorSub(interpolateCollisionPoint(position, nextInZ), position)[2];
      }
    }

    this.player.position = VMath.vectorAdd(position, this.player.v);
  }
}
