class World {
  constructor() {
    this.camera = new Camera();
    this.light = null;
    this.models = [];

    this.player = this.camera;
    this.player.v = [0, 0, 0];
  }

  inAnyModel(position) {
    const inRange = (x, min, max) => ((x-min)*(x-max) <= 0);
    const collidingBlocks = this.models
      .filter(m => inRange(position[0], m.axisMin(0), m.axisMax(0)))
      .filter(m => inRange(position[2], m.axisMin(2), m.axisMax(2)))
      .filter(m => inRange(position[1], m.axisMin(1), m.axisMax(1)));
    return collidingBlocks.length > 0;
  }

  aboveGround(position) {
    const inRange = (x, min, max) => ((x-min)*(x-max) <= 0);
    const blocksDirectlyBelow = this.models
      .filter(m => inRange(position[0], m.axisMin(0), m.axisMax(0)))
      .filter(m => inRange(position[2], m.axisMin(2), m.axisMax(2)))
      .filter(m => position[1] > m.axisMax(1))
      .sort((a, b) => a.axisMax(1) - b.axisMax(1));
    if (blocksDirectlyBelow.length > 0) {
      const topBlock = blocksDirectlyBelow[0];
      return position[1] - (topBlock.position[1] + topBlock.scale[1] / 2); // meters above ground
    } else {
      return NaN;
    }
  }
}
