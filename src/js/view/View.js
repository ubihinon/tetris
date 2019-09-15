export default class View {
    static colors = {
        '1': 'cyan',
        '2': 'blue',
        '3': 'orange',
        '4': 'yellow',
        '5': 'green',
        '6': 'purple',
        '7': 'red'
    };

    static screens = {
        'start': 0,
        'main': 1,
        'pause': 2,
        'gameOver': 3
    };

    constructor(element, width, height, rows, columns) {
        this.element = element;
        this.width = width;
        this.height = height;
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.context = this.canvas.getContext('2d');

        this.playfieldWidth = this.width * 2 / 3;
        this.playfieldHeight = this.height;
        this.playfieldInnerWidth = this.playfieldWidth;
        this.playfieldInnerHeight = this.playfieldHeight;

        this.blockWidth = this.playfieldInnerWidth / columns;
        this.blockHeight = this.playfieldInnerHeight / rows;

        this.panelX = this.playfieldWidth + 10;
        this.panelY = 0;
        this.panelWidth = this.width / 3;
        this.panelHeight = this.height;

        this.currentScreen = null;

        this.element.appendChild(this.canvas);
    }

    renderMainScreen(state) {
        this.clearScreen();
        this.renderPlayfield(state);
        this.renderPanel(state);

        this.currentScreen = View.screens.main;
    }

    renderStartScreen() {
        this.context.fillStyle = 'white';
        this.context.font = '18px "Press Start 2P"';
        this.context.textAlign = 'center';
        this.context.textBaseline = 'middle';
        this.context.fillText('Press ENTER to Start', this.width / 2, this.height / 2);

        this.currentScreen = View.screens.start;
    }

    renderPauseScreen() {
        if (this.isPauseScreen()) {
            return;
        }

        this.context.fillStyle = 'rgba(0, 0, 0, 0.75)';
        this.context.fillRect(0, 0, this.width, this.height);

        this.context.fillStyle = 'white';
        this.context.font = '18px "Press Start 2P"';
        this.context.textAlign = 'center';
        this.context.textBaseline = 'middle';
        this.context.fillText('Press ENTER to Resume', this.width / 2, this.height / 2);

        this.currentScreen = View.screens.pause;
    }

    renderEndScreen({score}) {
        this.clearScreen();

        this.context.fillStyle = 'white';
        this.context.font = '18px "Press Start 2P"';
        this.context.textAlign = 'center';
        this.context.textBaseline = 'middle';
        this.context.fillText('GAME OVER', this.width / 2, this.height / 2 - 48);
        this.context.fillText(`Score: ${score}`, this.width / 2, this.height / 2);
        this.context.fillText('Press ENTER to Restart', this.width / 2, this.height / 2 + 48);

        this.currentScreen = View.screens.gameOver;
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

        this.context.textAlign = 'start';
        this.context.textBaseline = 'top';
        this.context.fillStyle = 'White';
        this.context.font = '14px "Press Start 2P"';

        this.context.fillText(`Score: ${score}`, this.panelX, 5);
        this.context.fillText(`Lines: ${lines}`, this.panelX, 29);
        this.context.fillText(`Level: ${level}`, this.panelX, 53);
        this.context.fillText('Next:', this.panelX, 101);

        const figure_size = 0.5;

        for (let y = 0; y < nextPiece.blocks.length; y++) {
            for (let x = 0; x < nextPiece.blocks[y].length; x++) {
                const block = nextPiece.blocks[y][x];

                if (block) {
                    this.renderBlock(
                        this.panelX + (x * this.blockWidth * figure_size),
                        this.panelY + 100 + (y * this.blockHeight * figure_size),
                        this.blockWidth * figure_size,
                        this.blockHeight * figure_size,
                        View.colors[block]
                    );
                }
            }
        }
    }

    renderBlock(x, y, width, height, color) {
        let gradient = this.context.createRadialGradient(x, y,  5,x + width / 2, y + height / 2, 30);
        gradient.addColorStop(0, color);
        gradient.addColorStop(1, 'black');
        this.context.fillStyle = gradient;
        this.context.fillRect(x, y, width, height);
    }

    isPauseScreen() {
        return this.currentScreen === View.screens.pause;
    }
}