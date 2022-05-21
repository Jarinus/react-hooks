# useInstance

`useInstance` instantiates the given class exactly once when the hook is first called. Subsequent renders will keep the
same instance.

## SSR (Server-Side Rendering)

When using SSR, the class' constructor will be called once on the server and once on the client.

## Hot Reloading

If your hot reloading system maintains component state across reloads, such as `react-hot-loader`
or [Next.js](https://nextjs.org/docs/basic-features/fast-refresh), the instance will not reflect any
changes to its class' code.

This is due to `useInstance` using a `React.useRef` to save the instance.

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
