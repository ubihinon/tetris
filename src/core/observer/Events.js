export default class Events {
    events = {
      View: {
        Controller: ['getState', 'getBestScore'],
      },
      Game: {
        Controller: ['getState', 'update', 'lineDeleting'],
      },
      Controller: {
        View: ['updateView', 'playLineDeleting'],
        Game: [
          'getState', 'movePieceLeft', 'movePieceRight', 'movePieceDown', 'rotatePiece',
          'reset', 'play', 'pause', 'startTimer', 'stopTimer', 'getBestScore',
        ],
      },
    };

    hasAvailable(emitter, observer, method) {
      return this.events[emitter][observer].some((elem) => elem === method);
    }
}
