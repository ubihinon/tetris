import Events from "./Events";

export default class EventObserver extends Events {
    constructor() {
        super();
        this.emitter = null;
        this.observers = [];
    }

    subscribe(subscriber) {
        this.observers.push(subscriber);
    }

    unsubscribe(subscriber) {
        this.observers.splice(this.observers.indexOf(subscriber), 1);
    }

    addEmitter(name) {
        this.emitter = name;
    }

    notify(name, data) {
        let res = null;
        this.observers.forEach(subscriber => {
            if (super.hasAvailable(this.emitter, subscriber.className, name) && subscriber[name](data)) {
                res = subscriber[name](data);
            }
        });
        return res;
    }
}