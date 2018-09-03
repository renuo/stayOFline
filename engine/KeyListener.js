class KeyListener {
  setupControls(world) {
    if (localStorage.isTouch == 1) {
      debug('Swipe to move, tap to jump');
      this.swipedetect(window, world);
    } else {
      debug('AD to move, Space to jump');
      window.addEventListener('keydown', (event) => {
        const mapping = {
          a: 'left',
          d: 'right',
          ' ': 'jump'
        };

        KeyListener.move(mapping[event.key], world);
      });
    }
  }

  static move(dir, world) {
    const v = 1;
    const mapping = {
      left: [-v, 0, 0],
      right: [v, 0, 0],
    };

    if (mapping[dir] !== undefined) {
      world.camera.translate(mapping[dir]);
    }

    if (dir === 'jump' && world.player.v[1] === 0) {
      world.player.v[1] += 1.45; // Source: https://www.whatsmyvertical.com/the-physics-of-the-vertical-jump/
    }

    debug(world.camera.transformationMatrix);
  }


  swipedetect(element, world) {
    let touchsurface = element, swipedir, startX, startY, distX, distY, threshold = 150, restraint = 100,
      allowedTime = 300, elapsedTime, startTime, tapThreshold = 10;

    touchsurface.addEventListener('touchstart', function (e) {
      var touchobj = e.changedTouches[0];
      swipedir = 'none';
      startX = touchobj.pageX;
      startY = touchobj.pageY;
      startTime = new Date().getTime();
      e.preventDefault()
    }, false);

    touchsurface.addEventListener('touchmove', function (e) {
      e.preventDefault();
    }, false);

    touchsurface.addEventListener('touchend', function (e) {
      var touchobj = e.changedTouches[0];
      distX = touchobj.pageX - startX;
      distY = touchobj.pageY - startY;
      elapsedTime = new Date().getTime() - startTime;
      if (elapsedTime <= allowedTime) {
        if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
          swipedir = (distX < 0) ? 'left' : 'right'
        } else if (Math.abs(distX) <= tapThreshold && Math.abs(distY) <= tapThreshold) {
          swipedir = 'jump';
        }
      }
      KeyListener.move(swipedir, world);
      e.preventDefault()
    }, false)
  }
}
