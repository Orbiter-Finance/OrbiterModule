import Keyv from 'keyv'
import KeyvFile from '../utils/keyvFile'

export const cacheDecorator = (file: string): PropertyDecorator => {
  return (target: Object, propertyKey: string | symbol) => {
    const cache = new Keyv({
      store: new KeyvFile({
        filename: `cache/${file}`, // the file path to store the data
        expiredCheckDelay: 999999 * 24 * 3600 * 1000, // ms, check and remove expired data in each ms
        writeDelay: 100, // ms, batch write to disk in a specific duration, enhance write performance.
        encode: JSON.stringify, // serialize function
        decode: JSON.parse, // deserialize function
      }),
    })
    Object.defineProperty(target, propertyKey, {
      value: cache,
      writable: false,
      enumerable: true,
      configurable: true,
    })
  }
}
