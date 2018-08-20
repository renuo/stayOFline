class Game {
  constructor(renderer) {
    this.renderer = renderer;
    this.setupWorld();
    this.startTime = (new Date()).getTime();
    this.lastFrame = this.startTime;
  }

  setupWorld() {
    this.program = new Program(this.renderer.gl, 'vertex-shader', 'fragment-shader');
    this.camera = new Camera();
    this.mesh = new Cube(this.renderer.gl, this.program);
  }

  loop() {
    const currentTime = new Date().getTime();
    this.update(currentTime - this.startTime, currentTime - this.lastFrame);
    this.lastFrame = currentTime;

    this.renderer.prepareRendering();
    this.renderer.render(this.mesh, this.camera);
  };

  update(timePassed, timePassedSinceUpdate) {
    // game state change happens here
    const transformation = GLMath.matrix4Translate(GLMath.matrix4Identity(), [0, 0, -3]);
    const progress = timePassed * 8 * Math.PI * (1/60000); // = 4rpm
    this.mesh.transformationMatrix = GLMath.matrix4Rotate(transformation, progress, [0, 1, 0]);

    this.camera.moveZ(timePassedSinceUpdate / 5000);
  }

  tearDown() {
    this.program.tearDown();
    this.mesh.tearDown();
  }
}
