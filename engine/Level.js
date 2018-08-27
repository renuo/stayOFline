/*
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}
*/

class Level {
  constructor(width, depth) {
    this.width = width;
    this.depth = depth;
    this.map = Array.from(Array(depth), () => new Array(width));

    this._createGroundLevel(10);
    this._cutRoadGrid();
  }

  _createGroundLevel(offset) {
    for (let i = 0; i < this.depth; i++) {
      for (let j = 0; j < this.width; j++) {
        this.map[i][j] = Math.floor(Level.sincos(i, j) * 10) + offset;
      }
    }
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

  get meshables() {
    const leftOffset = this.depth / 2;
    const cuboids = [];

    for (let i = 0; i < this.depth; i++) {
      for (let w = 0; w < this.width; w++) {
        cuboids.push(new Cuboid(1, 1, 1, { position: [w - leftOffset, 0, i] }));
      }
    }

    return cuboids;
  }

  static sincos(x, y) {
    return Math.abs(Math.sin(x) * Math.cos(y));
  }
}
