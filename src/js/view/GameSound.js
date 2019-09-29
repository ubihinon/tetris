import lineSound from '../../media/sounds/line.wav';
import gameOverSound from '../../media/sounds/gameover.wav';
import Sound from '../../core/view/Sound';

export default class GameSound extends Sound {
  playLineDeleting() {
    this.play(lineSound);
  }

  playGameOver() {
    this.play(gameOverSound);
  }
}
