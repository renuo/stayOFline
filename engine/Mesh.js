(function() {
  "use strict";

  window.Mesh = function(gl, program, buffer) {
    this.initialize = function() {
      program.bind();
      this.bind();

      var verticesLocation = gl.getAttribLocation(program.program, 'vertices');
      gl.vertexAttribPointer(verticesLocation, 3, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(verticesLocation);

      this.unbind();
      program.unbind();
    };

    this.bind = function() {
      this.buffer.bind();
    };

    this.unbind = function() {
      this.buffer.unbind();
    };

    this.tearDown = function() {
      this.buffer.tearDown();
    };

    this.buffer = buffer;
    this.initialize();
  };
})();
