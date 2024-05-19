import { createStore } from "../../src/index";

const initState = 0;

function reducer(state = initState, action) {
  switch (action.type) {
    case 'add':
      return state + 1;
    case 'minus':
      return state - 1;
  }
}

const numStore = createStore(reducer);

export {numStore};