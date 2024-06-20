export type Func<T = any> = (...args: T[]) => any;

export type Action<T = any, V = any> = (...args: T[]) => V;

export type FuncPromise = () => Promise<void>;

export interface StoreType<T = any> {
    subscribe: (id:Symbol,callback: Func) => void;
    dispatch: (action?: any) => void;
    dispatchState: (state: T | Func) => void;
    getState: () => T | undefined;
    unSubscribe: (id: Symbol) => void;
    getIsDispatching: () => boolean;
    setIsDispatching: (e: boolean) => void;
    dispatchSlice: (slice: Func) => void;
}
export interface MapperHooksStoreType <Key = number,T = any> {
    useStoreValue: (key: Key) => T;
    setStoreValue: { (key: Key,value: T | undefined): void; (key: Key,func: Func<T>): void; }
    loadStoreValue: (key: Key,func: Action) => FuncPromise
    getStoreValue: (key: Key) => T;
    useStoreLoading: (key: Key) => boolean;
    getStoreLoading: (key: Key) => boolean;
    reset: (key: Key) => void;
}

export interface HooksStoreType<T = any> {
    useStoreValue: () => T;
    setStoreValue: { (value: T | undefined): void; (func: Func<T>): void; }
    loadStoreValue: (func: Action) => FuncPromise
    getStoreValue: () => T;
    useStoreLoading: () => boolean;
    getStoreLoading: () => boolean;
    reset: () => void;
}

export interface Options {
    withLocalStorage?: boolean;
}