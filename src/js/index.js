import Game from "./models/Game";
import '../css/main.css';
import View from "./view/View";

const root = document.querySelector('#canvas-container');

const game = new Game();
const view = new View(root, 320, 640, 20, 10);

window.game = game;
window.view = view;

document.addEventListener('keydown', event => {
    switch (event.keyCode) {
        case 37:
            game.movePieceLeft();
            view.render(game.getState());
            break;
        case 38:
            game.rotatePiece();
            view.render(game.getState());
            break;
        case 39:
            game.movePieceRight();
            view.render(game.getState());
            break;
        case 40:
            game.movePieceDown();
            view.render(game.getState());
            break;
    }
});
