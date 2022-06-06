import { getChainByInternalId } from '../src/utils'
import chains from '../src/chain'
import MetisWatch from '../src/watch/metis.watch'
const service = new chains.MetisChain(getChainByInternalId('510'))
const address = '0x0043d60e87c5dd08c86c3123340705a1556c4719'
const watch = new MetisWatch(service).addWatchAddress(address)

async function run() {
  watch.apiScan()
}
run()
