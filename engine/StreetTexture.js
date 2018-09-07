function makeRGB(color) {
  return `rgb(${color.map(c => Math.round(c * 255)).join(',')})`;
}

class StreetTexture extends Texture {
  constructor(gl) {
    super(gl, StreetTexture.generateTexture(8));
  }

  static generateTexture(textureSize) {
    const can = document.createElement('canvas');
    can.width = textureSize;
    can.height = textureSize;
    const ctx = can.getContext('2d');

    const fillColor = [0.7, 0.7, 0.7];
    const cubeCount = textureSize;
    const cubeSize = textureSize / cubeCount;

    for (let x = 0; x < cubeCount; x++) {
      for (let y = 0; y < cubeCount; y++) {
        const currentRand = 0.2 - (Math.random() * 0.4);
        ctx.fillStyle = makeRGB(fillColor.map(c => Math.min(c + currentRand, 1.0)));
        ctx.fillRect(x * cubeSize, y * cubeSize, (x + 1) * cubeSize, (y + 1) * cubeSize);
      }
    }

    return ctx.getImageData(0, 0, textureSize, textureSize);
  }
}
