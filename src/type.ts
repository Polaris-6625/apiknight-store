export type Func<T = any> = (...args: T[]) => any;

export type Action<T = any, V = any> = (...args: T[]) => V;

export type FuncPromise = () => Promise<void>;

export interface StoreType<T = any> {
    subscribe: (callback: Func) => void;
    dispatch: (action?: any) => void;
    dispatchState: (state: T | Func) => void;
    getState: () => T | undefined;
    unSubscribe: (callback: Func) => void;
    getIsDispatching: () => boolean;
    setIsDispatching: (e: boolean) => void;
    dispatchSlice: (slice: Func) => void;
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