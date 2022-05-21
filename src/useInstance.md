# Usage

## Default

```tsx
class Counter {
  count = 0
}

const Component = () => {
  const counter = useInstance(Counter)

  return <CountComponent counter={counter} />
}
```

## Using OnMount callback

```tsx
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

## Using OnDismount callback

```tsx
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
