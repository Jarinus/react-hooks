import { renderHook } from '@testing-library/react-hooks'
import useObserver from './useObserver'
import useObservable from './useObservable'

describe('useObserver', () => {
  jest.useFakeTimers()

  let observable
  let emit

  beforeEach(() => {
    const { result } = renderHook(() => useObservable())
    ;([observable, emit] = result.current)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should mount', () => {
    const observer = jest.fn()

    renderHook(() => useObserver(observable, observer))

    jest.runAllTimers()

    expect(observer).not.toHaveBeenCalled()
  })

  it('should be notified', () => {
    const observer = jest.fn()

    renderHook(() => useObserver(observable, observer))

    emit()

    jest.runAllTimers()

    expect(observer).toHaveBeenCalledWith(undefined)
  })

  it('should not be notified', () => {
    const observer = jest.fn()

    const { unmount} = renderHook(() => useObserver(observable, observer))

    unmount()
    jest.runAllTimers()

    emit()

    expect(observer).not.toHaveBeenCalled()
  })

  it('should handle dependency change', () => {
    jest.spyOn(observable, 'observe')
    jest.spyOn(observable, 'unobserve')

    const observer = jest.fn()

    let dependency = 0

    const { rerender } = renderHook(() => useObserver(observable, observer, [dependency]))

    dependency = 1
    rerender()

    expect(observable.observe).toHaveBeenCalledTimes(2)
    expect(observable.unobserve).toHaveBeenCalledTimes(1)
  })
})
