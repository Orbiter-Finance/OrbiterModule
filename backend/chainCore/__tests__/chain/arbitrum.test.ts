import ChainFactory from '../../src/chain/factory'
import { IChain } from '../../types'

describe('Arbitrum.test Api', () => {
  const chainInstance: IChain = ChainFactory.getChainInstance(42161)
  test('Web3js Get BlockNumber', async () => {
    const blockNumber = await chainInstance.getLatestHeight();
    expect(blockNumber).toBeGreaterThan(1)
  })
  test('ExplorerApi Get getTransactions', async () => {
    const trxs = await chainInstance.getTransactions("0x7081685Ff3ff16FB6c0dF08AC93bdB7299EEEfc9", {size:2})
    expect(trxs.length).toBeGreaterThan(0)
  })
})
