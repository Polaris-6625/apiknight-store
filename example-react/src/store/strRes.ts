import { createHooksStore } from "@apiknight/store/lib/hooks";


const strRes = createHooksStore<string>('',{withLocalStorage: 'user'});

export const useStrRes = strRes.useStoreValue

export const setStrRes = strRes.setStoreValue

const fetchLoad = async () => {
  const res = await fetch('http://localhost:3000?a=1')
  return res.text()
}

export const loadStrRes = strRes.loadStoreValue(fetchLoad)

export const useLoading = strRes.useStoreLoading