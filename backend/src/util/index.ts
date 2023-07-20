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

import { mkdirp } from 'mkdirp';
import fs from "fs";
import path from "path";
import { accessLogger } from "./logger";

const dirRecord = {};

// mkdir -p
export async function mkLogDir(dir: string): Promise<string> {
  if (dirRecord[dir]) return dirRecord[dir];
  const logDir = path.join(__dirname, '../../logs');
  const mkDir = path.join(logDir, dir);
  dirRecord[dir] = mkDir;
  return new Promise(async (resolve) => {
    await fs.stat(mkDir, async (err, data) => {
      if (err) {
        mkdirp(mkDir).then(made => {
              console.log(`mkdir -p ${mkDir}, ${made}`);
              resolve(mkDir);
            }
        );
      } else {
        resolve(mkDir);
      }
    });
  });
}

export async function writeLogJson(name: string, dir: string, data: any) {
  const fileDir: string = await mkLogDir(dir);
  fs.writeFileSync(path.join(fileDir, name), JSON.stringify(data));
}

export async function readLogJson(name: string, dir: string, defaultValue?: any) {
  const fileDir: string = await mkLogDir(dir);
  defaultValue = defaultValue || [];
  try {
    return JSON.parse(fs.readFileSync(path.join(fileDir, name)).toString()) || defaultValue;
  } catch (e) {
    await writeLogJson(name, dir, defaultValue);
    return JSON.parse(fs.readFileSync(path.join(fileDir, name)).toString()) || defaultValue;
  }
}

const logMap: any = {};

export function aggregateLog(key: string, msg: string, time: number = 60) {
  try {
    logMap[key] = logMap[key] || { t: 0, v: [] };
    if (new Date().valueOf() - logMap[key].t >= time * 1000) {
      accessLogger.info(`${logMap[key].v.join(', ')}`);
      logMap[key].t = new Date().valueOf();
      logMap[key].v = [];
    } else {
      logMap[key].v.push(`${new Date().toTimeString().substr(3, 5)} ${msg}`);
    }
  } catch (e) {
    console.log('aggregateLog', e.message);
  }
}
