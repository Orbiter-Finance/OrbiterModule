import { getChainByInternalId } from '../src/utils'
import chains from '../src/chain'
import PolygonWatch from '../src/watch/polygon.watch'
const service = new chains.PolygonChain(getChainByInternalId('6'))
const address = '0x80C67432656d59144cEFf962E8fAF8926599bCF8'
const watch = new PolygonWatch(service).addWatchAddress(address)

async function run() {
  watch.rpcScan()
// watch.replayBlock(29269166, 29269167).then(result => {
//     console.log(result)
// })
// watch.replayBlockTransaction('0x8baed10f24817f91d997bc9c1338016daa46d366c485443d2d41e7b84e738035').then(result => {
//     console.log(JSON.stringify(Array.from(result)))
// })
}
run()
