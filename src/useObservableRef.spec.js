import { renderHook } from '@testing-library/react-hooks'
import useObservableRef from './useObservableRef'

describe('useObservableRef', () => {
  it('should mount', () => {
    const { result } = renderHook(() => useObservableRef(0))
    const ref = result.current

    expect(ref.current).toBe(0)
  })

  it('should notify observers on change if value !== previous', () => {
    jest.useFakeTimers()

    const { result } = renderHook(() => useObservableRef(0))
    const ref = result.current

    const observer = jest.fn()
    ref.observe(observer)

    ref.current = 1

    expect(ref.current).toBe(1)

    jest.runAllTimers()

    expect(observer).toHaveBeenCalledWith(1)
  })

  it('should not notify observers on change if value === previous', () => {
    jest.useFakeTimers()

    const { result } = renderHook(() => useObservableRef(0))
    const ref = result.current

    const observer = jest.fn()
    ref.observe(observer)

    ref.current = 0

    expect(ref.current).toBe(0)

    jest.runAllTimers()

    expect(observer).not.toHaveBeenCalled()
  })

  it('should not notify unobserved observers on change', () => {
    jest.useFakeTimers()

    const { result } = renderHook(() => useObservableRef(0))
    const ref = result.current

    const observer = jest.fn()
    const unobserve = ref.observe(observer)

    ref.current = 1
    unobserve()

    expect(ref.current).toBe(1)

    jest.runAllTimers()

    expect(observer).not.toHaveBeenCalled()
  })
})
