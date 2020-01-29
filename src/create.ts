import { EventEmitter } from './event-emitter.js'
import { isArray, isObject } from './check-types.js'

export type ProxySubscriber<T = any> = (
  T & EventEmitter<void>
)

export function create<T = any>(source: T): ProxySubscriber<T> {
  const update$ = new EventEmitter<void>()
  return observe(source, update$)
}

function observe(
  source: any, 
  update$: EventEmitter<void>
): any {
  return new Proxy(source, {
    get: (s, p) => {
      if (p === 'subscribe') {
        return update$.subscribe.bind(update$)
      }
      if (isArray(s[p]) || isObject(s[p])) {
        return observe(s[p], update$)
      }
      return s[p]
    },
    set: (s, p, u) => {
      update$.emit()
      s[p] = u
      return true
    }
  })
}
