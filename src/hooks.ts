import { useEffect, useRef, useState } from "react"
import { Action, Func, HooksStoreType } from "./type"
import { createStore, useSelector } from "./index"

const createMapperHooksStore = <Result>(initValue?: Result,options?: any): HooksStoreType<Result> => {

    const store = createStore(e => e)
    
    function useStoreValue() {
        const storeValue = useSelector(store,state => state)
        return storeValue
    }
    function setStoreValue(value: Result | undefined): void
    function setStoreValue(func: Func<Result>): void
    function setStoreValue(value: Result | Func<Result> | undefined) {
        if (typeof value === 'function') {
            store.setIsDispatching(true)
            try {
                store.setIsDispatching(false)
                store.dispatchSlice((value as Func<Result>))
            }
            catch (error: any) {
                throw new Error(error)
            }
            finally {
                store.setIsDispatching(false)
            }
        }
        else {
            store.setIsDispatching(true)
            try {
                store.setIsDispatching(false)
                store.dispatchState(value)
            }
            catch (error: any) {
                throw new Error(error)
            }
            finally {
                store.setIsDispatching(false)
            }
        }
    }

    if (initValue != null) {
        setStoreValue(initValue)
    }

    function loadStoreValue(func: Action) {
        store.setIsDispatching(true)
        try {
            func().then((value: Result) => {
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

    function getStoreValue() {
        return store.getState()
    }

    function useStoreLoading() {
        const [isLoading, setIsLoading] = useState(() => store.getIsDispatching());

        useEffect(() => {
            const callback = () => {
                setIsLoading(store.getIsDispatching());
            };
            store.subscribe(callback);

            return () => {
                store.unSubscribe(callback)
            };
        }, [store]);

        return isLoading;
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