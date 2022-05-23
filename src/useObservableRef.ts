import { MutableRefObject, RefObject, useMemo, useRef } from 'react'
import { Observable } from './types/Observable'
import useObservable from './useObservable'

export default function useObservableRef<T>(initialValue: T): MutableRefObject<T> & Observable<T>

export default function useObservableRef<T>(initialValue: T | null): RefObject<T> & Observable<T>

export default function useObservableRef<T = undefined>(): MutableRefObject<T | undefined> & Observable<T | undefined>

export default function useObservableRef<T>(initialValue?: any): any {
  const ref = useRef<T>(initialValue)
  const [observable, emit] = useObservable<T>()

  return useMemo(() => {
    return new Proxy(ref, {
      get(target, property, receiver) {
        if (property === 'observe' || property === 'unobserve') {
          return Reflect.get(observable, property, receiver)
        }

        return Reflect.get(target, property, receiver)
      },
      set(target, property, value, receiver) {
        if (property === 'current' && value !== target[property]) {
          emit(value)
        }

        return Reflect.set(target, property, value, receiver)
      },
    })
  }, [])
}
