import { groupBy, uniqBy } from './src/utils'
import logger from './src/utils/logger'
import PubSubMQ, { PubSub } from './src/utils/pubsub'
import { ChainFactory } from './src/watch/chainFactory'
export interface IScanChainItem {
  address: string
  intranetId: string
  chainId: string
}
export class ScanChainMain {
  public mq: PubSub = PubSubMQ
  static convertTradingList(makerList: Array<any>) {
    const c1List = uniqBy(makerList, (row) => {
      return row.c1ID + row.makerAddress
    }).map((row) => {
      return {
        intranetId: row.c1ID,
        address: row.makerAddress,
      }
    })
    const c2List = uniqBy(makerList, (row) => {
      return row.c2ID + row.makerAddress
    }).map((row) => {
      return {
        intranetId: row.c2ID,
        address: row.makerAddress,
      }
    })
    const result = uniqBy([...c1List, ...c2List], (row) => {
      return row.intranetId + row.address
    })
    return groupBy(result, 'intranetId')
  }
  constructor(
    private readonly scanChainConfig: { [key: string]: Array<IScanChainItem> }
  ) {}
  run() {
    logger.info(`ScanChainMain Run:`, JSON.stringify(this.scanChainConfig))
    for (const intranetId in this.scanChainConfig) {
      try {
        logger.info(
          `ScanChainMain Run in Progress:`,
          JSON.stringify(this.scanChainConfig[intranetId])
        )
        const addressList = this.scanChainConfig[intranetId].map(
          (row) => row.address
        )
        if (addressList.length > 0) {
          const chain =
            ChainFactory.createWatchChainByIntranetId(
              intranetId
            ).addWatchAddress(addressList)
          try {
            if (chain.chain.chainConfig.watch.includes('api')) {
              chain.apiScan()
            }
          } catch (error) {
            logger.error('Start API Scan Exception:', error.message)
          }

          try {
            if (chain.chain.chainConfig.watch.includes('rpc')) {
              chain.rpcScan()
            }
          } catch (error) {
            logger.error('Start RPC Scan Exception:', error.message)
          }
        }
      } catch (error) {
        logger.error(
          `ScanChainMain Run Error:${error.message}`,
          this.scanChainConfig[intranetId]
        )
      }
    }
  }
}

process.on('uncaughtException', (err: Error) => {
  logger.error('Global Uncaught exception:', err)
})

process.on('unhandledRejection', (err: Error, promise) => {
  logger.error(
    'There are failed functions where promise is not captured：',
    err.message
  )
})