/*
    基础内核版+react-hooks,使用示例,不推荐使用
*/

import { createStore } from "@apiknight/store/lib/index";

const initState = "";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function reducer(state = initState, action: any) {
  switch (action.type) {
    case 'add':
      return state + action.payload;
  }
}

const strStore = createStore<string>(reducer);

export {strStore};