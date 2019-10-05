import Game from './models/Game';
import '../css/main.css';
import View from './view/View';
import Controller from './controller/controller';

export default class App {
  constructor() {
    const game = new Game();
    const view = new View(480, 640, 20, 10);
    const controller = new Controller();

    game.subscribe(controller);
    view.subscribe(controller);
    controller.subscribe(view);
    controller.subscribe(game);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.fonts.ready.then(() => {
    new App();
  });
});
