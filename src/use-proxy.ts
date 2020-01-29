import { useState, useEffect } from 'react'
import { ProxySubscriber } from './create.js'

export const useProxy = <T,>(source: ProxySubscriber<T>): T => {
  const [ _, setValue ] = useState({})
  
  useEffect(() => {
    const sub = source.subscribe(v => setValue({}))
    return () => sub.unsubscribe()
  }, [ source ])

  return source as any
}