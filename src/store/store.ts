interface Action {
    type: string; 
    payload?: any;
}

interface Reducer { 
    [key: string]: Function;
}

export class Store<T extends Object> {
    private subsribers: Function[] = [];
    private state: T;

    constructor(
        private reducers: Reducer = {}, 
        initialState: T = {} as T
    ) {
        this.state = this.reduce(initialState, {});
    }

    get value(): T {
        return this.state;
    }

    subscribe(fn: (state: T) => void) {
        this.subsribers = [...this.subsribers, fn];
        this.notify();
        return () => {
            this.subsribers = this.subsribers.filter(sub => sub !== fn)
        }
    }

    dispatch(action: Action): void {
        this.state = this.reduce(this.state, action);
        this.notify();
    }

    private notify() {
        this.subsribers.forEach(fn => fn(this.value));
    }

    private reduce(state: T, action: Action | {}): T {
        const newState = {} as T;

        for (const prop in this.reducers) {
            newState[prop] = this.reducers[prop](state[prop], action);
        }

        return newState;
    }
}