class RenderingContext {
  constructor(renderer) {
    this.renderer = renderer;
  }

  withGeometryAndProgram(geometry, program, callback) {
    this._geometry = geometry;
    this._program = program;
    this._geometry.bind(() => {
      this._program.bind(() => {
        callback();
      });
    });
  };

  withEnvironment(camera, light, ambientLightColor, callback) {
    this._camera = camera;
    this._light = light;
    this._ambientLightColor = ambientLightColor;
    callback();
  };

  render(models) {
    models.forEach(model => {
      this._program.updateUniforms(this.renderer, model, this._camera, this._light, this._ambientLightColor);
      this.renderer.renderPrimitive(this._geometry.indicesBuffer.itemCount);
    });
  }
}
