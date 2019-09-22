export default class Events {
    events = {
        View: {
            Controller: ['getState', 'getBestScore']
        },
        Game: {
            Controller: ['getState', 'update']
        },
        Controller: {
            View: ['updateView'],
            Game: [
                'getState', 'movePieceLeft', 'movePieceRight', 'movePieceDown', 'rotatePiece',
                'reset', 'play', 'pause', 'startTimer', 'stopTimer', 'getBestScore'
            ]
        },
    };

    hasAvailable(emitter, observer, method) {
        console.log(`Emitter: ${emitter}, observer: ${observer}, method: ${method}`);
        return this.events[emitter][observer].some(elem => elem === method);
    }
}