import { useState } from 'react'
import './App.css'
import { numStore } from './store/num'
import Action from './components/Action'
import { strStore } from './store/string'
import { useSelector } from '@apiknight/store/lib'
import { useObjValue } from './store/obj'
import { useAgeValue } from './store/age'
import FetchShow from './components/FetchShow'
import { setCurrentMusic, useCurrentMusic } from './store/music'

function App() {
  // 纯内核版使用方式，自行维护type,reducer,和更新逻辑，兼容React,Vue,原生等框架
  const [num, setNum] = useState<number | undefined>(numStore.getState() || 0)
  // 添加一个回调，记得销毁
  numStore.subscribe(() => {
      setNum(numStore.getState())
  })
  // 基础内核版+react-hooks,使用示例,不推荐使用,不需要维护回调，自动同步
  const str = useSelector(strStore,state => state)

  // 最推荐的使用方式
  const age = useAgeValue()
  const obj = useObjValue()
  const currentMusic = useCurrentMusic()
  return (
    <>
      <div>
        num: {num}
      </div>
      <div>
        str: {str}
      </div>
      <div>
        obj: {JSON.stringify(obj)}
      </div>
      <div>
        age: {age}
      </div>
      <div>
        currentMusic: {JSON.stringify(currentMusic)}
      </div>
      <Action />
      <button onClick={() => {
        setCurrentMusic({
          id: 1,
          url: `https://music.163.com/song/media/outer/url?id=2.mp3`,
          title: '2',
          artist: '艺术家',
      })
      }}>音乐测试</button>
      <button onClick={async () => {
        const res = await fetch('http://localhost:3000/music');
        const data = await res.json();
        console.log(data)
        setCurrentMusic(data)
      }}>load音乐</button>
      <FetchShow />
    </>
  )
}

export default App
