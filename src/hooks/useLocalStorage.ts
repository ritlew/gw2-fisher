// react
import { useState } from 'react'

const useLocalStorage = <T>(
  key: string,
  initial: T
): [T, (data: T) => void] => {
  const storageDataStr = localStorage.getItem(key)
  let data: T = initial
  if (storageDataStr) {
    try {
      data = JSON.parse(storageDataStr)
    } catch (error) {
      localStorage.setItem(key, JSON.stringify(initial))
    }
  } else {
    localStorage.setItem(key, JSON.stringify(initial))
  }

  return [data, (data) => localStorage.setItem(key, JSON.stringify(data))]
}

const useLocalStorageState = <T>(
  key: string,
  initial: T
): [T, (data: T) => void] => {
  const [storageData, setDataStorage] = useLocalStorage<T>(key, initial)
  const [data, setData] = useState<typeof initial>(storageData)

  return [
    data,
    (data) => {
      setDataStorage(data)
      setData(data)
    },
  ]
}

export default useLocalStorage
export { useLocalStorageState }
