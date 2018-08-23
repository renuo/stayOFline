const cubeVertices = new Float32Array([
  -1.0, -1.0,  1.0,
  1.0, -1.0,  1.0,
  1.0,  1.0,  1.0,
  -1.0,  1.0,  1.0,

  -1.0, -1.0, -1.0,
  -1.0,  1.0, -1.0,
  1.0,  1.0, -1.0,
  1.0, -1.0, -1.0,

  -1.0,  1.0, -1.0,
  -1.0,  1.0,  1.0,
  1.0,  1.0,  1.0,
  1.0,  1.0, -1.0,

  -1.0, -1.0, -1.0,
  1.0, -1.0, -1.0,
  1.0, -1.0,  1.0,
  -1.0, -1.0,  1.0,

  1.0, -1.0, -1.0,
  1.0,  1.0, -1.0,
  1.0,  1.0,  1.0,
  1.0, -1.0,  1.0,

  -1.0, -1.0, -1.0,
  -1.0, -1.0,  1.0,
  -1.0,  1.0,  1.0,
  -1.0,  1.0, -1.0
]);

const cubeIndices = new Uint8Array([
  0, 1, 2,      0, 2, 3,
  4, 5, 6,      4, 6, 7,
  8, 9, 10,     8, 10, 11,
  12, 13, 14,   12, 14, 15,
  16, 17, 18,   16, 18, 19,
  20, 21, 22,   20, 22, 23
]);

const cubeNormals = new Float32Array([
   0.0,  0.0,  1.0,
   0.0,  0.0,  1.0,
   0.0,  0.0,  1.0,
   0.0,  0.0,  1.0,

   0.0,  0.0, -1.0,
   0.0,  0.0, -1.0,
   0.0,  0.0, -1.0,
   0.0,  0.0, -1.0,

   0.0,  1.0,  0.0,
   0.0,  1.0,  0.0,
   0.0,  1.0,  0.0,
   0.0,  1.0,  0.0,

   0.0, -1.0,  0.0,
   0.0, -1.0,  0.0,
   0.0, -1.0,  0.0,
   0.0, -1.0,  0.0,

   1.0,  0.0,  0.0,
   1.0,  0.0,  0.0,
   1.0,  0.0,  0.0,
   1.0,  0.0,  0.0,

  -1.0,  0.0,  0.0,
  -1.0,  0.0,  0.0,
  -1.0,  0.0,  0.0,
  -1.0,  0.0,  0.0
]);

class Cube extends Mesh {
  constructor(gl, program) {
    const verticesBuffer = new VerticesBuffer(gl, cubeVertices);
    const indicesBuffer = new IndicesBuffer(gl, cubeIndices);
    const normalsBuffer = new NormalsBuffer(gl, cubeNormals);
    super(gl, program, verticesBuffer, indicesBuffer, normalsBuffer);
  }

  retrieveUniformLocations() {
    return {
      ...super.retrieveUniformLocations(),
      lightPosition: this.getUniform('lightPosition'),
      lightColor: this.getUniform('lightColor'),
      normalMatrix: this.getUniform('normalMatrix')
    }
  }

  createNormalMatrix(modelMatrix, viewMatrix) {
    const modelViewMatrix = GLMath.matrix4MultiplyWithMatrix(viewMatrix, modelMatrix);
    let normalMatrix = GLMath.matrix4Inverse(modelViewMatrix);
    normalMatrix = GLMath.matrix4Transpose(normalMatrix);
    return GLMath.matrix4ConvertToMatrix3(normalMatrix);
  }

  updateUniforms(renderer, camera) {
    super.updateUniforms(renderer, camera);
    this.gl.uniform3f(this.uniformLocations.lightPosition, 0.0, 0.0, 0.0);
    this.gl.uniform3f(this.uniformLocations.lightColor, 1.0, 1.0, 1.0);
    this.gl.uniformMatrix3fv(this.uniformLocations.normalMatrix, false, this.createNormalMatrix(this.transformationMatrix, camera.transformationMatrix))
  }
}
