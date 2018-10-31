class KeyListener {
  constructor(world) {
    this.world = world;

    window.addEventListener('keydown', (event) => {
      const actionName =  this.keyMap[event.key];
      if(!actionName) { return; }

      this.actionMap[actionName]();
    });

    window.addEventListener('keyup', (event) => {
      const actionName =  this.keyMap[event.key];
      if(!actionName) { return; }

      if(actionName !== 'jump') {
        this.zeroedActionMap[actionName]();
      }
    })
  }

  get keyMap() {
    return {
      'w':          'forward',
      'a':          'left',
      's':          'backward',
      'd':          'right',
      'ArrowLeft':  'turnLeft',
      'ArrowRight': 'turnRight',
      'ArrowUp':    'shoot',
      ' ':          'jump'
    };
  }

  get actionMap() {
    return this.buildActionMap(1);
  }

  get zeroedActionMap() {
    return this.buildActionMap(0);
  }

  buildActionMap(directionFactor) {
    const vPlane = 0.1;
    const vRotation = 0.7;

    return {
      'forward':   () => this.move(-vPlane * directionFactor),
      'backward':  () => this.move(vPlane * directionFactor),
      'left':      () => this.strave(-vPlane * directionFactor),
      'right':     () => this.strave(vPlane * directionFactor),
      'turnLeft':  () => this.turn(vRotation * directionFactor),
      'turnRight': () => this.turn(-vRotation * directionFactor),
      'jump':      () => this.jump(0.45 * directionFactor),
    }
  }

  move(velocity) {
    this.world.player.v[2] = velocity;
  }

  strave(velocity) {
    this.world.player.v[0] = velocity;
  }

  turn(velocity) {
    this.world.player.rotationV[1] = velocity;
  }

  jump(velocity) {
    if (this.world.player.v[1] === 0) {
      this.world.player.v[1] = velocity;
    }
  }
}
