class CubeGeometry extends Geometry {
  constructor(gl, program) {
    super(gl, program, CubeGeometry.vertices, CubeGeometry.normals, CubeGeometry.vertexIndices, CubeGeometry.textureCoordinates)
  }

  static get vertices() {
    return new Float32Array([
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
    ]);
  }

  static get textureCoordinates() {
    return new Float32Array([
      // front
      0.0, 0.0,
      1.0, 0.0,
      1.0, 1.0,
      0.0, 1.0,

      // back
      0.0, 0.0,
      0.0, 1.0,
      1.0, 1.0,
      1.0, 0.0,

      // top
      0.0, 0.0,
      0.0, 1.0,
      1.0, 1.0,
      1.0, 0.0,

      // bottom
      0.0, 0.0,
      1.0, 0.0,
      1.0, 1.0,
      0.0, 1.0,

      // right
      0.0, 0.0,
      1.0, 0.0,
      1.0, 1.0,
      0.0, 1.0,

      // left
      0.0, 0.0,
      1.0, 0.0,
      1.0, 1.0,
      0.0, 1.0
    ]);
  }

  static get normals() {
    return new Float32Array([
      0.0,  0.0,  1.0,
      0.0,  0.0,  1.0,
      0.0,  0.0,  1.0,
      0.0,  0.0,  1.0,

      0.0,  0.0, -1.0,
      0.0,  0.0, -1.0,
      0.0,  0.0, -1.0,
      0.0,  0.0, -1.0,

      0.0,  1.0,  0.0,
      0.0,  1.0,  0.0,
      0.0,  1.0,  0.0,
      0.0,  1.0,  0.0,

      0.0, -1.0,  0.0,
      0.0, -1.0,  0.0,
      0.0, -1.0,  0.0,
      0.0, -1.0,  0.0,

      1.0,  0.0,  0.0,
      1.0,  0.0,  0.0,
      1.0,  0.0,  0.0,
      1.0,  0.0,  0.0,

      -1.0,  0.0,  0.0,
      -1.0,  0.0,  0.0,
      -1.0,  0.0,  0.0,
      -1.0,  0.0,  0.0
    ]);
  }

  static get vertexIndices() {
    return new Uint8Array([
      0,  1,  2,      0,  2,  3,    // vorne
      4,  5,  6,      4,  6,  7,    // hinten
      8,  9,  10,     8,  10, 11,   // oben
      12, 13, 14,     12, 14, 15,   // unten
      16, 17, 18,     16, 18, 19,   // rechts
      20, 21, 22,     20, 22, 23    // links
    ]);
  }
}
