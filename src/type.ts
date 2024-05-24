export type Func = (...args: any[]) => any;

export type Action = <T = any, V = any>(...args: T[]) => V;
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