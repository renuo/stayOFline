(function() {
  "use strict";

  window.Buffer = function(gl, data) {
    this.initialize = function() {
      this.bind();
      gl.bufferData(gl.ARRAY_BUFFER, this.data, gl.STATIC_DRAW);
      this.unbind();
    };

    this.bind = function() {
      gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
    };

    this.unbind = function() {
      gl.bindBuffer(gl.ARRAY_BUFFER, null);
    };

    this.tearDown = function() {
      gl.deleteBuffer(this.buffer);
    };

    this.data = data;
    this.buffer = gl.createBuffer();
    this.initialize();
  };
})();
