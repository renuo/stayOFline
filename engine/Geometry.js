class Geometry {
  constructor(gl, program, vertices, normals, indices, textureCoordinates) {
    this.gl = gl;
    this.program = program;
    this.verticesBuffer = new VerticesBuffer(gl, vertices);
    this.normalsBuffer = new NormalsBuffer(gl, normals);
    this.indicesBuffer = new IndicesBuffer(gl, indices);
    this.textureCoordinatesBuffer = new TextureCoordinatesBuffer(gl, textureCoordinates);
    this._describeBufferLayout();
  }

  bind(lambda) {
    this.verticesBuffer.bind();
    this.textureCoordinatesBuffer.bind();
    this.indicesBuffer.bind();

    if (lambda) {
      lambda();
      this.unbind();
    }
  }

  unbind() {
    this.verticesBuffer.unbind();
    this.textureCoordinatesBuffer.unbind();
    this.indicesBuffer.unbind();
  }

  _describeBufferLayout() {
    this.verticesBuffer.bind(() => {
      this._describeVertexBufferLayout();
    });

    this.normalsBuffer.bind(() => {
      this._describeNormalsBufferLayout();
    });

    this.textureCoordinatesBuffer.bind(() => {
      this._describeTextureCoordinatesBufferLayout();
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
  
  _describeTextureCoordinatesBufferLayout() {
    const textureCoordinatesLocation = this.gl.getAttribLocation(this.program.program, 'textureCoordinates');
    this.gl.vertexAttribPointer(textureCoordinatesLocation, this.textureCoordinatesBuffer.itemSize, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(textureCoordinatesLocation);
  }

  tearDown() {
    this.verticesBuffer.tearDown();
    this.indicesBuffer.tearDown();
    this.normalsBuffer.tearDown();
  };
}
