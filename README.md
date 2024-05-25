# 一种全新的store库

- 基础能力版，采用ts实现的发布订阅，兼容vue,reack,原生js等框架。

- react-hooks+基础能力版，提供hooks，更方便的监听state的变化。**（更推荐使用下一种）**

- 最推荐的方式（React hooks可用），提供了大量React hooks，不再需要维护type和reducer，可以实现类似useState,setState式的使用方式 **推荐**

## 文档

### 安装

```bash

npm install @apiknight/store --save

```

### 基础版本（不提供hooks）

因为这种写法没有使用hooks，所以需要手动维护type和reducer。兼容vue,react,原生js等框架。

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

const numStore = createStore<number>(reducer);

export {numStore};

```

其中,`<T>`中指定类型,`initState` 指定初始值，可选，默认值是 `undefined`，`reducer` 指定 reducer 函数。

`createStore` 返回一个 store，它包含以下属性：

- `getState()`：返回当前state。
- `dispatch(action: Action)`：分发 action，触发 reducer 函数。
- `subscribe(listener: () => void)`：注册监听器，当 state 发生变化时，自动调用 listener。
- `unsubcribe`: 取消监听器。

因为内核没有提供定制化的hooks，所以不仅需要手动维护type和reducer，对于监听等操作还需要使用`subscribe`来注册回调。


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

### 对于React-hooks版本


我们还额外提供了`useSelector()`这个hooks，可以用来监听state的变化, 返回当前state。

```tsx

const numStoreValue = useSelector(numStore,state => state);

```

mapper结果使用方式与`createStore()`一致。不过hooks是：`useMapperSelector`

```tsx

const numStoreValue = useMapperSelector<number,number>(mapperNumStore,1,state => state);

```

### 最推荐的方式（React hooks可用）

```tsx

import { createMapperHooksStore } from '@apiknight/store/lib/hooks'

const numStore = createMapperHooksStore<number>(0)

export const useNum = numStore.useStoreValue // 监听state变化

export const setNum = numStore.setStoreValue // 修改state，支持value或者callback

```