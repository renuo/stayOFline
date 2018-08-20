class IndicesBuffer extends Buffer {
  constructor(gl, data) {
    super(gl, data, gl.ELEMENT_ARRAY_BUFFER);
    this.itemSize = 1;
    this.itemCount = data.length;
  }
}
