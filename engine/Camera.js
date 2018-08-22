class Camera {
  constructor() {
    this.transformationMatrix = GLMath.matrix4Identity();
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

  translate(vector) {
    this.transformationMatrix = GLMath.matrix4Translate(this.transformationMatrix, vector.map(i => -i));
  }
}
