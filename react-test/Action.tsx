import React from "react";
import { store } from "./store";

function Action() {
    store.dispatch({ type: 'PUT_MILK',count: 1 });    // milk: 1
    store.dispatch({ type: 'PUT_MILK',count: 1  });    // milk: 2
    store.dispatch({ type: 'TAKE_MILK',count: 1  });   // milk: 1
    return (
        <div>
            action
        </div>
    )
}

export default Action;