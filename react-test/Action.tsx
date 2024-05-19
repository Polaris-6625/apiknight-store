import React from "react";
import { numStore } from "./store/num";
import { useCallback } from "react";
import { mapperNumStore } from "./store/mapperDemo";

function Action() {
    const add = useCallback(() => {
        numStore.dispatch({type: 'add',count: 1});
    },[numStore])
    const add2 = useCallback(() => {
        mapperNumStore.dispatch(1,{type: 'add',count: 2});
    },[numStore])
    return (
        <div>
            <button onClick={add}>action</button>
            <button onClick={add2}>Mapper Action</button>
        </div>
    )
}

export default Action;