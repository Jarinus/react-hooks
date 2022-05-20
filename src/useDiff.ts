import { useEffect, useRef } from 'react'

/**
 * `useDiff` calls the `onChange` callback when `value` has changed between renders.
 */
export default function useDiff<T>(value: T, onChange: (previous: T, current: T) => void) {
  const ref = useRef<T>(value)

  useEffect(() => {
    if (ref.current !== value) {
      onChange(ref.current, value)
    }

    ref.current = value
  }, [value])
}
