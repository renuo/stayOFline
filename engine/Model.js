class Model {
  constructor(geometry) {
    this.geometry = geometry;
    this.position = [0, 0, 0];
    this.scale = [0, 0, 0];
    this.rotation = [0, 0, 0];
    this.tintColor = Colors.rgba.transparent;
  }

  get transformationMatrix() {
    let matrix = GLMath.matrix4Identity();
    matrix = GLMath.matrix4Translate(matrix, this.position);
    matrix = GLMath.matrix4Rotate(matrix, this.rotation[0], [1, 0, 0]);
    matrix = GLMath.matrix4Rotate(matrix, this.rotation[1], [0, 1, 0]);
    matrix = GLMath.matrix4Rotate(matrix, this.rotation[2], [0, 0, 1]);
    matrix = GLMath.matrix4ScaleWithVector(matrix, this.scale);

    return matrix;
  }
}
