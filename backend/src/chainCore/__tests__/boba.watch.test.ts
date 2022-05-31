import { getChainByInternalId } from '../src/utils'
import BobaWatch from '../src/watch/boba.watch'
import chains from '../src/chain'
const bobaService = new chains.BobaChain(getChainByInternalId('13'))
const address = '0x80C67432656d59144cEFf962E8fAF8926599bCF8'
const boba = new BobaWatch(bobaService).addWatchAddress(address)
// describe('boba watch', () => {
//   test('boba execGraphqlTransactions', async () => {
//     const response = await boba.execGraphqlTransactions(address)
//     return response
//   })
// })

async function run() {
  boba.apiScan()
  // const result = await boba.apiWatchNewTransaction(address)
  // console.log(result)
}
run()
