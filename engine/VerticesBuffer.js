class VerticesBuffer extends Buffer {
  constructor(gl, data) {
    super(gl, data);
    this.itemSize = 3;
    this.itemCount = data.length / this.itemSize;
  }
}
