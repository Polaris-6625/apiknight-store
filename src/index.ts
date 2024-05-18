import { Func } from "./type";

function createStore<T = any>(reducer: Func) {
    let state: T | null;
    let listeners: Func[] = [];

    function subscribe(callback: Func) {
        listeners.push(callback);
    }

    function dispatch(action: any) {
        state = reducer(state, action)
        listeners?.forEach(listener => {
            listener();
        })
    }

    function getState() {
        return state;
    }

    const store = {
        subscribe,
        dispatch,
        getState,
    }

    return store;
}

export { createStore }