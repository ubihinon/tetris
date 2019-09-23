import Game from "./models/Game";
import "../css/main.css";
import View from "./view/View";
import Controller from "./controller/controller";

class App {
    constructor() {
        const root = document.querySelector("#canvas-container");

        const game = new Game();
        const view = new View(root, 480, 640, 20, 10);
        const controller = new Controller();

        game.subscribe(controller);
        view.subscribe(controller);
        controller.subscribe(view);
        controller.subscribe(game);

        window.game = game;
        window.view = view;
        window.controller = controller;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document.fonts.ready.then(() => {
        new App();
    })
});
