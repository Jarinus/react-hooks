# useObserver

`useObserver` is a more concise syntax for observing an observable using `useEffect`.

## Usage

### Default

```jsx
import { useEffect } from 'react'
import { useObserver } from '@jarinus/react-hooks'

const Component = ({ observable }) => {
  useObserver(observable, (value) => {
    console.log('received', value)
  }, [observable])

  return <></>
}
```
