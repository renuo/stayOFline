class Mesh {
  constructor(gl, program, verticesBuffer, indicesBuffer, normalsBuffer) {
    this.gl = gl;
    this.verticesBuffer = verticesBuffer;
    this.indicesBuffer = indicesBuffer;
    this.normalsBuffer = normalsBuffer;
    this.program = program;
    this.transformationMatrix = GLMath.matrix4();

    this.program.bind(() => {
      this.uniformLocations = this.retrieveUniformLocations();
      this.describeBufferLayout();
    });
  }

  describeBufferLayout() {
    this.verticesBuffer.bind(() => {
      this.describeVertexBufferLayout();
    });

    this.normalsBuffer.bind(() => {
      this.describeNormalsBufferLayout();
    });
  }

  describeVertexBufferLayout() {
    const verticesLocation = this.gl.getAttribLocation(this.program.program, 'vertices');
    this.gl.vertexAttribPointer(verticesLocation, this.verticesBuffer.itemSize, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(verticesLocation);
  }

  describeNormalsBufferLayout() {
    const normalsLocation = this.gl.getAttribLocation(this.program.program, 'normals');
    this.gl.vertexAttribPointer(normalsLocation, this.normalsBuffer.itemSize, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(normalsLocation);
  }

  retrieveUniformLocations() {
    // To be appended when overwriting
    return {
      projectionMatrix: this.getUniform("projectionMatrix"),
      modelMatrix: this.getUniform("modelMatrix"),
      viewMatrix: this.getUniform("viewMatrix")
    };
  }

  getUniform(name) {
    return this.gl.getUniformLocation(this.program.program, name);
  }

  updateUniforms(renderer, camera) {
    // To be overwritten
    this.gl.uniformMatrix4fv(this.uniformLocations.projectionMatrix, false, renderer.projectionMatrix);
    this.gl.uniformMatrix4fv(this.uniformLocations.modelMatrix, false, this.transformationMatrix);
    this.gl.uniformMatrix4fv(this.uniformLocations.viewMatrix, false, camera.transformationMatrix);
  }

  bind(block) {
    this.indicesBuffer.bind();

    if (block) {
      block();
      this.unbind();
    }
  };

  unbind() {
    this.indicesBuffer.unbind();
  };

  tearDown() {
    this.verticesBuffer.tearDown();
    this.indicesBuffer.tearDown();
  };
}
