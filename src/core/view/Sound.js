export default class Sound {
    play(soundFile) {
        if (soundFile) {
            let audio = new Audio(soundFile);
            audio.play();
        }
    }
}
