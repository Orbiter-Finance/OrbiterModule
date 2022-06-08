import { getChainByInternalId } from '../src/utils'
import chains from '../src/chain'
import MetisWatch from '../src/watch/metis.watch'
const service = new chains.MetisChain(getChainByInternalId('510'))
const address = '0x0043d60e87c5dd08c86c3123340705a1556c4719'
const watch = new MetisWatch(service).addWatchAddress(address)

async function run() {
  // watch.apiScan()
  watch.replayBlockTransaction('0x8e3f0e3322b76018b19c0486f1854f31631cea4fedc6476540ab8d9c54a95d46').then(result => {
    console.log(result.values())
  })
}
run()
