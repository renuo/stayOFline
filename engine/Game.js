(function() {
  "use strict";

  window.Game = function(renderer) {
    this.renderer = renderer;

    this.update = function () {

    };

    this.loop = function() {
      this.update();
      this.renderer.render();
    };
  };
})();
