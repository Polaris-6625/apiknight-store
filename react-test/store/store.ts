import { createStore } from "../../src/index";

const initState = {
    milk: 0
};

function reducer(state = initState, action: any) {
    switch (action.type) {
      case 'PUT_MILK':
        return {...state, milk: state.milk + action.count};
      case 'TAKE_MILK':
        return {...state, milk: state.milk - action.count};
      default:
        return state;
    }
}

let store = createStore(reducer,initState);

export {store}