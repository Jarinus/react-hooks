# useObservableRef

`useObservableRef` combines `useRef` and `useObservable` into one.

When `ref.current` changes, observers are notified.

## Usage

### Default

```jsx
import { useEffect } from 'react'
import { useObservableRef } from '@jarinus/react-hooks'

const Component = () => {
  const ref = useObservableRef()

  useEffect(() => ref.observe(value => {
    console.log('ref.current has changed to', value)
  }), [])

  return <CountComponent ref={ref} />
}
```
