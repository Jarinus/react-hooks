# useInstance

`useInstance` instantiates the given class exactly once when the hook is first called. Subsequent renders will keep the
same instance.

Note that the class' constructor will be called on the server when using SSR. Any logic that depends on the client's
environment, such as using `window` or `document`, should be moved to the optional `onMount` callback instead.

## Usage

### Default

```tsx
import { useInstance } from '@jarinus/react-hooks'

class Counter {
  count = 0
}

const Component = () => {
  const counter = useInstance(Counter)

  return <CountComponent counter={counter} />
}
```

### Using `onMount` callback

```tsx
import { OnMount, useInstance } from '@jarinus/react-hooks'

class Counter implements OnMount {
  count = 0

  onMount() {
    console.log('Counter instance has mounted.')
  }
}

const Component = () => {
  const counter = useInstance(Counter)

  return <CountComponent counter={counter} />
}
```

### Using `onDismount` callback

```tsx
import { OnDismount, useInstance } from '@jarinus/react-hooks'

class Counter implements OnDismount {
  count = 0

  onDismount() {
    console.log('Counter instance has dismounted.')
  }
}

const Component = () => {
  const counter = useInstance(Counter)

  return <CountComponent counter={counter} />
}
```
