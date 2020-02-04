import { useState, useEffect } from 'react'
import rw from 'reaction-wheel'

export const useReactive = <T,>(source: rw.ProxySubscriber<T>): T => {
  const [ _, setValue ] = useState({})
  
  useEffect(() => {
    const sub = source.subscribe(v => setValue({}))
    return () => sub.unsubscribe()
  }, [ source ])

  return source as any
}