import EtherscanClient, { EtherscanApiAction } from '../../src/utils/etherscan'

describe('Arbiscan Api', () => {
  const api = new EtherscanClient('https://api.arbiscan.io/api')
  test('Stats ethsupply', async () => {
    const response = await api.call(EtherscanApiAction.StatsEthprice)
    expect(response.status).toEqual('1')
  })
})
// describe('Etherscan Api', () => {
//     const api = new EtherscanClient('https://api.etherscan.io/api')
//     test('Etherscan Stats ethsupply', async () => {
//       const response = await api.call(EtherscanApiAction.StatsEthprice)
//       expect(response.status).toEqual('1')
//     })
//   })