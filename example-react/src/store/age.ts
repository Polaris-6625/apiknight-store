import {createHooksStore} from "@apiknight/store/lib/hooks"

/*

    最推荐的方式，类似useState(),setState()的写法

*/

<<<<<<< HEAD
const ageStore = createHooksStore<number>(0,{withLocalStorage: 'age'})
=======
const ageStore = createMapperHooksStore<number>(0)
>>>>>>> parent of df9f366 (feat: 增加localstorage存储能力)

export const useAgeValue = ageStore.useStoreValue

export const setAgeValue = ageStore.setStoreValue