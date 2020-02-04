# Reaction Wheel

Add Reactivity to React

https://stackblitz.com/edit/react-ts-lcc226

```tsx
import React, { Component } from 'react';
import { render } from 'react-dom';
import rw from 'reaction-wheel'
import { useReactive } from 'reaction-wheel-react'

class Items {
  store = []

  add(msg: string) {
    this.store.push(msg)
  }
}

const items$ = rw.create(new Items())

const App = () => {
  const items = useReactive(items$)

  const onClick = () => items.add(prompt('Enter Item Message'))

  return <div>
    <button onClick={onClick}>Add</button>
    { items.store.map(item => <div>{item}</div>) }
  </div>
}

render(<App />, document.getElementById('root'));

```