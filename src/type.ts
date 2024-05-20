export type Func = (...args: any[]) => any;

export interface StoreType<T = any> {
    subscribe: (callback: Func) => void;
    dispatch: (action?: any,inputReducer?: Func) => void;
    getState: () => T | undefined;
    unSubscribe: (callback: Func) => void;
}