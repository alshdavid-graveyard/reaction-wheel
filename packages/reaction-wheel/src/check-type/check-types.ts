export function isObject (value: any) {
  return value && typeof value === 'object' && value.constructor === Object;
}

export function isArray (value: any) {
  return Array.isArray(value)
}