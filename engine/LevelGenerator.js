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
    this.levelNumber = levelNumber;
    this.lineWidth = lineWidth;

    this.lineNumber = 0;
    this.zOffset = 1;
  }

  produceGridLine() {
    const line = new Array(this.lineWidth);

    for (let x = 0; x < this.lineWidth; x++) {
      line[x] = this._createCuboid(x, -this.lineNumber);
    }

    this.lineNumber++;
    return line;
  }

  _createCuboid(x, z) {
    let y = this._height(x, z);
    if (isNaN(y)) return null;
    y += this.zOffset;
    return new Block(this.blockGeometry, 1, y, 1, [x, y/2, z]);
  }

  _height(x, z) {
    return this[`_level${this.levelNumber}`](x, z);
  }

  _level1(x, z) {
    if (z === -15) return undefined;
    if (x+z === -20) return undefined;
    if (x-z === 40) return 0.5;
    return 0;
  }
  _level2(x, z) {
    return Math.sin(5*x) * Math.cos(5*z) / 5;
  }
  _level3(x, z) {
    return 0;
  }
  _level4(x, z) {
    return 0;
  }
  _level5(x, z) {
    return Math.sin(10*(Math.sqrt((z*z)+(x*x))))/5;
  }
}
