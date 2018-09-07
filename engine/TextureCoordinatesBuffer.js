class TextureCoordinatesBuffer extends Buffer {
  constructor(gl, data) {
    super(gl, data);
    this.itemSize = 2;
    this.itemCount = data.length / this.itemSize;
  }
}
