import { assert } from 'chai';
import Game from '../src/js/models/Game';


describe('Game', () => {
  let game = null;

  beforeEach(() => {
    game = new Game();
  });

  afterEach(() => {
    localStorage.clear();
  });

  function createEmptyPlayfield() {
    return [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
  }

  function createFigureHorizontalS() {
    return [
      [0, 0, 0],
      [0, 5, 5],
      [5, 5, 0],
    ];
  }

  function createFigureVertivalS() {
    return [
      [5, 0, 0],
      [5, 5, 0],
      [0, 5, 0],
    ];
  }

  function assertEqualMatrix(matrix1, matrix2) {
    for (let i = 0; i < matrix1.length; i++) {
      assert.sameOrderedMembers(matrix1[i], matrix2[i]);
    }
  }

  it('concatenatePlayfields', () => {
    game.activePiece = {
      blocks: createFigureVertivalS(),
      x: 6,
      y: 14,
    };

    game.playfield = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [6, 6, 7, 7, 7, 7, 7, 0, 1, 3],
      [4, 3, 3, 3, 5, 0, 5, 7, 1, 3],
      [4, 4, 1, 1, 1, 0, 0, 2, 2, 2],
    ];

    const expected = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 5, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 5, 5, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 5, 0, 0],
      [6, 6, 7, 7, 7, 7, 7, 0, 1, 3],
      [4, 3, 3, 3, 5, 0, 5, 7, 1, 3],
      [4, 4, 1, 1, 1, 0, 0, 2, 2, 2],
    ];

    assertEqualMatrix(game.concatenatePlayfields(), expected);
  });

  it('copyActivePieceToPlayfield', () => {
    game.activePiece = {
      blocks: createFigureHorizontalS(),
      x: 0,
      y: 17,
    };

    const playfield = createEmptyPlayfield();

    const expected = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 5, 5, 0, 0, 0, 0, 0, 0, 0],
      [5, 5, 0, 0, 0, 0, 0, 0, 0, 0],
    ];

    assertEqualMatrix(game.copyActivePieceToPlayfield(playfield), expected);
  });

  it('createPlayfield', () => {
    assertEqualMatrix(game.createPlayfield(), createEmptyPlayfield());
  });

  it('movePieceLeft', () => {
    game.activePiece = {
      blocks: createFigureHorizontalS(),
      x: 3,
      y: 15,
    };

    game.movePieceLeft();

    assert.equal(game.activePiece.x, 2);
    assert.equal(game.activePiece.y, 15);
  });

  it('movePieceLeft collision', () => {
    game.activePiece = {
      blocks: createFigureHorizontalS(),
      x: 0,
      y: 15,
    };

    game.movePieceLeft();

    assert.equal(game.activePiece.x, 0);
    assert.equal(game.activePiece.y, 15);
  });

  it('movePieceRight', () => {
    game.activePiece = {
      blocks: createFigureHorizontalS(),
      x: 3,
      y: 15,
    };

    game.movePieceRight();

    assert.equal(game.activePiece.x, 4);
    assert.equal(game.activePiece.y, 15);
  });

  it('movePieceRight collision', () => {
    game.activePiece = {
      blocks: createFigureHorizontalS(),
      x: 19,
      y: 15,
    };

    game.movePieceRight();

    assert.equal(game.activePiece.x, 19);
    assert.equal(game.activePiece.y, 15);
  });

  it('movePieceDown', () => {
    game.activePiece = {
      blocks: createFigureHorizontalS(),
      x: 3,
      y: 15,
    };

    game.movePieceDown();

    assert.equal(game.activePiece.x, 3);
    assert.equal(game.activePiece.y, 16);
  });

  it('isTopOut', () => {
    game.playfield = [
      [0, 0, 1, 0, 1, 1, 1, 1, 0, 0],
      [0, 0, 1, 0, 1, 1, 1, 1, 0, 0],
      [0, 0, 1, 0, 1, 1, 1, 1, 0, 0],
      [0, 0, 1, 0, 1, 1, 1, 1, 0, 0],
      [0, 0, 1, 0, 1, 1, 1, 1, 0, 0],
      [0, 0, 1, 0, 1, 1, 1, 1, 0, 0],
      [0, 0, 1, 0, 1, 1, 1, 1, 0, 0],
      [0, 0, 1, 0, 1, 1, 1, 1, 0, 0],
      [0, 0, 1, 0, 1, 1, 1, 1, 0, 0],
      [0, 0, 1, 0, 1, 1, 1, 1, 0, 0],
      [0, 0, 1, 0, 1, 1, 1, 1, 0, 0],
      [0, 0, 1, 0, 1, 1, 1, 1, 0, 0],
      [0, 0, 1, 0, 1, 1, 1, 1, 0, 0],
      [0, 0, 1, 0, 1, 1, 1, 1, 0, 0],
      [0, 0, 1, 0, 1, 1, 1, 1, 0, 0],
      [0, 0, 1, 0, 1, 1, 1, 1, 0, 0],
      [6, 6, 7, 7, 7, 7, 7, 0, 1, 3],
      [4, 3, 3, 3, 5, 5, 5, 7, 1, 3],
      [4, 4, 1, 1, 1, 1, 2, 2, 2, 2],
      [0, 7, 7, 7, 0, 0, 3, 3, 3, 0],
    ];
    game.movePieceDown();
    game.movePieceDown();
    assert.isTrue(game.topOut);
  });

  it('rotatePiece', () => {
    game.activePiece = {
      blocks: createFigureHorizontalS(),
      x: 3,
      y: 15,
    };

    game.rotatePiece();

    assert.equal(game.activePiece.x, 3);
    assert.equal(game.activePiece.y, 15);
    assertEqualMatrix(game.activePiece.blocks, createFigureVertivalS());
  });

  it('rotatePiece collision', () => {
    game.activePiece = {
      blocks: createFigureHorizontalS(),
      x: 20,
      y: 15,
    };

    game.rotatePiece();

    assert.equal(game.activePiece.x, 20);
    assert.equal(game.activePiece.y, 15);
    assertEqualMatrix(game.activePiece.blocks, createFigureHorizontalS());
  });

  it('hasCollision', () => {
    game.activePiece = {
      blocks: createFigureHorizontalS(),
      x: 3,
      y: 15,
    };
    assert.isFalse(game.hasCollision());

    game.activePiece.y = 20;
    assert.isTrue(game.hasCollision());

    game.activePiece.x = 10;
    assert.isTrue(game.hasCollision());
  });

  it('clearLines', () => {
    game.playfield = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [6, 6, 7, 7, 7, 7, 7, 0, 1, 3],
      [4, 3, 3, 3, 5, 5, 5, 7, 1, 3],
      [4, 4, 1, 1, 1, 1, 2, 2, 2, 2],
      [0, 7, 7, 7, 0, 0, 3, 3, 3, 0],
    ];
    const expected = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [6, 6, 7, 7, 7, 7, 7, 0, 1, 3],
      [0, 7, 7, 7, 0, 0, 3, 3, 3, 0],
    ];

    assert.equal(game.playfield.length, 20);
    assert.equal(game.clearLines(), 2);
    assert.equal(game.playfield.length, 20);
    assertEqualMatrix(game.playfield, expected);
  });

  it('updateScore', () => {
    game.updateScore(0);
    assert.equal(game.score, 0);
    assert.equal(game.lines, 0);

    game.updateScore(1);
    assert.equal(game.score, 40);
    assert.equal(game.lines, 1);

    game.updateScore(2);
    assert.equal(game.score, 140);
    assert.equal(game.lines, 3);
  });

  it('bestScore', () => {
    game.score = 0;
    game.saveBestScore();
    assert.isNull(game.getBestScore());

    game.score = 10;
    game.saveBestScore();
    assert.equal(game.getBestScore(), 10);

    game.score = 4;
    game.saveBestScore();
    assert.equal(game.getBestScore(), 10);
  });

  it('level', () => {
    assert.equal(game.level, 0);

    game.lines = 10;
    assert.equal(game.level, 1);

    game.lines = 100;
    assert.equal(game.level, 10);
  });
});
