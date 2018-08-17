function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

class Map {
  constructor(width, depth) {
    this.width = width;
    this.depth = depth;
    this.map = Array.from(Array(depth), () => new Array(width));

    this.createGroundLevel(10);
    this.cutRoadGrid();
  }

  createGroundLevel(offset) {
    for (let i = 0; i < this.depth; i++) {
      for (let j = 0; j < this.width; j++) {
        this.map[i][j] = Math.floor(Map.sincos(i, j) * 10) + offset;
      }
    }
  }

  cutRoadGrid() {
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

  static sincos(x, y) {
    return Math.abs(Math.sin(x) * Math.cos(y));
  }
}

m = new Map(20, 20);

m.map.forEach(function(row) {
  console.log(row.map(x => x.toString().padStart(2, '0')).join(' '));
});
