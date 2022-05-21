import { useRef } from 'react'
import { Constructor } from './types/Constructor'

export default function useSingleton<T>(InstanceClass: Constructor<T>): T {
  const ref = useRef<T>()

  const instance = () => {
    if (ref.current == null) {
      ref.current = new InstanceClass()
    }

    return ref.current
  }

  return instance()
}
