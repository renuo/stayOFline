class BlockProgram extends Program {
  constructor(gl, vertexShaderId, fragmentShaderId) {
    super(gl, vertexShaderId, fragmentShaderId);
    this.bind(() => {
      this.uniformLocations = this.retrieveUniformLocations();
    });
  }

  retrieveUniformLocations() {
    return {
      projectionMatrix: this.getUniform('projectionMatrix'),
      modelMatrix: this.getUniform('modelMatrix'),
      viewMatrix: this.getUniform("viewMatrix"),
      lightPosition: this.getUniform('lightPosition'),
      lightColor: this.getUniform('lightColor'),
      normalMatrix: this.getUniform('normalMatrix')
    };
  }

  createNormalMatrix(modelMatrix, viewMatrix) {
    const modelViewMatrix = GLMath.matrix4MultiplyWithMatrix(viewMatrix, modelMatrix);
    let normalMatrix = GLMath.matrix4Inverse(modelViewMatrix);
    normalMatrix = GLMath.matrix4Transpose(normalMatrix);
    return GLMath.matrix4ConvertToMatrix3(normalMatrix);
  }

  updateUniforms(renderer, camera, model) {
    this.gl.uniformMatrix4fv(this.uniformLocations.projectionMatrix, false, renderer.projectionMatrix);
    this.gl.uniformMatrix4fv(this.uniformLocations.modelMatrix, false, model.transformationMatrix);
    this.gl.uniformMatrix4fv(this.uniformLocations.viewMatrix, false, camera.transformationMatrix);
    this.gl.uniform3f(this.uniformLocations.lightPosition, 0.0, 0.0, 0.0);
    this.gl.uniform3f(this.uniformLocations.lightColor, 1.0, 1.0, 1.0);
    this.gl.uniformMatrix3fv(this.uniformLocations.normalMatrix, false, this.createNormalMatrix(model.transformationMatrix, camera.transformationMatrix))
  }
}
