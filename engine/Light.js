class Light {
  constructor(position, attenuation, color) {
    this.position = position;
    this.color = color || Colors.white;
    this.attenuation = attenuation || [1.0, 0.0, 0.0];
  }
}
