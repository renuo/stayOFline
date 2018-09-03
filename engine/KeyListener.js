class KeyListener {
  setupControls(world) {
    if (localStorage.isTouch == 1) {
      debug('Use swipe to move');
      this.swipedetect(window, world);
    } else {
      debug('Use wasdrf to move');
      window.addEventListener('keydown', (event) => {
        KeyListener.move(event.key, world);
      });
    }
  }

  static move(key, world) {
    const v = 0.1;
    const mapping = {
      w: [0, 0, -v],
      s: [0, 0, v],
      a: [-v, 0, 0],
      d: [v, 0, 0],
      r: [0, v, 0],
      f: [0, -v, 0]
    };

    const mapping2 = {
      o: v,
      l: -v
    };

    if (mapping[key] !== undefined) {
      world.camera.translate(mapping[key]);
    } else if (mapping2[key] !== undefined) {
      world.camera.rotateX(mapping2[key]);
    }

    if (key === ' ' && world.player.v[1] === 0) {
      world.player.v[1] += 4.5; // Source: https://www.whatsmyvertical.com/the-physics-of-the-vertical-jump/
    }

    debug(world.camera.transformationMatrix);
  }


  swipedetect(element, world) {
    let touchsurface = element, swipedir, startX, startY, distX, distY, threshold = 150, restraint = 100,
      allowedTime = 300, elapsedTime, startTime;

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
          swipedir = (distX < 0) ? 'a' : 'd'
        }
        else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint) {
          swipedir = (distY < 0) ? 'w' : 's'
        }
      }
      KeyListener.move(swipedir, world);
      e.preventDefault()
    }, false)
  }
}
