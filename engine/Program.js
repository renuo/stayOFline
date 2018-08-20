class Program {
  constructor(gl, vertexShaderId, fragmentShaderId) {
    this.gl = gl;
    this.vertexShader = createShader(gl, vertexShaderId);
    this.fragmentShader = createShader(gl, fragmentShaderId);
    this.program = this.gl.createProgram();
    this.setupProgram();
  }

  bind() {
    this.gl.useProgram(this.program);
  };

  unbind() {
    this.gl.useProgram(null);
  };

  tearDown() {
    this.gl.deleteProgram(this.program);
    this.gl.deleteShader(this.vertexShader);
    this.gl.deleteShader(this.fragmentShader);
  };

  setupProgram() {
    this.gl.attachShader(this.program, this.vertexShader);
    this.gl.attachShader(this.program, this.fragmentShader);
    this.gl.linkProgram(this.program);

    if (!this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS)) {
      const programLog = this.gl.getProgramInfoLog(this.program);
      this.tearDown();
      throw new Error(programLog);
    }
  }
}
