import { emitter } from '../emitter'
import { checktype } from '../check-type'

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
  T & emitter.Emitter<void>
)

export function create<T = any>(source: T): ProxySubscriber<T> {
  const update$ = emitter.create<void>()
  const proxy = observe(source, update$)
  proxy.subscribe = update$.subscribe.bind(update$)
  return proxy
}

export function observe(
  source: any, 
  update$: emitter.Emitter<void>
): any {
  if (checktype.isArray(source)) {
    return observeArray(source, update$)
  }
  if (checktype.isObject(source)) {
    return observeObject(source, update$)
  }
}

export const observeObject = (source: Array<any>, update$: emitter.Emitter<void>) => {
  const proxy = {}
  for (const key in source) {
    if (checktype.isArray(source[key])) {
      source[key] = observeArray(source[key], update$)
    }
    if (checktype.isObject(source[key])) {
      source[key] = observeObject(source[key], update$)
    }
    Object.defineProperty(proxy, key, {
      enumerable: true,
      get: () => {
        return source[key]
      },
      set: (value) => {
        if (source[key] === value) {
          return true
        }
        source[key] = value
        update$.emit()
      }
    })
  } 
  return proxy
}

export const observeArray = (source: Array<any>, update$: emitter.Emitter<void>) => {
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
