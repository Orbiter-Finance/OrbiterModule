export const $env = {
  baseUrl: '',
  apiBaseUrl: 'http://rinkeby_dashboard.orbiter.finance:3002/',
  // apiBaseUrl: '',
  historyApiUrl: `http://rinkeby_dashboard.orbiter.finance:3003/`,
  credential: false,
  starknetL1MapL2: {
    'mainnet-alpha': {
      '0x80c67432656d59144ceff962e8faf8926599bcf8': '0x07c57808b9cea7130c44aab2f8ca6147b04408943b48c6d8c3c83eb8cfdd8c0b',
      '0x095d2918b03b2e86d68551dcf11302121fb626c9': '0x001709eA381e87D4c9ba5e4A67Adc9868C05e82556A53FD1b3A8b1F21e098143',
    },
    'georli-alpha': {
      '0x0043d60e87c5dd08c86c3123340705a1556c4719':
        '0x033b88fc03a2ccb1433d6c70b73250d0513c6ee17a7ab61c5af0fbe16bd17a6e',
    },
  },
  localProvider: {
    1: 'https://mainnet.infura.io/v3/460f40a260564ac4a4f4b3fffb032dad',
    2: 'https://arb-mainnet.g.alchemy.com/v2/ILj6pmkFfRO3KflhcnPxVFtuqZvwgkgr',
    5: 'https://goerli.infura.io/v3/460f40a260564ac4a4f4b3fffb032dad', // goerli
    22: 'https://goerli-rollup.arbitrum.io/rpc/',
    15: 'https://bsc-dataseed1.binance.org',
    517: 'https://public.zkevm-test.net:2083',
    518: 'https://prealpha.scroll.io/l1',
    519: 'https://prealpha.scroll.io/l2'
  },
  localWSProvider: {
    1: 'wss://mainnet.infura.io/v3/460f40a260564ac4a4f4b3fffb032dad',
    2: 'wss://arb-mainnet.g.alchemy.com/v2/ILj6pmkFfRO3KflhcnPxVFtuqZvwgkgr',
    5: 'wss://goerli.infura.io/v3/460f40a260564ac4a4f4b3fffb032dad', // rinkeby
    22: 'https://goerli-rollup.arbitrum.io/rpc/',
    6: 'https://polygon-mumbai.g.alchemy.com/v2/akjFuzojFyDyF67GAMXV1HGqlK6SPEGp',
    66: 'https://polygon-mumbai.g.alchemy.com/v2/akjFuzojFyDyF67GAMXV1HGqlK6SPEGp',
  },
  supportLocalNetWorksIDs: [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22, 33, 44, 66, 77, 88, 99, 511, 514, 15, 515, 15,
    515, 16, 516, 517, 518, 519
  ],
  localChainID_netChainID: {
    1: '1', // mainnet
    2: '42161', // Arbitrum
    3: '1', // zk
    4: '1', // starknet
    5: '4', // goerli
    6: '137', // polygon
    7: '10', // optimism
    8: '1', // mainnet
    9: '1', // loopring
    10: '1088',
    11: '1', // loopring
    22: '421611', // arbitrum test
    33: '4', // zktest
    44: '5', // starknet(R)
    66: '80001', // polygon(R)
    77: '420', // optimism(G)
    88: '3', // ropsten
    99: '5', // loopring(G)
    510: '588', // metis(G)
    511: '3', // dydx(R)
    13: '288', // boba
    513: '28', // boba(R)
    514: '280', // zk2
    15: '56', // bsc
    515: '97', // bsc(R)
    16: '42170',
    516: '421613',
    517: '1402',
    518: '534351',
    519: '534354'
  },
  txExploreUrl: {
    1: 'https://etherscan.io/tx/', // /tx/  /address/
    5: 'https://goerli.etherscan.io/tx/', // /tx/  /address/
    2: 'https://arbiscan.io/tx/', // /tx/  /address/
    22: 'https://goerli.arbiscan.io/tx/',
    3: 'https://zkscan.io/explorer/transactions/',
    33: 'https://goerli.zkscan.io/explorer/transactions/', // /explorer/transactions/   /explorer/accounts/
    4: 'https://beta.voyager.online/tx/',
    44: 'https://beta-goerli.voyager.online/tx/',
    6: 'https://polygonscan.com/tx/',
    66: 'https://mumbai.polygonscan.com/tx/',
    7: 'https://optimistic.etherscan.io/tx/',
    77: 'https://blockscout.com/optimism/goerli/tx',
    8: 'https://immutascan.io/tx/',
    88: '',
    9: 'https://explorer.loopring.io/tx/',
    99: 'https://explorer.loopring.io/tx/',
    10: 'https://andromeda-explorer.metis.io/tx/',
    510: 'https://stardust-explorer.metis.io/tx/',
    11: 'https://trade.dydx.exchange/',
    511: 'https://trade.stage.dydx.exchange/',
    12: 'https://zkspace.info/transaction/',
    512: 'https://v3-rinkeby.zkswap.info/transaction/',
    13: 'https://blockexplorer.boba.network/tx/',
    513: 'https://blockexplorer.rinkeby.boba.network/tx/',
    514: 'https://zksync2-testnet.zkscan.io/tx/',
    15: 'https://bscscan.com/tx/',
    515: 'https://testnet.bscscan.com/tx/',
    16: 'https://nova-explorer.arbitrum.io/tx/',
    516: 'https://goerli-rollup-explorer.arbitrum.io/tx/',
    517: 'https://public.zkevm-test.net:8443/tx/',
    518: 'https://l1scan.scroll.io/tx/',
    519: 'https://l2scan.scroll.io/tx/'
  },
  accountExploreUrl: {
    1: 'https://etherscan.io/address/', // /tx/  /address/
    5: 'https://goerli.etherscan.io/address/', // /tx/  /address/
    2: 'https://arbiscan.io/address/', // /tx/  /address/
    22: 'https://goerli.arbiscan.io/address/',
    3: 'https://zkscan.io/explorer/accounts/',
    33: 'https://goerli.zkscan.io/explorer/accounts/', // /explorer/transactions/   /explorer/accounts/
    4: 'https://beta.voyager.online/contract/',
    44: 'https://beta-goerli.voyager.online/contract/',
    6: 'https://polygonscan.com/address/',
    66: 'https://mumbai.polygonscan.com/address/',
    7: 'https://optimistic.etherscan.io/address/',
    77: 'https://blockscout.com/optimism/goerli/address/',
    8: 'https://immutascan.io/address/',
    88: '',
    9: 'https://explorer.loopring.io/account/',
    99: 'https://explorer.loopring.io/account/',
    10: 'https://andromeda-explorer.metis.io/address/',
    510: 'https://stardust-explorer.metis.io/address/',
    11: 'https://trade.dydx.exchange/',
    511: 'https://trade.stage.dydx.exchange/',
    12: 'https://zkspace.info/account/',
    512: 'https://v3-rinkeby.zkswap.info/account/',
    13: 'https://blockexplorer.boba.network/address/',
    513: 'https://blockexplorer.rinkeby.boba.network/address/',
    514: 'https://zksync2-testnet.zkscan.io/address/',
    15: 'https://bscscan.com/address/',
    515: 'https://testnet.bscscan.com/address/',
    16: 'https://nova-explorer.arbitrum.io/address/',
    516: 'https://goerli-rollup-explorer.arbitrum.io/address/',
    517: 'https://public.zkevm-test.net:8443/address/',
    518: 'https://l1scan.scroll.io/address/',
    519: 'https://l2scan.scroll.io/address/'
  },
  tokenExploreUrl: {
    1: 'https://etherscan.io/token/', // /token/
    5: 'https://goerli.etherscan.io/token/', // /token/
    2: 'https://arbiscan.io/address/', // /address/
    22: 'https://goerli.arbiscan.io/token/',
    3: 'https://etherscan.io/token/', // same as etherscan
    33: 'https://goerli.etherscan.io/token/',
    4: 'https://beta.voyager.online/token/',
    44: 'https://beta-goerli.voyager.online/token/',
    6: 'https://polygonscan.com/token/',
    66: 'https://mumbai.polygonscan.com/token/',
    7: 'https://optimistic.etherscan.io/token/',
    77: 'https://blockscout.com/optimism/goerli/token/',
    10: 'https://andromeda-explorer.metis.io/token/',
    510: 'https://stardust-explorer.metis.io/token/',
    11: 'https://trade.dydx.exchange/',
    511: 'https://trade.stage.dydx.exchange/',
    12: 'https://zkspace.info/token/',
    512: 'https://v3-rinkeby.zkswap.info/token/',
    13: 'https://blockexplorer.boba.network/',
    513: 'https://blockexplorer.rinkeby.boba.network/',
    514: 'https://zksync2-testnet.zkscan.io/token/',
    15: 'https://bscscan.com/tokens',
    515: 'https://testnet.bscscan.com/tokens',
    16: 'https://nova-explorer.arbitrum.io/token/',
    516: 'https://goerli-rollup-explorer.arbitrum.io/token/',
    517: 'https://public.zkevm-test.net:8443/token/',
    518: 'https://l1scan.scroll.io/token/',
    519: 'https://l2scan.scroll.io/token/'
  },
}
