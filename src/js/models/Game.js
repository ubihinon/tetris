import EventObserver from "../../core/observer/EventObserver";

export default class Game extends EventObserver {
    static points = {
        '1': 40,
        '2': 100,
        '3': 300,
        '4': 1200,
    };

    constructor() {
        super();
        this.addEmitter(this.constructor.name);

        this.reset();

        this.intervalId = null;
        this.isPlaying = false;
    }

    play() {
        this.isPlaying = true;
        this.startTimer();
    }

    pause() {
        this.isPlaying = false;
        this.stopTimer();
    }

    stopTimer() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    startTimer() {
        const speed = 1000 - this.notify('getState').level * 100;

        if (!this.intervalId) {
            this.intervalId = setInterval(() => {
                this.notify('update');
            }, speed > 0 ? speed : 100);
        }
    }

    reset() {
        this.score = 0;
        this.lines = 0;
        this.topOut = false;
        this.playfield = this.createPlayfield();
        this.activePiece = this.createPiece();
        this.nextPiece = this.createPiece();
    }

    getState() {
        return {
            score: this.score,
            level: this.level,
            lines: this.lines,
            nextPiece: this.nextPiece,
            playfield: this.concatenatePlayfields(),
            isGameOver: this.topOut,
            isPlaying: this.isPlaying
        };
    }

    concatenatePlayfields() {
        const playfield = this.createPlayfield();

        for (let y = 0; y < this.playfield.length; y++) {
            for (let x = 0; x < this.playfield[y].length; x++) {
                playfield[y][x] = this.playfield[y][x];
            }
        }

        return this.copyActivePieceToPlayfield(playfield);
    }

    copyActivePieceToPlayfield(playfield) {
        const {y: pieceY, x: pieceX, blocks} = this.activePiece;
        for (let y = 0; y < blocks.length; y++) {
            for (let x = 0; x < blocks[y].length; x++) {
                if (blocks[y][x]) {
                    playfield[pieceY + y][pieceX + x] = blocks[y][x];
                }
            }
        }
        return playfield;
    }

    createPlayfield() {
        const playfield = [];

        for (let y = 0; y < 20; y++) {
            playfield[y] = [];
            for (let x = 0; x < 10; x++) {
                playfield[y][x] = 0;
            }
        }

        return playfield;
    }

    createPiece() {
        const index = Math.floor(Math.random() * 7);
        const type = 'IJLOSTZ'[index];
        const piece = {};

        switch (type) {
            case 'I':
                piece.blocks = [
                    [0, 0, 0, 0],
                    [1, 1, 1, 1],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0]
                ];
                break;
            case 'J':
                piece.blocks = [
                    [0, 0, 0],
                    [2, 2, 2],
                    [0, 0, 2]
                ];
                break;
            case 'L':
                piece.blocks = [
                    [0, 0, 0],
                    [3, 3, 3],
                    [3, 0, 0]
                ];
                break;
            case 'O':
                piece.blocks = [
                    [0, 0, 0, 0],
                    [0, 4, 4, 0],
                    [0, 4, 4, 0],
                    [0, 0, 0, 0]
                ];
                break;
            case 'S':
                piece.blocks = [
                    [0, 0, 0],
                    [0, 5, 5],
                    [5, 5, 0]
                ];
                break;
            case 'T':
                piece.blocks = [
                    [0, 0, 0],
                    [6, 6, 6],
                    [0, 6, 0]
                ];
                break;
            case 'Z':
                piece.blocks = [
                    [0, 0, 0],
                    [7, 7, 0],
                    [0, 7, 7]
                ];
                break;
            default:
                throw new Error('Unknown type of figure')
        }

        piece.x = Math.floor((10 - piece.blocks[0].length) / 2);
        piece.y = -1;

        return piece;
    }

    movePieceLeft() {
        this.activePiece.x -= 1;

        if (this.hasCollision()) {
            this.activePiece.x += 1;
        }
    }

    movePieceRight() {
        this.activePiece.x += 1;

        if (this.hasCollision()) {
            this.activePiece.x -= 1;
        }
    }

    movePieceDown() {
        if (this.topOut) {
            this.saveBestScore();
            this.stopTimer();
            return;
        }

        this.activePiece.y += 1;

        if (this.hasCollision()) {
            this.activePiece.y -= 1;
            this.lockPiece();
            const clearedLines = this.clearLines();
            this.updateScore(clearedLines);
            this.updatePieces();
        }

        if (this.hasCollision()) {
            this.stopTimer();
            this.topOut = true;
        }
    }

    rotatePiece() {
        this.rotateBlocks();

        if (this.hasCollision()) {
            this.rotateBlocks(false);
        }
    }

    lockPiece() {
        this.copyActivePieceToPlayfield(this.playfield)
    }

    rotateBlocks(clockwise = true) {
        const blocks = this.activePiece.blocks;
        const length = blocks.length;
        const x = Math.floor(length / 2);
        const y = length - 1;

        for (let i = 0; i < x; i++) {
            for (let j = i; j < y - i; j++) {
                const temp = blocks[i][j];

                if (clockwise) {
                    blocks[i][j] = blocks[y - j][i];
                    blocks[y - j][i] = blocks[y - i][y - j];
                    blocks[y - i][y - j] = blocks[j][y - i];
                    blocks[j][y - i] = temp;
                } else {
                    blocks[i][j] = blocks[j][y - i];
                    blocks[j][y - i] = blocks[y - i][y - j];
                    blocks[y - i][y - j] = blocks[y - j][i];
                    blocks[y - j][i] = temp;
                }
            }
        }

    }

    hasCollision() {
        const {y: pieceY, x: pieceX, blocks} = this.activePiece;

        for (let y = 0; y < blocks.length; y++) {
            for (let x = 0; x < blocks[y].length; x++) {
                if (
                    blocks[y][x] &&
                    ((this.playfield[pieceY + y] === undefined
                        || this.playfield[pieceY + y][pieceX + x] === undefined) ||
                        this.playfield[pieceY + y][pieceX + x])) {
                    return true;
                }
            }
        }

        return false;
    }

    clearLines() {
        const rows = 20;
        const columns = 10;
        let lines = [];

        for (let y = rows - 1; y >= 0; y--) {
            let numberOfBlocks = 0;

            for (let x = 0; x < columns; x++) {
                if (this.playfield[y][x]) {
                    numberOfBlocks += 1;
                }
            }

            if (numberOfBlocks === 0) {
                break
            } else if (numberOfBlocks < columns) {
                continue;
            } else if (numberOfBlocks === columns) {
                this.notify('lineDeleting');
                lines.unshift(y);
            }
        }

        for (let index of lines) {
            this.playfield.splice(index, 1);
            this.playfield.unshift(new Array(columns).fill(0));
        }

        return lines.length;
    }

    updateScore(clearedLines) {
        if (clearedLines > 0) {
            this.score += Game.points[clearedLines] * (this.level + 1);
            this.lines += clearedLines;
        }
    }

    updatePieces() {
        this.activePiece = this.nextPiece;
        this.nextPiece = this.createPiece();
    }

    saveBestScore() {
        if (this.score === 0) {
            return;
        }

        if (this.score > this.getBestScore() || !this.getBestScore()) {
            localStorage.setItem('bestScore', this.score);
        }
    }

    getBestScore() {
        return localStorage.getItem('bestScore');
    }

    get level() {
        return Math.floor(this.lines * 0.1);
    }

    get className() {
        return this.constructor.name;
    }
}