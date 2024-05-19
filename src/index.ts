import { useEffect, useRef, useState } from "react";
import { Func, StoreType } from "./type";

function createStore<T = any>(reducer: Func): StoreType<T> {
    let state: T | null;
    let listeners: Func[] = [];

    function subscribe(callback: Func) {
        listeners.push(callback);
    }

    function unloadScribe(func: Func) {
        const index = listeners.indexOf(func);
        listeners.splice(index, 1);
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
        unloadScribe
    }

    return store;
}

const useSelector = (store: StoreType, selector: Func) => {
    const [selectedState, setSelectedState] = useState(() => selector(store.getState()));

    useEffect(() => {
        const callback = () => {
            setSelectedState(selector(store.getState()));
        };
        store.subscribe(callback);

        return () => {
            store.unloadScribe(callback)
        };
    }, [store]);

    return selectedState;
};

export { createStore , useSelector }