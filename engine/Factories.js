const createShader = function(gl, id) {
  const shaderElement = document.getElementById(id);
  const shaderSource = shaderElement.text;

  const shader = gl.createShader(shaderElement.type === "x-shader/x-fragment" ? gl.FRAGMENT_SHADER : gl.VERTEX_SHADER);
  gl.shaderSource(shader, shaderSource);
  gl.compileShader(shader);

  if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    return shader;
  }

  console.error(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
};

const meshFactory = function(gl, program) {
  return (meshConfig) => {
    const verticesBuffer = new VerticesBuffer(gl, new Float32Array(meshConfig.vertices));
    const indicesBuffer = new IndicesBuffer(gl, new Uint8Array(meshConfig.vertexIndices));

    return new Mesh(gl, program, verticesBuffer, indicesBuffer);
  }
};
