export const $env = {
  crossAddressTransferMap: {
    "0x4eaf936c172b5e5511959167e8ab4f7031113ca3": "0x3fbd1e8cfc71b5b8814525e7129a3f41870a238b"
  },
  starknetL1MapL2: {
    'mainnet-alpha': {
      '0xe4edb277e41dc89ab076a1f049f4a3efa700bce8': '0x064A24243F2Aabae8D2148FA878276e6E6E452E3941b417f3c33b1649EA83e11',
      '0x80c67432656d59144ceff962e8faf8926599bcf8': '0x07b393627bd514d2aa4c83e9f0c468939df15ea3c29980cd8e7be3ec847795f0',
      '0x095d2918b03b2e86d68551dcf11302121fb626c9': '0x0411c2a2a4dc7b4d3a33424af3ede7e2e3b66691e22632803e37e2e0de450940',

      "0x41d3d33156ae7c62c094aae2995003ae63f587b3":"0x0411c2a2a4dc7b4d3a33424af3ede7e2e3b66691e22632803e37e2e0de450940",
      "0xd7aa9ba6caac7b0436c91396f22ca5a7f31664fc":"0x0411c2a2a4dc7b4d3a33424af3ede7e2e3b66691e22632803e37e2e0de450940"
    },
    'goerli-alpha': {
      '0x4eaf936c172b5e5511959167e8ab4f7031113ca3': '0x050e5ba067562e87b47d87542159e16a627e85b00de331a53b471cee1a4e5a4f',
      '0xe06d06887b1a5638b882f1dcb054059c9bfd63ea': '0x02379d9a1a1fd2c85d66457c7bc6bfd28215732cde1ba0f9a8f7a30e10bb8489',
      "0x80cead4b66a87d1f728eba116b94592b57eb0695": "0x0274ff9139350580a93a4ed390de13fdd5bb333d18344146612af4e17593e100"
    },
  },
  txExploreUrl: {
    1: 'https://etherscan.io/tx/', // /tx/  /address/
    5: 'https://goerli.etherscan.io/tx/', // /tx/  /address/
    2: 'https://arbiscan.io/tx/', // /tx/  /address/
    22: 'https://goerli.arbiscan.io/tx/',
    3: 'https://zkscan.io/explorer/transactions/',
    33: 'https://goerli.zkscan.io/explorer/transactions/', // /explorer/transactions/   /explorer/accounts/
    4: 'https://starkscan.co/tx/',
    44: 'https://testnet.starkscan.co/tx/',
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
    14: "https://explorer.zksync.io/tx/",
    514: 'https://goerli.explorer.zksync.io/tx/',
    15: 'https://bscscan.com/tx/',
    515: 'https://testnet.bscscan.com/tx/',
    16: 'https://nova-explorer.arbitrum.io/tx/',
    516: 'https://goerli-rollup-explorer.arbitrum.io/tx/',
    517: 'https://explorer.public.zkevm-test.net/tx/',
    518: 'https://l1scan.scroll.io/tx/',
    519: 'https://l2scan.scroll.io/tx/',
    520: 'https://l2explorer.a1.taiko.xyz/tx/',
    521: 'https://goerli.basescan.org/tx/',
    522: 'https://goerli.lineascan.build/tx/',
    523: 'https://www.okx.com/explorer/okbc-test/tx/',
    524: 'https://explorer.testnet.mantle.xyz/tx/',
    525: 'https://opbnbscan.com/tx/'
  },
  accountExploreUrl: {
    1: 'https://etherscan.io/address/', // /tx/  /address/
    5: 'https://goerli.etherscan.io/address/', // /tx/  /address/
    2: 'https://arbiscan.io/address/', // /tx/  /address/
    22: 'https://goerli.arbiscan.io/address/',
    3: 'https://zkscan.io/explorer/accounts/',
    33: 'https://goerli.zkscan.io/explorer/accounts/', // /explorer/transactions/   /explorer/accounts/
    4: 'https://starkscan.co/contract/',
    44: 'https://testnet.starkscan.co/contract/',
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
    14: "https://explorer.zksync.io/address/",
    514: 'https://goerli.explorer.zksync.io/address/',
    15: 'https://bscscan.com/address/',
    515: 'https://testnet.bscscan.com/address/',
    16: 'https://nova-explorer.arbitrum.io/address/',
    516: 'https://goerli-rollup-explorer.arbitrum.io/address/',
    517: 'https://explorer.public.zkevm-test.net/address/',
    518: 'https://l1scan.scroll.io/address/',
    519: 'https://l2scan.scroll.io/address/',
    520: 'https://l2explorer.a1.taiko.xyz/address/',
    521: 'https://goerli.basescan.org/address/',
    522: 'https://goerli.lineascan.build/address/',
    523: 'https://www.okx.com/explorer/okbc-test/address/',
    524: 'https://explorer.testnet.mantle.xyz/address/',
    525: 'https://opbnbscan.com/address/'
  },
  tokenExploreUrl: {
    1: 'https://etherscan.io/token/', // /token/
    5: 'https://goerli.etherscan.io/token/', // /token/
    2: 'https://arbiscan.io/address/', // /address/
    22: 'https://goerli.arbiscan.io/token/',
    3: 'https://etherscan.io/token/', // same as etherscan
    33: 'https://goerli.etherscan.io/token/',
    4: 'https://starkscan.co/token/',
    44: 'https://testnet.starkscan.co/token/',
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
    14: "https://explorer.zksync.io/tokens/",
    514: 'https://goerli.explorer.zksync.io/tokens/',
    15: 'https://bscscan.com/tokens',
    515: 'https://testnet.bscscan.com/tokens',
    16: 'https://nova-explorer.arbitrum.io/token/',
    516: 'https://goerli-rollup-explorer.arbitrum.io/token/',
    517: 'https://explorer.public.zkevm-test.net/token/',
    518: 'https://l1scan.scroll.io/token/',
    519: 'https://l2scan.scroll.io/token/',
    520: 'https://l2explorer.a1.taiko.xyz/token/',
    521: 'https://goerli.basescan.org/token/',
    522: 'https://goerli.lineascan.build/token/'
  },
}
