class Light {
  constructor(position, attenuation, color) {
    this.position = position;
    this.color = color || [1.0, 1.0, 1.0];
    this.attenuation = attenuation || [1.0, 0.0, 0.0];
  }
}
