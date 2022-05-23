import { renderHook } from '@testing-library/react-hooks'
import useObservable from './useObservable'

describe('useObservable', () => {
  jest.useFakeTimers()

  it('should mount', () => {
    renderHook(() => useObservable())
  })

  it('should notify observers', () => {
    const { result } = renderHook(() => useObservable())
    const [observable, emit] = result.current

    const observer = jest.fn()
    observable.observe(observer)

    emit(0)

    expect(observer).not.toHaveBeenCalled()

    jest.runOnlyPendingTimers()

    expect(observer).toHaveBeenCalledWith(0)
  })

  it('should notify observers without a value', () => {
    const { result } = renderHook(() => useObservable())
    const [observable, emit] = result.current

    const observer = jest.fn()
    observable.observe(observer)

    emit()

    expect(observer).not.toHaveBeenCalled()

    jest.runOnlyPendingTimers()

    expect(observer).toHaveBeenCalledWith(undefined)
  })

  it('should notify observers chronologically', () => {
    const { result } = renderHook(() => useObservable())
    const [observable, emit] = result.current

    const observer = jest.fn()
    observable.observe(observer)

    emit(0)
    emit(1)

    expect(observer).not.toHaveBeenCalled()

    jest.runOnlyPendingTimers()

    expect(observer).toHaveBeenCalledTimes(2)
    expect(observer.mock.calls[0]).toEqual([0])
    expect(observer.mock.calls[1]).toEqual([1])
  })

  it('should notify new observers if observed in same render cycle', () => {
    const { result } = renderHook(() => useObservable())
    const [observable, emit] = result.current

    emit(0)

    const observer = jest.fn()
    observable.observe(observer)

    expect(observer).not.toHaveBeenCalled()

    jest.runOnlyPendingTimers()

    expect(observer).toHaveBeenCalledWith(0)
  })

  it('should not notify new observers if observed in later render cycle', () => {
    const { result } = renderHook(() => useObservable())
    const [observable, emit] = result.current

    emit(0)

    jest.runOnlyPendingTimers()

    const observer = jest.fn()
    observable.observe(observer)

    expect(observer).not.toHaveBeenCalled()
  })

  it('should not notify unobserved observers', () => {
    const { result } = renderHook(() => useObservable())
    const [observable, emit] = result.current

    const observer = jest.fn()
    const unobserve = observable.observe(observer)

    unobserve()
    emit(0)

    expect(observer).not.toHaveBeenCalled()
  })

  it('should not notify unobserved observers if unobserved after emit in same render cycle', () => {
    const { result } = renderHook(() => useObservable())
    const [observable, emit] = result.current

    const observer = jest.fn()
    const unobserve = observable.observe(observer)

    emit(0)
    unobserve()

    jest.runOnlyPendingTimers()

    expect(observer).not.toHaveBeenCalled()
  })
})
