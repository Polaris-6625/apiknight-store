import { useEffect, useState } from "react"
import { Action, Func, HooksStoreType, Options } from "./type"
import { createStore, useSelector } from "./index"

const createMapperHooksStore = <Result>(initValue?: Result,options?: Options): HooksStoreType<Result> => {

    const store = createStore(e => e)
    
    function useStoreValue() {
        const storeValue = useSelector(store,state => state)
        return storeValue
    }
    function setStoreValue(value: Result | undefined): void
    function setStoreValue(func: Func<Result>): void
    function setStoreValue(value: Result | Func<Result> | undefined) {
        if (typeof value === 'function') {
            try {
                store.setIsDispatching(true);
                store.dispatchSlice((value as Func<Result>))
                store.setIsDispatching(false)
            }
            catch (error: any) {
                throw new Error(error)
            }
        }
        else {
            try {
                store.setIsDispatching(true);
                store.dispatchState(value);
                store.setIsDispatching(false);
            }
            catch (error: any) {
                throw new Error(error)
            }
        }
    }

    if (initValue != null) {
        setStoreValue(initValue)
    }

    function loadStoreValue(func: Action<Result,Promise<Result>>) {
        async function _loadStoreValue() {
            try {
                queueMicrotask(() => {
                    store.setIsDispatching(true);
                });
                func().then((value) => {
                    store.setIsDispatching(false)
                    setStoreValue(value)
                })
            }
            catch (error: any) {
                throw new Error(error)
            }
            finally {
                store.setIsDispatching(false)
            }
        }
        return _loadStoreValue
    }

    function getStoreValue() {
        return store.getState()
    }


    function useStoreLoading() {
        const [loading, setLoading] = useState(store.getIsDispatching());
        useEffect(() => {
            const callback = () => {
                setLoading(store.getIsDispatching());
            };
            const id = Symbol();
            store.subscribe(id,callback);
            return () => {
                store.unSubscribe(id)
            };
        }, [store]);
        return loading;
    }

    function getStoreLoading() {
        return store.getIsDispatching()
    }


    function reset() {
        setStoreValue(initValue)
    }
    return {
        useStoreValue,
        setStoreValue,
        loadStoreValue,
        getStoreValue,
        useStoreLoading,
        getStoreLoading,
        reset
    }
}

export { createMapperHooksStore }