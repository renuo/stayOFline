class Buffer {
  constructor(gl, data) {
    this.gl = gl;
    this.data = data;
    this.buffer = this.gl.createBuffer();
    this.bind();
    this.gl.bufferData(this.gl.ARRAY_BUFFER, this.data, this.gl.STATIC_DRAW);
    this.unbind();
  }

  bind() {
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffer);
  };

  unbind() {
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
  };

  tearDown() {
    this.gl.deleteBuffer(this.buffer);
  };
}
