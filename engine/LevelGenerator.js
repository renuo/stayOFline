/*
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}
*/

class LevelGenerator {
  constructor(lineWidth, geometryTemplate) {
    this.blockGeometry = geometryTemplate;
    this.lineWidth = lineWidth;

    this.lineNumber = 0;
    this.minHeight = 1;
  }

  nextLine() {
    const line = new Array(this.lineWidth);

    for (let x = 0; x < this.lineWidth; x++) {
      line[x] = this._createCuboid(x, this.lineNumber);
    }

    this.lineNumber++;
    return line;
  }

  _createCuboid(x, z) {
    const y = this._height(x, z);
    return new Block(this.blockGeometry, 0.999, y, 0.999, [x, y/2, -z]);
  }

  _height(x, z) {
    return Math.abs(Math.sin(x) * Math.cos(z)) + this.minHeight; // TODO: vary functions
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
