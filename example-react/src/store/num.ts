/*
    基础内核版使用示例
*/

import { createStore } from "@apiknight/store/lib/index";

const initState = 0;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function reducer(state = initState, action: any) {
  switch (action.type) {
    case 'add':
      return state + action.payload;
    case 'minus':
      return state - action.payload;
  }
}

const numStore = createStore<number>(reducer);

export {numStore};