import { EventEmitter } from './event-emitter'
import { isArray, isObject } from './check-types'

const methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]

export type ProxySubscriber<T = any> = (
  T & EventEmitter<void>
)

export function create<T = any>(source: T): ProxySubscriber<T> {
  const update$ = new EventEmitter<void>()
  const proxy = observe(source, update$)
  proxy.subscribe = update$.subscribe.bind(update$)
  return proxy
}

export function observe(
  source: any, 
  update$: EventEmitter<void>
): any {
  if (isArray(source)) {
    return observeArray(source, update$)
  }
  if (isObject(source)) {
    return observeObject(source, update$)
  }
}

export const observeObject = (source: Array<any>, update$: EventEmitter<void>) => {
  const proxy = {}
  for (const key in source) {
    if (isArray(source[key])) {
      source[key] = observeArray(source[key], update$)
    }
    if (isObject(source[key])) {
      source[key] = observeObject(source[key], update$)
    }
    Object.defineProperty(proxy, key, {
      enumerable: true,
      get: () => {
        return source[key]
      },
      set: (value) => {
        source[key] = value
        update$.emit()
      }
    })
  } 
  return proxy
}

export const observeArray = (source: Array<any>, update$: EventEmitter<void>) => {
  const proxy = [ ...source ]
  for (const method of methodsToPatch) {
    patchMethod(proxy, method, () => update$.emit())
  }
  return proxy
}

export const patchMethod = (target: any, methodKey: string, patch: () => void) => {
  const original = target[methodKey]
  
  target[methodKey] = function () {
    original.apply(target, arguments)
    patch()
  }
}
