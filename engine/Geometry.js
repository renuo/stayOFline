class Geometry {
  constructor(gl, program, vertices, normals, indices) {
    this.gl = gl;
    this.program = program;
    this.verticesBuffer = new VerticesBuffer(gl, vertices);
    this.normalsBuffer = new NormalsBuffer(gl, normals);
    this.indicesBuffer = new IndicesBuffer(gl, indices);
    this._describeBufferLayout();
  }

  bind(lamda) {
    this.verticesBuffer.bind();
    this.indicesBuffer.bind();

    if (lamda) {
      lamda();
      this.unbind();
    }
  }

  unbind() {
    this.verticesBuffer.unbind();
    this.indicesBuffer.unbind();
  }

  _describeBufferLayout() {
    this.verticesBuffer.bind(() => {
      this._describeVertexBufferLayout();
    });

    this.normalsBuffer.bind(() => {
      this._describeNormalsBufferLayout();
    });
  }

  _describeVertexBufferLayout() {
    const verticesLocation = this.gl.getAttribLocation(this.program.program, 'vertices');
    this.gl.vertexAttribPointer(verticesLocation, this.verticesBuffer.itemSize, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(verticesLocation);
  }

  _describeNormalsBufferLayout() {
    const normalsLocation = this.gl.getAttribLocation(this.program.program, 'normals');
    this.gl.vertexAttribPointer(normalsLocation, this.normalsBuffer.itemSize, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(normalsLocation);
  }

  tearDown() {
    this.verticesBuffer.tearDown();
    this.indicesBuffer.tearDown();
    this.normalsBuffer.tearDown();
  };
}
