import EventObserver from "../../core/observer/EventObserver";
import GameSound from "./GameSound";
import {screens, ui_constants} from "./constants"

export default class View extends EventObserver {
    static colors = {
        '1': 'cyan',
        '2': 'blue',
        '3': 'orange',
        '4': 'yellow',
        '5': 'green',
        '6': 'purple',
        '7': 'red'
    };

    constructor(width, height, rows, columns) {
        super();
        super.addEmitter(this.constructor.name);

        this.width = width;
        this.height = height;

        this.canvas = document.getElementById('playfield');

        this.initCanvasSize();
        this.initPlayfieldSize();
        this.initBlockSize(rows, columns);
        this.initPanelSize();

        this.context = this.canvas.getContext('2d');

        this.currentScreen = null;
        this.sound = new GameSound();

        this.renderStartScreen();

        this.resizeCanvasSize();
    }

    initCanvasSize() {
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }

    initPlayfieldSize() {
        this.playfieldWidth = this.width * 2 / 3;
        this.playfieldHeight = this.height;
        this.playfieldInnerWidth = this.playfieldWidth;
        this.playfieldInnerHeight = this.playfieldHeight;
    }

    initPanelSize() {
        this.panelX = this.playfieldWidth + 10;
        this.panelY = 0;
        this.panelWidth = this.width / 3;
        this.panelHeight = this.height;
    }

    initBlockSize(rows, columns) {
        this.blockWidth = this.playfieldInnerWidth / columns;
        this.blockHeight = this.playfieldInnerHeight / rows;
    }

    resizeCanvasSize() {
        let ratio = this.canvas.width / this.canvas.height;
        let canvasHeight = window.innerHeight - 50;
        let canvasWidth = canvasHeight * ratio;

        if (canvasWidth > window.innerWidth) {
            canvasWidth = window.innerWidth;
            canvasHeight = canvasWidth / ratio;
        }

        this.canvas.style.width = `${canvasWidth}px`;
        this.canvas.style.height = `${canvasHeight}px`;
    }

    updateView() {
        const state = this.notify('getState');

        if (state.isGameOver) {
            if (!this.isEndScreen()) {
                this.sound.playGameOver();
            }
            this.renderEndScreen(state);
        } else if (!state.isPlaying) {
            this.renderPauseScreen();
        } else {
            this.renderMainScreen(state);
        }
    }

    renderStartScreen() {
        this.setFont();
        this.context.textAlign = ui_constants.TEXT_ALIGN_CENTER;
        this.context.textBaseline = ui_constants.TEXT_BASELINE_MIDDLE;

        this.context.fillText('Press ENTER to Start', this.width / 2, this.height / 2);

        this.currentScreen = screens.START;
    }

    renderMainScreen(state) {
        this.clearScreen();
        this.renderPlayfield(state);
        this.renderPanel(state);

        this.currentScreen = screens.MAIN;
    }

    renderPauseScreen() {
        if (this.isPauseScreen()) {
            return;
        }

        this.context.fillStyle = 'rgba(0, 0, 0, 0.75)';
        this.context.fillRect(0, 0, this.width, this.height);

        this.setFont();
        this.context.textAlign = ui_constants.TEXT_ALIGN_CENTER;
        this.context.textBaseline = ui_constants.TEXT_BASELINE_MIDDLE;

        this.context.fillText('Press ENTER to Resume', this.width / 2, this.height / 2);

        this.currentScreen = screens.PAUSE;
    }

    renderEndScreen({score}) {
        this.clearScreen();

        let bestScore = this.notify('getBestScore');

        this.setFont();
        this.context.textAlign = ui_constants.TEXT_ALIGN_CENTER;
        this.context.textBaseline = ui_constants.TEXT_BASELINE_MIDDLE;

        this.context.fillText('GAME OVER', this.width / 2, this.height / 2 - 48);
        this.context.fillText(`Score: ${score}`, this.width / 2, this.height / 2);
        this.context.fillText('Press ENTER to Restart', this.width / 2, this.height / 2 + 48);

        if (bestScore) {
            this.context.fillText(`Best score: ${bestScore}`, this.width / 2, this.height / 2 + 96);
        }

        this.currentScreen = screens.GAME_OVER;
    }

    clearScreen() {
        this.context.clearRect(0, 0, this.width, this.height);
    }

    renderPlayfield({playfield}) {
        this.context.fillStyle = 'rgba(102, 51, 153, 1)';
        this.context.fillRect(0, 0, this.playfieldWidth, this.playfieldHeight);

        for (let y = 0; y < playfield.length; y++) {
            const line = playfield[y];

            for (let x = 0; x < line.length; x++) {
                const block = line[x];
                if (block) {
                    this.renderBlock(
                        x * this.blockWidth,
                        y * this.blockHeight,
                        this.blockWidth,
                        this.blockHeight,
                        View.colors[block]
                    );
                }
            }
        }
    }

    renderPanel({level, score, lines, nextPiece}) {
        this.context.fillStyle = 'rgba(102, 51, 153, 0.3)';
        this.context.fillRect(this.panelX - 10, 0, this.panelWidth, this.panelHeight);

        this.setFont();
        this.context.textAlign = ui_constants.TEXT_ALIGN_START;
        this.context.textBaseline = ui_constants.TEXT_BASELINE_TOP;


        this.context.fillText(`Score: ${score}`, this.panelX, 5);
        this.context.fillText(`Lines: ${lines}`, this.panelX, 29);
        this.context.fillText(`Level: ${level}`, this.panelX, 53);
        this.context.fillText('Next:', this.panelX, 101);

        const scale = 0.8;

        for (let y = 0; y < nextPiece.blocks.length; y++) {
            for (let x = 0; x < nextPiece.blocks[y].length; x++) {
                const block = nextPiece.blocks[y][x];

                if (block) {
                    this.renderBlock(
                        this.panelX + (x * this.blockWidth * scale),
                        this.panelY + 110 + (y * this.blockHeight * scale),
                        this.blockWidth * scale,
                        this.blockHeight * scale,
                        View.colors[block]
                    );
                }
            }
        }
    }

    setFont() {
        this.context.fillStyle = ui_constants.FONT_COLOR;
        this.context.font = ui_constants.FONT;
    }

    renderBlock(x, y, width, height, color) {
        let gradient = this.context.createRadialGradient(x, y, 5, x + width / 2, y + height / 2, 30);
        gradient.addColorStop(0, color);
        gradient.addColorStop(1, 'black');
        this.context.fillStyle = gradient;
        this.context.fillRect(x, y, width, height);
    }

    playLineDeleting() {
        this.sound.playLineDeleting();
    }

    isPauseScreen() {
        return this.currentScreen === screens.PAUSE;
    }

    isEndScreen() {
        return this.currentScreen === screens.GAME_OVER;
    }

    get className() {
        return this.constructor.name;
    }
}