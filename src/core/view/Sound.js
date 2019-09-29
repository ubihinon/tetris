export default class Sound {
  play(soundFile) {
    if (soundFile) {
      const audio = new Audio(soundFile);
      audio.play();
    }
  }
}
