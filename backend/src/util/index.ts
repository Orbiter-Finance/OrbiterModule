import cluster from 'cluster'
import dayjs from 'dayjs'
import semver from 'semver'

export async function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(null)
    }, ms)
  })
}

export function isDevelopment() {
  return process.env.NODE_ENV === 'development'
}

/**
 * Normal format date: (YYYY-MM-DD HH:mm:ss)
 * @param date Date
 * @returns
 */
export function dateFormatNormal(
  date: string | number | Date | dayjs.Dayjs | null | undefined
): string {
  return dayjs(date).format('YYYY-MM-DD HH:mm:ss')
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

  if (value1 == value2) {
    return true
  }
  if (value1.toUpperCase() == value2.toUpperCase()) {
    return true
  }

  return false
}

/**
 *
 * @param tokenAddress when tokenAddress=/^0x0+$/i
 * @returns
 */
export function isEthTokenAddress(tokenAddress: string) {
  return /^0x0+$/i.test(tokenAddress)
}

/**
 * @returns 
 */
export function clusterIsPrimary() {
  if (semver.gte(process.version, 'v16.0.0')) {
    return cluster.isPrimary
  }
  return cluster.isMaster
}

/**
 * @param chainId
 * @returns
 */
export function isSupportEVM(chainId: number) {
  return [1, 2, 6, 7, 5, 22, 66, 77].indexOf(Number(chainId)) > -1
}
