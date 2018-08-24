class Renderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.projectionMatrix = GLMath.matrix4Identity();

    this.setupWebGLContext();
    this.resizeViewport();
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
    this.projectionMatrix = GLMath.projectionMatrix(30, 0.1, 1000, this.canvas.height / this.canvas.width);
  };

  prepareRendering() {
    this.gl.clearColor(1.0, 1.0, 1.0, 1.0);
    this.gl.clearDepth(1.0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.depthFunc(this.gl.LESS);
  }

  render(model, program, camera, light) {
    program.bind(() => {
      model.geometry.bind(() => {
        program.updateUniforms(this, camera, model, light);
        this.gl.drawElements(this.gl.TRIANGLES, model.geometry.indicesBuffer.itemCount, this.gl.UNSIGNED_BYTE, 0);
      });
    });
  };
}
