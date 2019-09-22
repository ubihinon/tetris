import * as KeyCode from 'keycode-js';
import EventObserver from "../../core/EventObserver";

export default class Controller extends EventObserver {
    constructor() {
        super();
        super.addEmitter(this.constructor.name);

        this.intervalId = null;
        this.isPlaying = false;

        document.addEventListener('keydown', this.handleKeyDown.bind(this));
        document.addEventListener('keyup', this.handleKeyUp.bind(this));
    }

    play() {
        this.isPlaying = true;
        this.startTimer();
        this.updateView();
    }

    pause() {
        this.isPlaying = false;
        this.stopTimer();
        this.updateView();
    }

    reset() {
        this.notify('reset');
        this.play();
    }

    updateView() {
        const state = this.notify('getState');

        if (state.isGameOver) {
            this.notify('renderEndScreen', state);
        } else if (!this.isPlaying) {
            this.notify('renderPauseScreen');
        } else {
            this.notify('renderMainScreen', state);
        }
    }

    startTimer() {
        const speed = 1000 - this.notify('getState').level * 100;

        if (!this.intervalId) {
            this.intervalId = setInterval(() => {
                this.update();
            }, speed > 0 ? speed : 100);
        }
    }

    update() {
        this.notify('movePieceDown');
        this.updateView();
    }

    stopTimer() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    handleKeyDown(event) {
        const state = this.notify('getState');
        if (event.keyCode !== KeyCode.KEY_RETURN && !this.isPlaying) {
            return;
        }

        switch (event.keyCode) {
            case KeyCode.KEY_RETURN:
                if (state.isGameOver) {
                    this.reset();
                } else if (this.isPlaying) {
                    this.pause();
                } else {
                    this.play();
                }
                break;
            case KeyCode.KEY_LEFT:
                this.notify('movePieceLeft');
                this.updateView();
                break;
            case KeyCode.KEY_UP:
                this.notify('rotatePiece');
                this.updateView();
                break;
            case KeyCode.KEY_RIGHT:
                this.notify('movePieceRight');
                this.updateView();
                break;
            case KeyCode.KEY_DOWN:
                this.stopTimer();
                this.notify('movePieceDown');
                this.updateView();
                break;
        }
    }

    handleKeyUp(event) {
        if (event.keyCode === KeyCode.KEY_DOWN && this.isPlaying) {
            this.startTimer();
        }
    }

    getClassName() {
        return this.constructor.name;
    }
}