/*
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}
*/

class LevelGenerator {
  constructor(lineWidth, geometryTemplate, levelNumber) {
    this.blockGeometry = geometryTemplate;
    // TODO: generate different levels
  }

  get allBlocks() {
    return [
      this.floorBlock
    ]
  }

  get floorBlock() {
    return new Block(this.blockGeometry, 100, 1, 100, [0, 0, 0]);
  }
}
