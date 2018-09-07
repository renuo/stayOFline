class Block extends Model {
  constructor(geometry, width, height, depth, position, color = null) {
    super(geometry);
    this.position = position;
    this.scale = [width, height, depth];
    if (color) this.color = color;
  }

  axisMax(dimension) { return this.position[dimension] + this.scale[dimension] / 2; }
  axisMin(dimension) { return this.position[dimension] - this.scale[dimension] / 2; }
}
