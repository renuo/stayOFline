function startMusic() {
  var player = new CPlayer();
  player.init(song);
  player.generate();
  var wave = player.createWave();
  var audio = document.createElement("audio");
  audio.src = URL.createObjectURL(new Blob([wave], {type: "audio/wav"}));
  audio.loop = true;
  audio.play();
}
