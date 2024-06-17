import {createHooksStore} from "@apiknight/store/lib/hooks"

/*

    最推荐的方式，类似useState(),setState()的写法

*/

const ageStore = createHooksStore<number>(0,{withLocalStorage: 'age'})

export const useAgeValue = ageStore.useStoreValue

export const setAgeValue = ageStore.setStoreValue