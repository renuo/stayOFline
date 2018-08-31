class Block extends Model {
  constructor(geometry, width, height, depth, position) {
    super(geometry);
    this.position = position;
    this.scale = [width, height, depth];
  }

  axisMax(dimension) { return this.position[dimension] + this.scale[dimension] / 2; }
  axisMin(dimension) { return this.position[dimension] - this.scale[dimension] / 2; }
}
