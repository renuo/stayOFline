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
      viewMatrix: this.getUniform('viewMatrix'),
      normalMatrix: this.getUniform('normalMatrix'),
      lightPosition: this.getUniform('lightPosition'),
      lightColor: this.getUniform('lightColor'),
      lightAttenuation: this.getUniform('lightAttenuation'),
      modelColor: this.getUniform('modelColor')
    };
  }

  createNormalMatrix(modelMatrix, viewMatrix) {
    const modelViewMatrix = GLMath.matrix4MultiplyWithMatrix(viewMatrix, modelMatrix);
    let normalMatrix = GLMath.matrix4Inverse(modelViewMatrix);
    return GLMath.matrix4ConvertToMatrix3(GLMath.matrix4Transpose(normalMatrix));
  }

  updateUniforms(renderer, model, camera, light) {
    this.gl.uniformMatrix4fv(this.uniformLocations.projectionMatrix, false, renderer.projectionMatrix);
    this.gl.uniformMatrix4fv(this.uniformLocations.modelMatrix, false, model.transformationMatrix);
    this.gl.uniformMatrix4fv(this.uniformLocations.viewMatrix, false, camera.transformationMatrix);
    this.gl.uniform3fv(this.uniformLocations.lightPosition, new Float32Array(light.position));
    this.gl.uniform3fv(this.uniformLocations.lightAttenuation, new Float32Array(light.attenuation));
    this.gl.uniform3fv(this.uniformLocations.lightColor, new Float32Array(light.color));
    this.gl.uniform3fv(this.uniformLocations.modelColor, new Float32Array(model.color));
    this.gl.uniformMatrix3fv(this.uniformLocations.normalMatrix, false, this.createNormalMatrix(model.transformationMatrix, camera.transformationMatrix));
  }
}
