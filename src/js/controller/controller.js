import * as KeyCode from 'keycode-js';
import EventObserver from "../../core/observer/EventObserver";

export default class Controller extends EventObserver {
    constructor() {
        super();
        super.addEmitter(this.constructor.name);

        document.addEventListener('keydown', this.handleKeyDown.bind(this));
        document.addEventListener('keyup', this.handleKeyUp.bind(this));
    }

    handleKeyDown(event) {
        const state = this.getState();

        if (event.keyCode !== KeyCode.KEY_RETURN && !state.isPlaying) {
            return;
        }

        switch (event.keyCode) {
            case KeyCode.KEY_RETURN:
                if (state.isGameOver) {
                    this.reset();
                } else if (state.isPlaying) {
                    this.pause();
                } else {
                    this.play();
                }
                break;
            case KeyCode.KEY_LEFT:
                this.notify('movePieceLeft');
                this.notify('updateView');
                break;
            case KeyCode.KEY_UP:
                this.notify('rotatePiece');
                this.notify('updateView');
                break;
            case KeyCode.KEY_RIGHT:
                this.notify('movePieceRight');
                this.notify('updateView');
                break;
            case KeyCode.KEY_DOWN:
                this.notify('stopTimer');
                this.notify('movePieceDown');
                this.notify('updateView');
                break;
        }
    }

    handleKeyUp(event) {
        if (event.keyCode === KeyCode.KEY_DOWN && this.getState().isPlaying) {
            this.notify('startTimer');
        }
    }

    play() {
        this.notify('play');
        this.notify('updateView');
    }

    pause() {
        this.notify('pause');
        this.notify('updateView');
    }

    reset() {
        this.notify('reset');
        this.notify('play');
    }

    update() {
        this.notify('movePieceDown');
        this.notify('updateView');
    }

    lineDeleting() {
        this.notify('playLineDeleting');
    }

    getBestScore() {
        return this.notify('getBestScore')
    }

    getState() {
        return this.notify('getState');
    }

    get className() {
        return this.constructor.name;
    }
}