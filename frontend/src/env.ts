export const $env = {
  baseUrl: '',
  apiBaseUrl: 'http://dashboard.joeyzhou.xyz:3002/',
  // apiBaseUrl: '',
  historyApiUrl: `http://dashboard.joeyzhou.xyz/history/`,
  credential: false,
  starknetL1MapL2: {
    'mainnet-alpha': {
      '0xe4edb277e41dc89ab076a1f049f4a3efa700bce8': '0x064A24243F2Aabae8D2148FA878276e6E6E452E3941b417f3c33b1649EA83e11',
      '0x80c67432656d59144ceff962e8faf8926599bcf8': '0x07b393627bd514d2aa4c83e9f0c468939df15ea3c29980cd8e7be3ec847795f0',
      '0x095d2918b03b2e86d68551dcf11302121fb626c9': '0x0411c2a2a4dc7b4d3a33424af3ede7e2e3b66691e22632803e37e2e0de450940',
      "0x0043d60e87c5dd08c86c3123340705a1556c4719": "0x050e5ba067562e87b47d87542159e16a627e85b00de331a53b471cee1a4e5a4f",
      "0x80cead4b66a87d1f728eba116b94592b57eb0695": "0x0274ff9139350580a93a4ed390de13fdd5bb333d18344146612af4e17593e100",

      "0x41d3d33156ae7c62c094aae2995003ae63f587b3":"0x0411c2a2a4dc7b4d3a33424af3ede7e2e3b66691e22632803e37e2e0de450940",
      "0xd7aa9ba6caac7b0436c91396f22ca5a7f31664fc":"0x0411c2a2a4dc7b4d3a33424af3ede7e2e3b66691e22632803e37e2e0de450940"
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
    519: 'https://prealpha.scroll.io/l2',
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
    1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 14, 22, 33, 44, 66, 77, 88, 99, 511, 514, 15,
    515, 15, 515, 16, 516, 517, 518, 519, 23, 24
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
    14: '324',
    514: '280', // zk2
    15: '56', // bsc
    515: '97', // bsc(R)
    16: '42170',
    516: '421613',
    517: '1402',
    518: '534351',
    19: '534352',
    519: '534354',
    25: '204',
    21: '8453',
    521: '84531',

    23: '59144',
    523: '59140',
    24: '5000',
    524: '5001',

    30: '7777777',
    530: '999',
    31: '169'
  },
  txExploreUrl: {
    1: 'https://etherscan.io/tx/', // /tx/  /address/
    5: 'https://goerli.etherscan.io/tx/', // /tx/  /address/
    2: 'https://arbiscan.io/tx/', // /tx/  /address/
    22: 'https://testnet.arbiscan.io/tx/',
    3: 'https://zkscan.io/explorer/transactions/',
    33: 'https://goerli.zkscan.io/explorer/transactions/', // /explorer/transactions/   /explorer/accounts/
    4: 'https://starkscan.co/tx/',
    44: 'https://testnet.starkscan.co/tx/',
    6: 'https://polygonscan.com/tx/',
    66: 'https://mumbai.polygonscan.com/tx/',
    7: 'https://optimistic.etherscan.io/tx/',
    77: 'https://goerli-optimism.etherscan.io/tx/',
    8: 'https://immutascan.io/tx/',
    88: '', // ImmutableX don't have testnet browser
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
    15: 'https://bscscan.com/tx/',
    515: 'https://testnet.bscscan.com/tx/',
    14: 'https://explorer.zksync.io/tx/',
    514: 'https://goerli.explorer.zksync.io/tx/',
    16: 'https://nova.arbiscan.io/tx/',
    516: 'https://goerli-rollup-explorer.arbitrum.io/tx/',
    17: "https://zkevm.polygonscan.com/tx/",
    517: 'https://explorer.public.zkevm-test.net/tx/',
    518: 'https://l1scan.scroll.io/tx/',
    19: 'https://scrollscan.com/tx/',
    519: 'https://l2scan.scroll.io/tx/',
    520: 'https://l2explorer.a2.taiko.xyz/tx/',
    21: 'https://basescan.org/tx/',
    521: 'https://goerli.basescan.org/tx/',
    522: 'https://explorer.goerli.zkevm.consensys.net/tx/',

    23: 'https://explorer.linea.build/tx/',
    24: 'https://explorer.mantle.xyz/tx/',
    523: 'https://goerli.lineascan.build/tx/',
    524: 'https://explorer.testnet.mantle.xyz/tx/',
    25: 'https://mainnet.opbnbscan.com/tx/',
    525: 'https://opbnbscan.com/tx/',
    526: 'https://sepolia.etherscan.io/tx/',
    527: 'https://www.okx.com/explorer/okbc-test/tx/',

    30: 'https://explorer.zora.energy/tx/',
    530: 'https://testnet.explorer.zora.energy/tx/',
    31: 'https://manta-pacific.calderaexplorer.xyz/tx/'
  },
  accountExploreUrl: {
    1: 'https://etherscan.io/address/', // /tx/  /address/
    5: 'https://goerli.etherscan.io/address/', // /tx/  /address/
    2: 'https://arbiscan.io/address/', // /tx/  /address/
    22: 'https://testnet.arbiscan.io/address/',
    3: 'https://zkscan.io/explorer/accounts/',
    33: 'https://goerli.zkscan.io/explorer/accounts/', // /explorer/transactions/   /explorer/accounts/
    4: 'https://voyager.online/contract/',
    44: 'https://goerli.voyager.online/contract/',
    6: 'https://polygonscan.com/address/',
    66: 'https://mumbai.polygonscan.com/address/',
    7: 'https://optimistic.etherscan.io/address/',
    77: 'https://blockscout.com/optimism/goerli/address/',
    8: 'https://market.immutable.com/inventory/',
    88: 'https://market.ropsten.immutable.com/inventory/',
    9: 'https://explorer.loopring.io/account/',
    99: 'https://explorer.loopring.io/account/',
    10: 'https://andromeda-explorer.metis.io/address/',
    510: 'https://stardust-explorer.metis.io/address/',
    11: 'https://trade.dydx.exchange/',
    511: 'https://trade.stage.dydx.exchange/',
    12: 'https://zkspace.info/account/',
    512: 'https://v3-rinkeby.zkswap.info/account/',
    13: 'https://bobascan.com/address/',
    513: 'https://testnet.bobascan.com/address/',
    14: 'https://explorer.zksync.io/address/',
    514: 'https://goerli.explorer.zksync.io/address/',
    15: 'https://bscscan.com/address',
    515: 'https://testnet.bscscan.com/address/',
    16: 'https://nova.arbiscan.io/address/',
    516: 'https://goerli-rollup-explorer.arbitrum.io/address/',
    17: "https://zkevm.polygonscan.com/address/",
    517: 'https://explorer.public.zkevm-test.net/address/',
    518: 'https://l1scan.scroll.io/address/',
    19: 'https://scrollscan.com/address/',
    519: 'https://l2scan.scroll.io/address/',
    520: 'https://l2explorer.a2.taiko.xyz/address/',
    21: 'https://basescan.org/address/',
    521: 'https://goerli.basescan.org/address/',
    522: 'https://explorer.goerli.zkevm.consensys.net/address/',

    23: 'https://explorer.linea.build/address/',
    24: 'https://explorer.mantle.xyz/address/',
    523: 'https://goerli.lineascan.build/address/',
    524: 'https://explorer.testnet.mantle.xyz/address/',
    25: 'https://mainnet.opbnbscan.com/address/',
    525: 'https://opbnbscan.com/address/',
    526: 'https://sepolia.etherscan.io/address/',
    527: 'https://www.okx.com/explorer/okbc-test/address/',

    30: 'https://explorer.zora.energy/address/',
    530: 'https://testnet.explorer.zora.energy/address/',
    31: 'https://manta-pacific.calderaexplorer.xyz/address/'
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
    14: 'https://explorer.zksync.io/tokens/',
    514: 'https://goerli.explorer.zksync.io/tokens/',
    15: 'https://bscscan.com/tokens',
    515: 'https://testnet.bscscan.com/tokens',
    16: 'https://nova-explorer.arbitrum.io/token/',
    516: 'https://goerli-rollup-explorer.arbitrum.io/token/',
    517: 'https://public.zkevm-test.net:8443/token/',
    518: 'https://l1scan.scroll.io/token/',
    19: 'https://scrollscan.com/token/',
    519: 'https://l2scan.scroll.io/token/',
    21: 'https://basescan.org/token/',

    23: 'https://explorer.linea.build/token/',
    24: 'https://explorer.mantle.xyz/token/',
    523: 'https://goerli.lineascan.build/token/',
    524: 'https://explorer.testnet.mantle.xyz/token/',
    25: 'https://mainnet.opbnbscan.com/token/',
    525: 'https://opbnbscan.com/token/',
    526: 'https://sepolia.etherscan.io/token/',
    527: 'https://www.okx.com/explorer/okbc-test/token/',
    30: 'https://explorer.zora.energy/token/',
    530: 'https://testnet.explorer.zora.energy/token/',
    31: 'https://manta-pacific.calderaexplorer.xyz/address/'
  },
}
