import { IChainConfig } from "../src/types"
import { getChainByInternalId } from "../src/utils"
import ImmutableXWatch from "../src/watch/immutableX.watch"
import chains from '../src/chain'
const config: IChainConfig = getChainByInternalId('8')
const chainService = new ImmutableXWatch(new chains.ImmutableXChain(config)).addWatchAddress(
  '0x80C67432656d59144cEFf962E8fAF8926599bCF8'
).addWatchAddress('0x41d3D33156aE7c62c094AAe2995003aE63f587B3')
chainService.chain.getTransactions('0x80C67432656d59144cEFf962E8fAF8926599bCF8', {
    page_size: 100,
    direction: 'desc',
}).then(result => {
    console.log('trxs:', result)
})