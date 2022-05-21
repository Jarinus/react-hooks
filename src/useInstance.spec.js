import { renderHook } from '@testing-library/react-hooks'
import useInstance from './useInstance'

describe('useInstance', () => {
  it('should mount', () => {
    const instance = {}
    const constructor = jest.fn().mockReturnValue(instance)

    const { result } = renderHook(() => useInstance(constructor))

    expect(result.current).toBe(instance)
  })

  it('should not call constructor more than once', () => {
    const instance = {}
    const constructor = jest.fn().mockReturnValue(instance)

    const { result, rerender } = renderHook(() => useInstance(constructor))

    rerender()

    expect(result.current).toBe(instance)
    expect(constructor).toBeCalledTimes(1)
  })

  it('should not call new constructor', () => {
    const instance = {}
    const constructor = jest.fn().mockReturnValue(instance)

    const { result, rerender } = renderHook((constructor) => useInstance(constructor), {
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
