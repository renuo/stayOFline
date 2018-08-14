(function() {
  "use strict";

  window.Renderer = function(canvas) {
    this.canvas = canvas;
    this.gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

    if (!this.gl) {
      throw new Error("WebGL must be supported in order to run this game!");
    }

    this.render = function() {
      console.log("render!");
    };
  };
})();
