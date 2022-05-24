import ChainFactory from '../../src/chain/factory'
import { IChain } from '../../types'

describe('ZKSync.test Api', () => {
  const chainInstance: IChain = ChainFactory.getChainInstance('zksync')
  test('Get BlockNumber', async () => {
    const blockNumber = await chainInstance.getLatestHeight();
    expect(blockNumber).toBeGreaterThan(1)
  })
})
