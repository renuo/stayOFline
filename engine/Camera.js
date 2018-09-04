class Camera {
  constructor() {
    this.position = [0, 0, 0];
    this.rotation = [0, 0, 0];
    this.offset = [0, 0, 0];
  }

  moveX(amount) {
    this.translate([amount, 0, 0]);
  }

  moveY(amount) {
    this.translate([0, amount, 0]);
  }

  moveZ(amount) {
    this.translate([0, 0, amount]);
  }

  // TODO: Remove all rotation code in the final version
  rotateX(amount) {
    this.rotation = [this.rotation[0] + amount, 0, 0];
  }

  rotateY(amount) {
    this.rotation = [0, this.rotation[0] + amount, 0];
  }

  rotateZ(amount) {
    this.rotation = [0, 0, this.rotation[0] + amount];
  }

  translate(vector) {
    this.position = this.position.map((val, i) => val + vector[i]);
  }

  get transformationMatrix() {
    let matrix = GLMath.matrix4Identity();
    matrix = GLMath.matrix4Translate(matrix, this.getPositionVector());
    matrix = GLMath.matrix4Rotate(matrix, this.rotation[0], [1, 0, 0]);
    matrix = GLMath.matrix4Rotate(matrix, this.rotation[1], [0, 1, 0]);
    matrix = GLMath.matrix4Rotate(matrix, this.rotation[2], [0, 0, 1]);
    return GLMath.matrix4Inverse(matrix);
  }

  getPositionVector() {
    return [
      this.position[0] + this.offset[0],
      this.position[1] + this.offset[1],
      this.position[2] + this.offset[2]
    ];
  }
}
