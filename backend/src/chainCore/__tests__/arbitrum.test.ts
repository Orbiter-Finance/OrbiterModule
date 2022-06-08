import { getChainByInternalId } from '../src/utils'
import chains from '../src/chain'
import ArbitrumWatch from '../src/watch/arbitrum.watch'
const service = new chains.ArbitrumChain(getChainByInternalId('2'))
const address = '0x41d3D33156aE7c62c094AAe2995003aE63f587B3'
const watch = new ArbitrumWatch(service).addWatchAddress(address)

async function run() {
//   watch.rpcScan()
watch.replayBlockTransaction('0xacd209f2ce8aad39d8db2a93c7a100541e7789b0e231d5432f2f878dc83ddcc6').then(result => {
    console.log(JSON.stringify(Array.from(result)))
})
run()
