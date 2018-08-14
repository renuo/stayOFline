(function() {
  "use strict";

  window.Renderer = function(canvas) {
    this.canvas = canvas;

    this.initialize = function() {
      this.gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

      if (!this.gl) {
        throw new Error("WebGL must be supported in order to run this game!");
      }

      this.resizeViewport(this.canvas);
    };

    this.resizeViewport = function() {
      this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
      this.gl.colorMask(true, true, true, true);
    };

    this.render = function() {
      this.gl.clearColor(1.0, 0.0, 0.0, 1.0);
      this.gl.clear(this.gl.COLOR_BUFFER_BIT);
      console.log("render!");
    };
  };
})();
