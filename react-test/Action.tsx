import React from "react";
import { store } from "./store/store";
import { numStore } from "./store/num";
import { useCallback } from "react";

function Action() {
    // store.dispatch({ type: 'PUT_MILK',count: 1 });    // milk: 1
    // store.dispatch({ type: 'PUT_MILK',count: 1  });    // milk: 2
    // store.dispatch({ type: 'TAKE_MILK',count: 1  });   // milk: 1
    const add = useCallback(() => {
        numStore.dispatch({type: 'add',count: 1});
    },[numStore])
    return (
        <div>
            <button onClick={add}>action</button>
        </div>
    )
}

export default Action;