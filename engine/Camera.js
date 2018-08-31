class Camera {
  constructor() {
    this.position = [0, 0, 0];
    this.rotation = [0, 0, 0];
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

  rotateX(amount) {
    this.rotation = [this.rotation[0] + amount, 0, 0];
  }

  translate(vector) {
    this.position = this.position.map((val, i) => val + vector[i]);
  }

  get transformationMatrix() {
    let matrix = GLMath.matrix4Identity();
    matrix = GLMath.matrix4Rotate(matrix, this.rotation[0], [1, 0, 0]);
    matrix = GLMath.matrix4Translate(matrix, [-this.position[0], -this.position[1], -this.position[2]]);
    return matrix;
  }
}
