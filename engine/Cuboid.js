// This is "Meshable(vertices, vertexIndices)"
class Cuboid {
  constructor(width, height, depth, options = {
    position: [0, 0, 0], rotation: [0, 0, 0]
  }) {
    this.width = width;
    this.height = height;
    this.depth = depth;
    this.position = options.position;
    // this.rotation = options.rotation;
  }

  at(x, y, z) {
    this.position = [x, y, z];
    return this;
  }

  get vertices() {
    let cubeVertices = [
      // vordere Fläche
      -0.5, -0.5,  0.5,
      0.5, -0.5,  0.5,
      0.5,  0.5,  0.5,
      -0.5,  0.5,  0.5,

      // hintere Fläche
      -0.5, -0.5, -0.5,
      -0.5,  0.5, -0.5,
      0.5,  0.5, -0.5,
      0.5, -0.5, -0.5,

      // obere Fläche
      -0.5,  0.5, -0.5,
      -0.5,  0.5,  0.5,
      0.5,  0.5,  0.5,
      0.5,  0.5, -0.5,

      // untere Fläche
      -0.5, -0.5, -0.5,
      0.5, -0.5, -0.5,
      0.5, -0.5,  0.5,
      -0.5, -0.5,  0.5,

      // rechte Fläche
      0.5, -0.5, -0.5,
      0.5,  0.5, -0.5,
      0.5,  0.5,  0.5,
      0.5, -0.5,  0.5,

      // linke Fläche
      -0.5, -0.5, -0.5,
      -0.5, -0.5,  0.5,
      -0.5,  0.5,  0.5,
      -0.5,  0.5, -0.5
    ];

    // TODO: Matrix operation?
    cubeVertices.forEach((el, index) => {
      if (index % 3 === 0) cubeVertices[index] = el * this.width + this.position[0];
      if (index % 3 === 1) cubeVertices[index] = el * this.height + this.position[1];
      if (index % 3 === 2) cubeVertices[index] = el * this.depth + this.position[2];
    });

    // TODO: rotate

    return cubeVertices;
  }

  get vertexIndices() {
    return [
      0,  1,  2,      0,  2,  3,    // vorne
      4,  5,  6,      4,  6,  7,    // hinten
      8,  9,  10,     8,  10, 11,   // oben
      12, 13, 14,     12, 14, 15,   // unten
      16, 17, 18,     16, 18, 19,   // rechts
      20, 21, 22,     20, 22, 23    // links
    ];
  }
}
