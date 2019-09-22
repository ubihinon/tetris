export default class Events {
    events = {
        View: {
            Controller: []
        },
        Game: {
            Controller: []
        },
        Controller: {
            View: ['renderEndScreen', 'renderMainScreen', 'renderPauseScreen'],
            Game: ['getState', 'movePieceLeft', 'movePieceRight', 'movePieceDown', 'rotatePiece', 'reset']
        },
    };

    hasAvailable(emitter, observer, method) {
        console.log(`Emitter: ${emitter}, observer: ${observer}, method: ${method}`);
        return this.events[emitter][observer].some(elem => elem === method);
    }
}