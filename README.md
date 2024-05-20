# 尝试手写一个store库

- React已经可以使用了

- vue的test demo没有配置好打包 // todo

## 文档

### 安装

```bash

npm install @apiknight/store --save

```

### 使用方式一

通过 `createStore` 创建 store:

```ts

import { createStore } from "@apiknight/store/lib/index";

const initState = 0;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function reducer(state = initState, action: any) {
  switch (action.type) {
    case 'add':
      return state + 1;
    case 'minus':
      return state - 1;
  }
}

const numStore = createStore<number>(reducer,initState);

export {numStore};

```

其中,`<T>`中指定类型,`initState` 指定初始值，可选，默认值是 `undefined`，`reducer` 指定 reducer 函数。

`createStore` 返回一个 store，它包含以下属性：

- `getState()`：返回当前state。
- `dispatch(action: Action)`：分发 action，触发 reducer 函数。
- `subscribe(listener: () => void)`：注册监听器，当 state 发生变化时，自动调用 listener。
- `unsubcribe`: 取消监听器。

我们还额外提供了`useSelector()`这个hooks，可以用来监听state的变化, 返回当前state。

```tsx

const numStoreValue = useSelector(numStore,state => state);

```

### 使用方式二

针对键值对类型的state，可以使用`createMapperStore()`创建store。

```tsx

import { createMapperStore } from "@apiknight/store/lib/index";

const initState = 0;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function reducer(state = initState, action: any) {
  switch (action.type) {
    case 'add':
      return state + 1;
    case 'minus':
      return state - 1;
  }
}

const mapperNumStore = createMapperStore<number,number>({params: 1,result: initState}, reducer);

export {mapperNumStore};

```

其他使用方式与`createStore()`一致。不过hooks是：`useMapperSelector`

```tsx

const numStoreValue = useMapperSelector<number,number>(mapperNumStore,1,state => state);

```
