class Shader {
  constructor(gl, id) {
    this.gl = gl;

    const shaderElement = document.getElementById(id);
    const shaderSource = shaderElement.text;

    if (shaderElement.type === "x-shader/x-fragment") {
      this.shader = this.createShader(this.gl.FRAGMENT_SHADER, shaderSource);
    }

    if (shaderElement.type === "x-shader/x-vertex") {
      this.shader = this.createShader(this.gl.VERTEX_SHADER, shaderSource);
    }
  }

  createShader(type, source) {
    const shader = this.gl.createShader(type);
    this.gl.shaderSource(shader, source);
    this.gl.compileShader(shader);

    if (this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
      return shader
    }

    console.log(this.gl.getShaderInfoLog(shader));
    this.gl.deleteShader(shader);
  }
}
