export function defaultEqualFns<T>(a: T, b: T) {
  return a === b
}

export const Comparse = {
  LESS_THAN: -1,
  BIGGER_THAN: 1
}

export function defaultComparse<T> (a: T, b: T) {
  if (a === b) return 0
  return a < b ? Comparse.LESS_THAN : Comparse.BIGGER_THAN
}