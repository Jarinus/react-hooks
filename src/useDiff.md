# useDiff

`useDiff` calls the `onChange` callback when `value` has changed between renders.

## Usage

### Default

```jsx
import { useDiff } from '@jarinus/react-hooks'

const Component = () => {
  const [count, setCount] = useState(0)

  useDiff(count, (previous, current) => {
    console.log(`'count' changed by ${current - previous}`)
  })

  return <CountComponent count={count} onChange={setCount} />
}
```
