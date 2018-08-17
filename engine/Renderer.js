class Renderer {
  constructor(canvas) {
    this.canvas = canvas;

    this.setupWebGLContext();
    this.resizeViewport();
    this.setupWorld();
  }

  setupWebGLContext() {
    this.gl = this.canvas.getContext('webgl') || this.canvas.getContext('experimental-webgl');

    if (!this.gl) {
      throw new Error("WebGL must be supported in order to run this game!");
    }
  }

  resizeViewport() {
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    this.gl.colorMask(true, true, true, true);
  };

  setupWorld() {
    const vertexShader = new Shader(this.gl, 'vertex-shader');
    const fragmentShader = new Shader(this.gl, 'fragment-shader');
    this.program = new Program(this.gl, vertexShader.shader, fragmentShader.shader);

    this.mesh = new Mesh(this.gl, this.program, new Buffer(this.gl, new Float32Array([
      -1.0, -1.0, 0.0,
      0.0,  1.0, 0.0,
      1.0, -1.0, 0.0
    ])));
  }

  render() {
    this.gl.clearColor(1.0, 1.0, 1.0, 1.0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

    this.program.bind();
    this.mesh.bind();
    this.gl.drawArrays(this.gl.TRIANGLES, 0, 3);
  };
}
