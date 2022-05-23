import { DependencyList, useEffect } from 'react'
import { Observable } from './types/Observable'
import { Observer } from './types/Observer'

export default function useObserver<T>(observable: Observable<T>, observer: Observer<T>, deps?: DependencyList) {
  useEffect(() => observable.observe(observer), deps)
}
