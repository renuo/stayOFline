class Buffer {
  constructor(gl, data, type) {
    this.gl = gl;
    this.buffer = this.gl.createBuffer();
    this.type = type || this.gl.ARRAY_BUFFER;

    this.bind(() => {
      this.gl.bufferData(this.type, data, this.gl.STATIC_DRAW);
    });
  }

  bind(block) {
    this.gl.bindBuffer(this.type, this.buffer);

    if (block) {
      block();
      this.unbind();
    }
  };

  unbind() {
    this.gl.bindBuffer(this.type, null);
  };

  tearDown() {
    this.gl.deleteBuffer(this.buffer);
  };
}
