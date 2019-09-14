import Game from "./models/Game";
import '../css/main.css';
import View from "./view/View";
import Controller from "./controller/controller";

const root = document.querySelector('#canvas-container');

const game = new Game();
const view = new View(root, 480, 640, 20, 10);
const controller = new Controller(game, view);

window.game = game;
window.view = view;
window.controller = controller;
