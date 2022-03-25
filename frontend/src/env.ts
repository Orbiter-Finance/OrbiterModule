export const $env = {
  baseUrl: '',
  apiBaseUrl: '',
  credential: false,
  localProvider: {
    1: 'https://mainnet.infura.io/v3/460f40a260564ac4a4f4b3fffb032dad',
    2: 'https://arb-mainnet.g.alchemy.com/v2/ILj6pmkFfRO3KflhcnPxVFtuqZvwgkgr',
    5: 'https://rinkeby.infura.io/v3/460f40a260564ac4a4f4b3fffb032dad', // rinkeby
    22: 'https://arb-rinkeby.g.alchemy.com/v2/ILj6pmkFfRO3KflhcnPxVFtuqZvwgkgr',
  },
  localWSProvider: {
    1: 'wss://mainnet.infura.io/v3/460f40a260564ac4a4f4b3fffb032dad',
    2: 'wss://arb-mainnet.g.alchemy.com/v2/ILj6pmkFfRO3KflhcnPxVFtuqZvwgkgr',
    5: 'wss://rinkeby.infura.io/v3/460f40a260564ac4a4f4b3fffb032dad', // rinkeby
    22: 'wss://arb-rinkeby.g.alchemy.com/v2/ILj6pmkFfRO3KflhcnPxVFtuqZvwgkgr',
    6: 'https://polygon-mumbai.g.alchemy.com/v2/akjFuzojFyDyF67GAMXV1HGqlK6SPEGp',
    66: 'https://polygon-mumbai.g.alchemy.com/v2/akjFuzojFyDyF67GAMXV1HGqlK6SPEGp',
  },
  supportLocalNetWorksIDs: [1, 2, 3, 5, 6, 22, 33, 66],
  localChainID_netChainID: {
    1: '1', // mainnet
    2: '42161', // Arbitrum
    3: '1', // zk
    4: '1', // starknet
    5: '4', // rinkeby
    6: '137', // polygon
    9: '1',
    22: '421611', // arbitrum test
    33: '4', // zktest
    44: '4', // starknet(R)
    66: '80001', // polygon(R)
    99: '5', // loopring(G)
  },
  txExploreUrl: {
    1: 'https://etherscan.io/tx/', // /tx/  /address/
    5: 'https://rinkeby.etherscan.io/tx/', // /tx/  /address/
    2: 'https://arbiscan.io/tx/', // /tx/  /address/
    22: 'https://testnet.arbiscan.io/tx/',
    3: 'https://zkscan.io/explorer/transactions/',
    33: 'https://rinkeby.zkscan.io/explorer/transactions/', // /explorer/transactions/   /explorer/accounts/
    6: 'https://polygonscan.com/tx/',
    66: 'https://mumbai.polygonscan.com/tx/',
    7: 'https://optimistic.etherscan.io/tx/',
    77: 'https://kovan-optimistic.etherscan.io/tx/',
    8: 'https://immutascan.io/tx/',
    88: '',
    9: 'https://explorer.loopring.io/tx/',
    99: 'https://explorer.loopring.io/tx/',
  },
  accountExploreUrl: {
    1: 'https://etherscan.io/address/', // /tx/  /address/
    5: 'https://rinkeby.etherscan.io/address/', // /tx/  /address/
    2: 'https://arbiscan.io/address/', // /tx/  /address/
    22: 'https://testnet.arbiscan.io/address/',
    3: 'https://zkscan.io/explorer/accounts/',
    33: 'https://rinkeby.zkscan.io/explorer/accounts/', // /explorer/transactions/   /explorer/accounts/
    6: 'https://polygonscan.com/address/',
    66: 'https://mumbai.polygonscan.com/address/',
    7: 'https://optimistic.etherscan.io/address/',
    77: 'https://kovan-optimistic.etherscan.io/address/',
    8: 'https://immutascan.io/address/',
    88: '',
    9: 'https://explorer.loopring.io/account/',
    99: 'https://explorer.loopring.io/account/',
  },
  tokenExploreUrl: {
    1: 'https://etherscan.io/token/', // /token/
    5: 'https://rinkeby.etherscan.io/token/', // /token/
    2: 'https://arbiscan.io/address/', // /address/
    22: 'https://testnet.arbitrum.io/address/',
    3: 'https://etherscan.io/token/', // same as etherscan
    33: 'https://rinkeby.etherscan.io/token/',
    6: 'https://polygonscan.com/token/',
    66: 'https://mumbai.polygonscan.com/token/',
    7: 'https://optimistic.etherscan.io/token/',
    77: 'https://kovan-optimistic.etherscan.io/token/',
  },
}
