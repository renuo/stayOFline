class Texture {
  constructor(gl, data) {
    this.gl = gl;
    this.textureRef = this.gl.createTexture();

    this.bind(() => {
      this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGB, this.gl.RGB, this.gl.UNSIGNED_BYTE, data);
      this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
      this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
      this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.REPEAT);
      this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.REPEAT);
    });
  }

  bind(lambda) {
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.textureRef);
    if (lambda) {
      lambda();
      this.unbind();
    }
  }

  unbind() {
    this.gl.bindTexture(this.gl.TEXTURE_2D, null);
  }
}
