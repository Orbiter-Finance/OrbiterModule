import { getChainByInternalId, groupBy, uniqBy } from './src/utils'
import logger from './src/utils/logger'
import { ChainFactory } from './src/watch/chainFactory'
import chains from '../chainCore/src/chain'
import { IChainConfig } from './src/types'
import ImmutableXWatch from './src/watch/immutableX.watch'
import DydxWatch from './src/watch/dydx.watch'
import BobaWatch from './src/watch/boba.watch'
import LoopringWatch from './src/watch/loopring.watch'
import OptimismWatch from './src/watch/optimism.watch'
import dayjs from 'dayjs'
import ZKSync2Watch from './src/watch/zksync2.watcht'
export interface IScanChainItem {
  address: string
  intranetId: string
  chainId: string
}
export class ScanChainMain {
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
          if (chain.chain.chainConfig.watch.includes('api')) {
            chain.api()
          }
          if (chain.chain.chainConfig.watch.includes('ws')) {
            chain.ws()
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

const config: IChainConfig = getChainByInternalId('514')
const imx = new ZKSync2Watch(new chains.ZKSync2Chain(config)).addWatchAddress(
  '0x80C67432656d59144cEFf962E8fAF8926599bCF8'
)
// imx.api()
imx.chain.getTransactionByHash('0x4c87490cbe37c7b1ae7035641c231fd1b6fb8b688639c624e4dd6712a8ec6446').then(result => {
  console.log('交易：', result, result.value.div(10**18).toString())
})
// imx.ws()
// const config:IChainConfig = getChainByInternalId('7');
// const imx = new OptimismWatch(
//   new chains.OptimismChain(config)
// ).addWatchAddress('0x80C67432656d59144cEFf962E8fAF8926599bCF8')
// // imx.api()
// imx.chain.getTransactionByHash('0xfada90cc30123556b75dea029ac9ff877a5218a072730c097df803c258f31bd0').then(result => {
//   console.log(result, result.value.toString());
// })
// imx.ws()
