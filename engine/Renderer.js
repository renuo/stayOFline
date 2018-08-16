(function() {
  "use strict";

  window.Renderer = function(canvas) {
    this.setupWebGLContext = function() {
      this.gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

      if (!this.gl) {
        throw new Error("WebGL must be supported in order to run this game!");
      }
    };

    this.setupWorld = function() {
      var vertexShader = new Shader(this.gl, 'vertex-shader');
      var fragmentShader = new Shader(this.gl, 'fragment-shader');
      this.program = new Program(this.gl, vertexShader, fragmentShader);

      this.mesh = new Mesh(this.gl, this.program, new Buffer(this.gl, new Float32Array([
        -1.0, -1.0, 0.0,
        0.0,  1.0, 0.0,
        1.0, -1.0, 0.0
      ])));
    };

    this.initialize = function() {
      this.setupWebGLContext();
      this.resizeViewport(this.canvas);
      this.setupWorld();
    };

    this.resizeViewport = function() {
      this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
      this.gl.colorMask(true, true, true, true);
    };

    this.render = function() {
      this.gl.clearColor(1.0, 1.0, 1.0, 1.0);
      this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

      this.program.bind();
      this.mesh.bind();
      this.gl.drawArrays(this.gl.TRIANGLES, 0, 3);
    };

    this.canvas = canvas;
    this.initialize();
  };
})();
