import { getChainByInternalId } from '../src/utils'
import chains from '../src/chain'
import PolygonWatch from '../src/watch/polygon.watch'
import EthereumWatch from '../src/watch/ethereum.watch'
const service = new chains.EthereumChain(getChainByInternalId('1'))
const address = '0x80C67432656d59144cEFf962E8fAF8926599bCF8'
const watch = new EthereumWatch(service).addWatchAddress(address)

async function run() {
//   watch.rpcScan()
watch.replayBlock(14904830, 14904831)
watch.replayBlock(14920960, 14920961)
watch.replayBlockTransaction('0x7b0e34e320100f091ea1d81717d0a5a9320cb6edd932290ada0edc8619a6645a').then(result => {
    console.log(JSON.stringify(Array.from(result)))
})
// watch.replayBlockTransaction('0x0acd8c9d609a292639122badc889926c04b864d46c922047a85884522fcb1477')
// watch.chain.getTransactionByHash('0x0acd8c9d609a292639122badc889926c04b864d46c922047a85884522fcb1477').then(result => {
//     console.log(result, '===result')
// })
}
run()
