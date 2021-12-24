import NodeCache from 'node-cache'
import { Connection } from 'typeorm'

export class Core {
  static db: Connection
  static memoryCache: NodeCache
}
