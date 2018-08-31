class World {
  constructor() {
    this.camera = new Camera();
    this.light = null;
    this.models = [];
  }


  inModel(position) {
    const inRange = (x, min, max) => ((x-min)*(x-max) <= 0);
    const collidingBlocks = this.models
      .filter(m => inRange(position[2], m.position[2] - m.scale[2]  / 2, m.position[2] + m.scale[2] / 2))
      .filter(m => inRange(position[1], m.position[1] - m.scale[1]  / 2, m.position[1] + m.scale[1] / 2))
      .filter(m => inRange(position[0], m.position[0] - m.scale[0]  / 2, m.position[0] + m.scale[0] / 2));
    return collidingBlocks.length > 0;
  }
}
