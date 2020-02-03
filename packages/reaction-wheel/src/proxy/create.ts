import { emitter } from '../emitter'
import { checktype } from '../check-type'

export type ProxySubscriber<T = any> = (
  T & emitter.Emitter<void>
)

export function create<T = any>(source: T): ProxySubscriber<T> {
  const update$ = emitter.create<void>()
  ;(source as any).subscribe = update$.subscribe.bind(update$)
  return observe(source, update$)
}

function observe(
  source: any, 
  update$: emitter.Emitter<void>
): any {
  return new Proxy(source, {
    get: (s, p) => {
      if (
        checktype.isArray(s[p]) || 
        checktype.isObject(s[p])
      ) {
        return observe(s[p], update$)
      }
      return s[p]
    },
    set: (s, p, u) => {
      if (s[p] === u) {
        return true
      }
      s[p] = u
      update$.emit()
      return true
    }
  })
}
