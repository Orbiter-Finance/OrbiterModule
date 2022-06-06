import { getChainByInternalId } from '../src/utils'
import BobaWatch from '../src/watch/boba.watch'
import chains from '../src/chain'
const bobaService = new chains.BobaChain(getChainByInternalId('513'))
const address = '0x0043d60e87c5dd08c86c3123340705a1556c4719'
const boba = new BobaWatch(bobaService).addWatchAddress(address)
// describe('boba watch', () => {
//   test('boba execGraphqlTransactions', async () => {
//     const response = await boba.execGraphqlTransactions(address)
//     return response
//   })
// })

async function run() {
  // boba.apiScan()
  // boba.rpcScan()
  const result = await boba.apiWatchNewTransaction(address)
  console.log(result)
}
run()
