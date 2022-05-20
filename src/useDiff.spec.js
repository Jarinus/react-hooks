import { renderHook } from '@testing-library/react-hooks'
import useDiff from './useDiff'

describe('useDiff', () => {
  it('should mount', () => {
    const onChange = jest.fn()

    renderHook(() => useDiff(10, onChange))

    expect(onChange).not.toHaveBeenCalled()
  })

  it('should call onChange callback', () => {
    let value = 10
    const onChange = jest.fn()

    const { rerender } = renderHook(() => useDiff(value, onChange))

    value = 11
    rerender()

    expect(onChange).toHaveBeenCalledWith(10, 11)
  })

  it('should not call onChange callback', () => {
    let value = 10
    const onChange = jest.fn()

    const { rerender } = renderHook(() => useDiff(value, onChange))

    rerender()

    expect(onChange).not.toHaveBeenCalled()
  })
})
