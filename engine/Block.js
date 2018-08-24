class Block extends Model {
  constructor(geometry, width, height, depth, position) {
    super(geometry);
    this.position = position;
    this.scale = [width, height, depth];
  }
}
