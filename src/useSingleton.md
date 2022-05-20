# Usage

```tsx
class Counter {
  count = 0
}

const Component = () => {
  const counter = useSingleton(Counter)
  
  return <CountComponent counter={counter} />
}
```
