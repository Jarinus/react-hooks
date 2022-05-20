import { renderHook } from '@testing-library/react-hooks'
import useSingleton from './useSingleton'

describe('useSingleton', () => {
  it('should mount', () => {
    const instance = {}
    const constructor = jest.fn().mockReturnValue(instance)

    const { result } = renderHook(() => useSingleton(constructor))

    expect(result.current).toBe(instance)
  })

  it('should not call constructor more than once', () => {
    const instance = {}
    const constructor = jest.fn().mockReturnValue(instance)

    const { result, rerender } = renderHook(() => useSingleton(constructor))

    rerender()

    expect(result.current).toBe(instance)
    expect(constructor).toBeCalledTimes(1)
  })

  it('should not call new constructor', () => {
    const instance = {}
    const constructor = jest.fn().mockReturnValue(instance)

    const { result, rerender } = renderHook((constructor) => useSingleton(constructor), {
      initialProps: constructor
    })

    const newInstance = {}
    const newFactory = jest.fn().mockReturnValue(newInstance)
    rerender(newFactory)

    expect(result.current).toBe(instance)
    expect(result.current).not.toBe(newInstance)
    expect(constructor).toHaveBeenCalledTimes(1)
    expect(newFactory).not.toHaveBeenCalled()
  })
})
