import { useCallback } from "react";
import { numStore } from "../store/num";
import { strStore } from "../store/string";
import { setObjValue, useObjValue } from "../store/obj";
import { setAgeValue } from "../store/age";

function Action() {
    const handleNumClick = useCallback((count: number) => {
        numStore.dispatch(
            {type: 'add', payload: count}
        )
    },[])
    const handleStrClick = useCallback((str: string) => {
        strStore.dispatch(
            {type: 'add', payload: str}
        )
    },[])
    const obj = useObjValue()
    const handleClickPushHobby = useCallback((hobby: string) => {
        setObjValue(
            {...obj,hobbies: [...obj.hobbies, hobby]}
        )
    },[obj])
    return (
        <div>
            <button onClick={() => {
                handleNumClick(1)
            }}>
                num+1
            </button>
            <button onClick={() => {
                handleStrClick("hello, world!")
            }}>
                str+"hello, world!"
            </button>
            <button onClick={
                () => {
                    handleClickPushHobby("football")
                }
            }>
                push a hobby in obj
            </button>
            <button onClick={
                () => setAgeValue(state => state+1)
            }>
                age ++
            </button>
        </div>
    )
}

export default Action;