import { Dispatch, useCallback, useMemo, useRef } from 'react'
import { Observable } from './types/Observable'
import { Observer } from './types/Observer'

export type EmitAction<T> = T

export default function useObservable<T>(): [Observable<T>, Dispatch<EmitAction<T>>] {
  const observersRef = useRef<Observer<T>[]>([])

  const observable: Observable<T> = useMemo(() => ({
    observe(observer) {
      if (!observersRef.current.includes(observer)) {
        observersRef.current.push(observer)
      }

      return () => this.unobserve(observer)
    },
    unobserve(observer) {
      const index = observersRef.current.indexOf(observer)
      if (index === -1) {
        return
      }

      observersRef.current.splice(index, 1)
    },
  }), [])

  const emit: Dispatch<EmitAction<T>> = useCallback((value) => {
    setTimeout(() => {
      observersRef.current.forEach(observer => {
        observer(value)
      })
    })
  }, [])

  return [observable, emit]
}
