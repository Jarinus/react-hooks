import { Observer } from './Observer'

export interface Observable<T> {
  observe(observer: Observer<T>): () => void

  unobserve(observer: Observer<T>): void
}
