import { IChainConfig } from "../src/types"
import { getChainByInternalId } from "../src/utils"
import EthereumWatch from "../src/watch/ethereum.watch"
import chains from '../src/chain'
const config: IChainConfig = getChainByInternalId('1')
const chainService = new EthereumWatch(new chains.EthereumChain(config)).addWatchAddress(
  '0x80C67432656d59144cEFf962E8fAF8926599bCF8'
).addWatchAddress('0x41d3D33156aE7c62c094AAe2995003aE63f587B3')
chainService.rpcScan()
// chainService.chain.getTransactionByHash('0x46845fd1b4f81ba7578b9f9dfa7c2d2011dcd8c224cb1203cb06c44be728d123').then(result => {
//   console.log('trx:', result)
// })
// chainService.replayBlock(14831916 , 14831917, (...result) => {
//   console.log(result);
// })