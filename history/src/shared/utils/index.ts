import * as day from 'dayjs'

const dayjs: any = day;
export function formateTimestamp(timestamp: number | string) {
  return dayjs(+timestamp).format('YYYY-MM-DD HH:mm:ss')
}

/**
 * String equals ignore case
 * @param value1
 * @param value2
 * @returns
 */
 export function equalsIgnoreCase(value1: string, value2: string): boolean {
  if (typeof value1 !== 'string' || typeof value2 !== 'string') {
    return false
  }

  if (value1.toUpperCase() == value2.toUpperCase()) {
    return true
  }

  return false
}

export { default as logger } from './logger';
export * from './maker-node';
