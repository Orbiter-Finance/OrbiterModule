export * from './request'
export * from './chains'
export * from './abiUtil'
export { isEmpty, groupBy, orderBy, maxBy, uniqBy, padStart } from 'lodash'

export function equals<T, U extends T>(
  val1: T,
  val2: U,
  ignoreCase: boolean = true
) {
  if (val1 === val2) {
    return true
  }
  if (ignoreCase && String(val1).toLowerCase() === String(val2).toLowerCase()) {
    return true
  }
  return false
}