# Reaction Wheel

Add Reactivity to React

```tsx
import rw from 'reaction-wheel'
import { useReactive } from 'reaction-wheel-react'

class Items {
  store = []

  add(msg: string) {
    this.store.push(msg)
  }
}

const items = rw.create(new Items())

const App = () => {
  const items = useReactive(items)

  const onClick = () => {
    items.add(prompt('Enter Item Message'))
  }

  return <div>
    <button onClick={}>Add</button>
    { items.store.map(item => <div>{item}</div>) }
  </div>
}
```