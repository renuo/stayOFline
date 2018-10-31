class KeyListener {
  setupControls(world) {
    window.addEventListener('keydown', (event) => {
      console.log(event.key);
      const mapping = {
        w: 'forward',
        a: 'left',
        s: 'backward',
        d: 'right',
        'ArrowLeft': 'turnLeft',
        'ArrowRight': 'turnRight',
        ' ': 'jump'
      };

      KeyListener.move(mapping[event.key], world);
      KeyListener.turn(mapping[event.key], world);
    });
  }

  static move(dir, world) {
    const v = 0.07;
    const xMapping = { left: -v,  right: v };
    const zMapping = { forward: -v, backward: v };

    if (xMapping[dir] !== undefined) { world.player.v[0] = xMapping[dir]; }
    if (zMapping[dir] !== undefined) { world.player.v[2] = zMapping[dir]; }

    if (dir === 'jump' && world.player.v[1] === 0) {
      world.player.v[1] += 0.45; // Source: https://www.whatsmyvertical.com/the-physics-of-the-vertical-jump/
    }
  }

  static rotate(dir, world) {
    const v = 0.5;
    const rotationMapping = { turnLeft: -v,  turnRight: v };

    if (rotationMapping[dir] !== undefined) { world.player.rotV[1] = rotationMapping[dir]; }
  }
}
