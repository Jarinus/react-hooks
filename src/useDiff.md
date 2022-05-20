# Usage

```tsx
const Component = () => {
  const [count, setCount] = useState(0)

  useDiff(count, (previous) => {
    console.log(`'count' changed by ${count - previous}`)
  })

  return <CountComponent count={count} onChange={setCount} />
}
```
