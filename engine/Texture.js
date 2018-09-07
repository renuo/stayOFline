class Texture {
  constructor(gl, src) {
    this.gl = gl;
    this.textureRef = this.gl.createTexture();

    const image = new Image();
    image.onload = () => this.handleImageLoad(image);
    image.src = src;
  }

  handleImageLoad(image) {
    this.bind(() => {
      this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGB, this.gl.RGB, this.gl.UNSIGNED_BYTE, image);
      this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
      this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
      this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
      this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
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
