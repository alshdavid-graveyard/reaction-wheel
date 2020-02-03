export type callback<T = any> = (value: T) => void

export interface Subscription {
  unsubscribe: () => void
}

export class EventEmitter<T> {
  private subscribers: Record<string, callback<T>> = {}

  subscribe(cb: callback<T>): Subscription {
    const key = (Math.random() * 1000000000000000).toFixed().toString()
    this.subscribers[key] = cb
    return {
      unsubscribe: () => delete this.subscribers[key]
    }
  }

  emit(value: T) {
    for (const key of Object.keys(this.subscribers)) {
      this.subscribers[key](value)
    }
  }
}

