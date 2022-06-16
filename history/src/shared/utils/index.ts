
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
export * from './core';
export * from './maker-node';
