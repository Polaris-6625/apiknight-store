import { useEffect, useState } from "react";
import { Func, StoreType } from "./type";

function createStore<T = any>(reducer: Func): StoreType<T> {
    let state: T | undefined = void 0;
    let listeners: Func[] = [];
    let isDispatching = false;
    function subscribe(callback: Func) {
        if (isDispatching) {
            throw new Error("Reducer此时不得派发动作。");
        }
        listeners.push(callback);
    }

    function unSubscribe(func: Func) {
        if (isDispatching) {
            throw new Error("Reducer此时不得派发动作。");
        }
        const index = listeners.indexOf(func);
        listeners.splice(index, 1);
    }

    function dispatch(action: any) {
        if (isDispatching) {
            throw new Error("Reducers may not dispatch actions.");
        }
        try {
            isDispatching = true;
            state = reducer(state, action);
        }
        catch (error) {
            throw error;
        }
        finally {
            isDispatching = false;
        }
        listeners?.forEach(listener => {
            listener();
        });
    }

    function dispatchState(value: T | Func) {
        if (isDispatching) {
            throw new Error("Reducers may not dispatch actions.");
        }
        try {
            if (typeof state === "function") {
                state = (value as Func)();
                isDispatching = true;
            }
            else {
                state = reducer(value);
                isDispatching = true;
            }
        }
        catch (error) {
            throw error;
        }
        finally {
            isDispatching = false;
        }
        listeners?.forEach(listener => {
            listener();
        });
    }

    function dispatchSlice(newReducer: Func) {
        if (isDispatching) {
            throw new Error("Reducers may not dispatch actions.");
        }
        try {
            state = newReducer(state);
            isDispatching = true;
        }
        catch (error) {
            throw error;
        }
        finally {
            isDispatching = false;
        }
        listeners?.forEach(listener => {
            listener();
        });
    }

    function getState() {
        if (isDispatching) {
            throw new Error("Reducer此时不得派发动作。");
        }
        return state;
    }

    function getIsDispatching() {
        return loading;
    }
    let loading = isDispatching;
    function setIsDispatching(dispatchState: boolean) {
        loading = reducer(dispatchState);
        listeners?.forEach(listener => {
            listener();
        });
    }

    const store = {
        subscribe,
        dispatch,
        getState,
        unSubscribe,
        getIsDispatching,
        setIsDispatching,
        dispatchState,
        dispatchSlice
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
            store.unSubscribe(callback)
        };
    }, [store]);

    return selectedState;
}; 


function createMapperStore<Params = any,Result = any>(
    {params, result}: {params: Params,result?: Result},
    reducer: Func,
) {
    const map = new Map<Params,{result:Result,listeners: Func[]}>();
    let listeners: Func[] = [];
    map.set(params, {result: result as Result,listeners});
    function subscribe(key: Params,callback: Func) {
        map.get(key)?.listeners?.push(callback);
    }
    function unSubscribe(key: Params,func: Func) {
        const index = map.get(key)?.listeners?.indexOf(func);
        map.get(key)?.listeners?.splice(index as number, 1);
    }
    function dispatch(key: Params, action: any) {
        const stateEntry = map.get(key);
        if (stateEntry) {
            stateEntry.result = reducer(stateEntry.result, action);
            stateEntry.listeners.forEach(listener => {
                listener();
            });
        } else {
            console.warn(`Key ${key} 不存在于此store中。`);
        }
    }
    function getState(key: Params) {
        return map.get(key)?.result;
    }
    const store = {
        subscribe,
        dispatch,
        getState,
        unSubscribe
    }
    return store;
}

const useMapperSelector = <Params = any,Result = any>(store: any, key: Params, selector: Func): Result => {
    const [selectedState, setSelectedState] = useState(() => selector(store.getState(key)));
    useEffect(() => {
        const callback = () => {
            setSelectedState(selector(store.getState(key)));
        };
        store.subscribe(key, callback);
        return () => {
            store.unSubscribe(key, callback);
        };
    }, [store, key]); // 添加 key 到依赖数组中

    return selectedState;
};


export { createStore , useSelector , createMapperStore , useMapperSelector }