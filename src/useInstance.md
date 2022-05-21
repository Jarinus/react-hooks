# Usage

```tsx
class Counter {
  count = 0
}

const Component = () => {
  const counter = useInstance(Counter)
  
  return <CountComponent counter={counter} />
}
```
