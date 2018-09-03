class ThemeManager {
  startMusic() {
    var player = new CPlayer();
    player.init(song);
    player.generate();
    var wave = player.createWave();
    this.audio = document.createElement("audio");
    this.audio.src = URL.createObjectURL(new Blob([wave], {type: "audio/wav"}));
    this.audio.loop = true;
    this.audio.play();
  }

  stopMusic() {
    this.audio.pause();
  }
}
