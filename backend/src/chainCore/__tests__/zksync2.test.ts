import { getChainByInternalId } from '../src/utils'
import ZK2Watch from '../src/watch/zksync2.watcht'
import chains from '../src/chain'
const watchService = new chains.ZKSync2Chain(getChainByInternalId('514'))
const address = '0x0043d60e87c5dd08C86C3123340705a1556C4719'
const watch = new ZK2Watch(watchService).addWatchAddress(address)
async function run() {
//   const result = await watch.apiWatchNewTransaction(address)
//   console.log(result)
// watch.replayBlock()
watch.apiScan()
    const tx = await watch.chain.getTransactionByHash('0x677080bd7422a7436e96f7d5756436f34494dd7247644681a62c9e97c151fc9b');
    console.log(tx);
}
run()
