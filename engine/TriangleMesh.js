const triangleVertices = new Float32Array([
  -1.0, -1.0, 0.0,
  0.0,  1.0, 0.0,
  1.0, -1.0, 0.0
]);

class TriangleMesh extends Mesh {
  constructor(gl, program) {
    super(gl, program, new VerticesBuffer(gl, triangleVertices));
  }
}
