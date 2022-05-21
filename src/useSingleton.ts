import { useRef } from 'react'

export default function useSingleton<T>(InstanceClass: new () => T): T {
  const ref = useRef<T>()

  const instance = () => {
    if (ref.current == null) {
      ref.current = new InstanceClass()
    }

    return ref.current
  }

  return instance()
}
