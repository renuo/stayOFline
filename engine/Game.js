class Game {
  constructor(renderer) {
    this.renderer = renderer;
    this.program = new Program(renderer.gl, 'vertex-shader', 'fragment-shader');
    this.glifyMesh = meshFactory(renderer.gl, this.program);
    this.setupWorld();
    this.startTime = (new Date()).getTime();
    this.lastFrame = this.startTime;
  }

  setupWorld() {
    this.camera = new Camera();
    this.mesh = this.glifyMesh(new Cuboid(2, 2, 2));

    this.level = new Level(20, 100);
    this.level_meshes = this.level.meshables.map(m => this.glifyMesh(m));
  }

  loop() {
    const currentTime = new Date().getTime();
    this.update(currentTime - this.startTime, currentTime - this.lastFrame);
    this.lastFrame = currentTime;

    this.renderer.prepareRendering();
    this.renderer.render(this.mesh, this.camera);
    this.level_meshes.forEach(m => this.renderer.render(m, this.camera))
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
    this.level_meshes.forEach(m => m.tearDown());
  }
}
