import * as os from 'os'
import * as fs from 'fs-extra'

function isNumber(val: any): val is number {
  return typeof val === 'number'
}
export interface Data<V> {
  expire?: number
  value: V
}

export const defaultOpts = {
  filename: `${os.tmpdir()}/keyv-file/default-rnd-${Math.random()
    .toString(36)
    .slice(2)}.json`,
  expiredCheckDelay: 24 * 3600 * 1000, // ms
  writeDelay: 100, // ms
  encode: JSON.stringify as any as (val: any) => any,
  decode: JSON.parse as any as (val: any) => any,
}
export function makeField<T = any>(kv: KeyvFile, key: string, defaults?: T) {
  return {
    get(def = defaults) {
      return kv.get(key, def)
    },
    set(val?: T) {
      return kv.set(key, val)
    },
    delete() {
      return kv.delete(key)
    },
  }
}
export class KeyvFile<V = any> {
  ttlSupport = true
  private _opts = defaultOpts
  private _cache: Map<string, Data<V>>
  private _lastExpire: number
  private _saveTimer?: NodeJS.Timer

  constructor(opts?: Partial<typeof defaultOpts>) {
    this._opts = {
      ...this._opts,
      ...opts,
    }
    try {
      const data = this._opts.decode(
        fs.readFileSync(this._opts.filename, 'utf8')
      )
      if (!Array.isArray(data.cache)) {
        const _cache = data.cache
        data.cache = []
        for (const key in _cache) {
          data.cache.push([key, _cache[key]])
        }
      }
      this._cache = new Map(data.cache)
      this._lastExpire = data.lastExpire
    } catch (e) {
      this._cache = new Map()
      this._lastExpire = Date.now()
    }
  }

  isExpired(data: Data<V>) {
    return isNumber(data.expire) && data.expire <= Date.now()
  }

  get<T = V>(key: string, defaults: T): T
  get<T = V>(key: string): T | undefined
  get<T = V>(key: string, defaults?: T): T | undefined | void {
    try {
      const data = this._cache.get(key)
      if (!data) {
        return defaults
      } else if (this.isExpired(data)) {
        this.delete(key)
        return defaults
      } else {
        return data.value as any as T
      }
    } catch (error) {
      console.error(error)
    }
  }

  has(key: string) {
    return typeof this.get(key) !== 'undefined'
  }

  keys() {
    let keys = [] as string[]
    for (const key of this._cache.keys()) {
      if (!this.isExpired(this._cache.get(key)!)) {
        keys.push(key)
      }
    }
    return keys
  }
  /**
   *
   * @param key
   * @param value
   * @param ttl time-to-live, seconds
   */
  set<T = V>(key: string, value: T, ttl?: number) {
    if (ttl === 0) {
      ttl = undefined
    }
    this._cache.set(key, {
      value: value as any,
      expire: isNumber(ttl) ? Date.now() + ttl : undefined,
    })
    this.save()
  }

  delete<T = V>(key: string): T {
    let ret = this._cache.delete(key)
    this.save()
    return ret as any as T
  }

  clear() {
    this._cache = new Map()
    this._lastExpire = Date.now()
    this.save()
  }

  clearExpire() {
    const now = Date.now()
    if (now - this._lastExpire <= this._opts.expiredCheckDelay) {
      return
    }
    for (const key of this._cache.keys()) {
      const data = this._cache.get(key)
      if (this.isExpired(data!)) {
        this._cache.delete(key)
      }
    }
    this._lastExpire = now
  }

  saveToDisk() {
    const cache = [] as [string, Data<V>][]
    for (const [key, val] of this._cache) {
      cache.push([key, val])
    }
    const data = this._opts.encode({
      cache,
      lastExpire: this._lastExpire,
    })
    return new Promise<void>((resolve, reject) => {
      fs.outputFile(this._opts.filename, data, (err) => {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      })
    })
  }
  private _savePromise?: Promise<any>
  save() {
    this.clearExpire()
    if (this._savePromise) {
      return this._savePromise
    }
    this._savePromise = new Promise<void>((resolve, reject) => {
      this._saveTimer = setTimeout(() => {
        this.saveToDisk()
          .then(resolve, reject)
          .then(() => {
            this._savePromise = void 0
          })
      }, this._opts.writeDelay)
    })
    return this._savePromise
  }
}
export default KeyvFile
