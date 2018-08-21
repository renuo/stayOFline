class NormalsBuffer extends Buffer {
  constructor(gl, data) {
    super(gl, data, gl.ARRAY_BUFFER);
    this.itemSize = 3;
    this.itemCount = data.length / this.itemSize;
  }
}
