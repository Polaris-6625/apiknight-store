import { Func } from "./type";
declare function createStore<T = any>(reducer: Func): {
    subscribe: (callback: Func) => void;
    dispatch: (action: any) => void;
    getState: () => T | null;
};
export { createStore };
