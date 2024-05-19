import { createMapperStore } from "../../src/index";

const initState = 0;

function reducer(state = initState, action) {
  switch (action.type) {
    case 'add':
      return state + 1;
    case 'minus':
      return state - 1;
  }
}

const mapperNumStore = createMapperStore<number,number>({params: 1,result: initState}, reducer);

export {mapperNumStore};