import { useEffect, useState } from "react"
import { Action, Func, HooksStoreType, MapperHooksStoreType, Options, StoreType } from "./type"
import { createStore, useSelector } from "./index"

const createMapperHooksStore = <Key,Result>(initValue?: Result,options?: Options): MapperHooksStoreType<Key,Result> => {

<<<<<<< HEAD
    const store = createStore(e => e,initValue,options)
    const storeMap = new Map<Key,Result>();
    // if (initValue != null && localStorage.getItem(options?.withLocalStorage as string) == null) {
    //     setStoreValue(0,initValue)
    // }
    // else {
    //     setStoreValue(0,store.getState())
    // }
    function useStoreValue(key: Key) {
        const storeValue = useSelector(storeMap.get(key) as StoreType,state => state)
=======
    const store = createStore(e => e)
    
    function useStoreValue() {
        const storeValue = useSelector(store,state => state)
>>>>>>> parent of df9f366 (feat: 增加localstorage存储能力)
        return storeValue
    }
    function setStoreValue(key: Key,value: Result | undefined): void
    function setStoreValue(key: Key,func: Func<Result>): void
    function setStoreValue(key: Key,value: Result | Func<Result> | undefined) {
        if (typeof value === 'function') {
            try {
                const currentStore = storeMap.get(key) as StoreType;
                currentStore.setIsDispatching(true);
                currentStore.dispatchSlice((value as Func<Result>))
                currentStore.setIsDispatching(false)
            }
            catch (error: any) {
                throw new Error(error)
            }
        }
        else {
            try {
                const currentStore = storeMap.get(key) as StoreType;
                currentStore.setIsDispatching(true);
                currentStore.dispatchState(value);
                currentStore.setIsDispatching(false);
            }
            catch (error: any) {
                throw new Error(error)
            }
        }
    }

<<<<<<< HEAD
    function loadStoreValue(key: Key,func: Action<Result,Promise<Result>>) {
=======
    if (initValue != null) {
        setStoreValue(initValue)
    }

    function loadStoreValue(func: Action<Result,Promise<Result>>) {
>>>>>>> parent of df9f366 (feat: 增加localstorage存储能力)
        async function _loadStoreValue() {
            try {
                const currentStore = storeMap.get(key) as StoreType;
                queueMicrotask(() => {
                    currentStore.setIsDispatching(true);
                });
                func().then((value) => {
                    currentStore.setIsDispatching(false)
                    setStoreValue(key,value)
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

    function getStoreValue(key: Key) {
        return (storeMap.get(key) as StoreType).getState()
    }


    function useStoreLoading(key: Key) {
        const currentStore = storeMap.get(key) as StoreType;
        const [loading, setLoading] = useState(currentStore.getIsDispatching());
        useEffect(() => {
            const callback = () => {
                setLoading(currentStore.getIsDispatching());
            };
            const id = Symbol();
            currentStore.subscribe(id,callback);
            return () => {
                currentStore.unSubscribe(id)
            };
        }, [currentStore]);
        return loading;
    }

    function getStoreLoading(key: Key) {
        return (storeMap.get(key) as StoreType).getIsDispatching()
    }


    function reset(key: Key) {
        setStoreValue(key,initValue)
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

const createHooksStore = <Result>(initValue?: Result,options?: Options): HooksStoreType<Result> => {
    const mapperStore = createMapperHooksStore<Number,Result>(initValue,options);
    return {
        useStoreValue: function() {
            return mapperStore.useStoreValue(0);
        },
        setStoreValue: function(value: Result | Func<Result> | undefined) {
            return mapperStore.setStoreValue(0,value as any)
        },
        loadStoreValue: function(func: Action) {
            return mapperStore.loadStoreValue(0,func)
        },
        getStoreValue: function() {
            return mapperStore.getStoreValue(0)
        },
        useStoreLoading: function() {
            return mapperStore.useStoreLoading(0)
        },
        getStoreLoading: function() {
            return mapperStore.getStoreLoading(0);
        },
        reset: function() {
            mapperStore.reset(0)
        }
    }
}

export { createMapperHooksStore , createHooksStore }