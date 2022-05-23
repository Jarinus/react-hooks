# useObservable

`useObservable` creates an `Observable` and an accompanying `EmitAction`.

Both are safe to omit from dependency lists, as they will never change.

## Usage

### Default

```jsx
import { useEffect } from 'react'
import { useObservable } from '@jarinus/react-hooks'

const Component = () => {
  const [observable, emit] = useObservable()

  useEffect(() => {
    emit('mount')
    return () => emit('dismount')
  }, [])

  return <CountComponent observable={observable} />
}
```
