export type Func = (...args: any[]) => any;

export interface StoreType<T = any> {
    subscribe: (callback: Func) => void;
    dispatch: (action: T) => void;
    getState: () => T;
    unloadScribe: (callback: Func) => void;
}