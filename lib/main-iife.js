var MyLib = (function (exports) {
    'use strict';

    function createStore(reducer) {
        let state;
        let listeners = [];
        function subscribe(callback) {
            listeners.push(callback);
        }
        function dispatch(action) {
            state = reducer(state, action);
            listeners === null || listeners === void 0 ? void 0 : listeners.forEach(listener => {
                listener();
            });
        }
        function getState() {
            return state;
        }
        const store = {
            subscribe,
            dispatch,
            getState,
        };
        return store;
    }

    exports.createStore = createStore;

    return exports;

})({});
//# sourceMappingURL=main-iife.js.map
