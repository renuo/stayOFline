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
    this.lineWidth = lineWidth;

    this.lineNumber = 0;
    this.minHeight = 1;
  }

  produceGridLine() {
    const line = new Array(this.lineWidth);

    for (let x = 0; x < this.lineWidth; x++) {
      line[x] = this._createCuboid(x, this.lineNumber);
    }

    this.lineNumber++;
    return line;
  }

  _createCuboid(x, z) {
    const y = this._height(x, z);
    if (!y) return null;
    return new Block(this.blockGeometry, 1, y, 1, [x, y/2, -z]);
  }

  _height(x, z) {
    return this._ripple(x, z) + this.minHeight; // TODO: vary functions
  }

  _flat(x, z) {
    return 0;
  }

  _sincos(x, z) {
    return Math.sin(5*x) * Math.cos(5*z) / 5;
  }

  _ripple(x, z) {
    return Math.sin(10*(Math.sqrt((z*z)+(x*x))))/10;
  }

  _pyramid(x, z) {
    return 1-Math.abs(x+z)-Math.abs(z-x);
  }

  _cutRoadGrid() {
    for (let i = 0; i < this.depth; i++) {
      if (Math.random() < 0.2) {
        if (i > 0 && this.map[i-1][0] !== 0) {
          for (let j = 0; j < this.width; j++) {
            this.map[i][j] = 0;
          }
        }
      }
    }

    for (let i = 0; i < this.width; i++) {
      if (Math.random() < 0.2) {
        if (i > 0 && this.map[0][i-1] !== 0) {
          for (let j = 0; j < this.depth; j++) {
            this.map[j][i] = 0;
          }
        }
      }
    }
  }
}
