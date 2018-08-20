class Mesh {
  constructor(gl, program, buffer) {
    this.buffer = buffer;

    program.bind();
    this.bind();

    const verticesLocation = gl.getAttribLocation(program.program, 'vertices');
    gl.vertexAttribPointer(verticesLocation, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(verticesLocation);

    this.unbind();
    program.unbind();
  }

  bind() {
    this.buffer.bind();
  };

  unbind() {
    this.buffer.unbind();
  };

  tearDown() {
    this.buffer.tearDown();
  };
}
