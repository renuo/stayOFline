(function() {
  "use strict";

  window.Program = function(gl, vertexShader, fragmentShader) {
    this.vertexShader = vertexShader;
    this.fragmentShader = fragmentShader;
    this.program = gl.createProgram();

    this.initialize = function() {
      gl.attachShader(this.program, this.vertexShader.shader);
      gl.attachShader(this.program, this.fragmentShader.shader);
      gl.linkProgram(this.program);

      if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
        var programLog = gl.getProgramInfoLog(this.program);
        this.tearDown();
        throw new Error(programLog);
      }
    };

    this.bind = function() {
      gl.useProgram(this.program);
    };

    this.unbind = function() {
      gl.useProgram(null);
    };

    this.tearDown = function() {
      gl.deleteProgram(this.program);
      gl.deleteShader(this.vertexShader.shader);
      gl.deleteShader(this.fragmentShader.shader);
    };

    this.initialize();
  };
})();
