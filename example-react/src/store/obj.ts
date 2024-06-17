import {createHooksStore, createMapperHooksStore} from "@apiknight/store/lib/hooks"

/*

    最推荐的方式，类似useState(),setState()的写法

*/

interface Obj {
    name: string;
    age: number;
    hobbies: string[];
}

const initValue = {
    name: "apiknight",
    age: 18,
    hobbies: ["coding"],
}

const objStore = createMapperHooksStore<number,Obj>(initValue)

export const useObjValue = objStore.useStoreValue

export const setObjValue = objStore.setStoreValue