import { IChainConfig } from "../src/types"
import { getChainByInternalId } from "../src/utils"
import MetisWatch from "../src/watch/metis.watch"
import chains from '../src/chain'
const config: IChainConfig = getChainByInternalId('10')
const imx = new MetisWatch(new chains.MetisChain(config)).addWatchAddress(
  '0x80C67432656d59144cEFf962E8fAF8926599bCF8'
)
imx.chain.getTransactions('0x80c67432656d59144ceff962e8faf8926599bcf8', {
  address: '0x80c67432656d59144ceff962e8faf8926599bcf8'
}).then(result => {
  console.log('trxs:', result);
})