export default {
  s3Proof:{},
  s3AccessKeyId:'',
  s3SecretAccessKey:'',
  starknetAddress: {
    '0xe4edb277e41dc89ab076a1f049f4a3efa700bce8': '0x064A24243F2Aabae8D2148FA878276e6E6E452E3941b417f3c33b1649EA83e11',
    '0x80c67432656d59144ceff962e8faf8926599bcf8': '0x07b393627bd514d2aa4c83e9f0c468939df15ea3c29980cd8e7be3ec847795f0',
    '0x095d2918b03b2e86d68551dcf11302121fb626c9': '0x0411c2a2a4dc7b4d3a33424af3ede7e2e3b66691e22632803e37e2e0de450940',
    "": "0x050e5ba067562e87b47d87542159e16a627e85b00de331a53b471cee1a4e5a4f",
    "0xe06d06887b1a5638b882f1dcb054059c9bfd63ea": "0x02379d9a1a1fd2c85d66457c7bc6bfd28215732cde1ba0f9a8f7a30e10bb8489",
    "0x80cead4b66a87d1f728eba116b94592b57eb0695": "0x0274ff9139350580a93a4ed390de13fdd5bb333d18344146612af4e17593e100",

    "0x41d3d33156ae7c62c094aae2995003ae63f587b3":"0x0411c2a2a4dc7b4d3a33424af3ede7e2e3b66691e22632803e37e2e0de450940",
    "0xd7aa9ba6caac7b0436c91396f22ca5a7f31664fc":"0x0411c2a2a4dc7b4d3a33424af3ede7e2e3b66691e22632803e37e2e0de450940"
  },
  mainnet: {
    wsEndPoint: 'wss://eth-mainnet.alchemyapi.io/v2/Your Key',
    httpEndPoint: 'https://eth-mainnet.alchemyapi.io/v2/Your Key',
    api: {
      endPoint: 'https://api.etherscan.io/api',
      key: 'Your Key', // limit
    },
    gasKey: 'Your Key',
    gasPrice: 0,
  },
  goerli: {
    wsEndPoint: 'wss://eth-goerli.g.alchemy.com/v2/9h7boiEJ7IkEvl326AcGx9Rsd2asvXsL',
    httpEndPoint: 'https://eth-goerli.g.alchemy.com/v2/9h7boiEJ7IkEvl326AcGx9Rsd2asvXsL',
    httpEndPointInfura: 'https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
    api: {
      endPoint: 'https://api-goerli.etherscan.io/api',
      key: '',
    },
    gasPrice: 2,
    customChainId: 5,
  },
  optimism_test: {
    wsEndPoint: 'wss://opt-goerli.g.alchemy.com/v2/AEKEpYQZ9JzGlxjO3V5tdM5C-F-9LHpY',
    httpEndPoint: 'https://opt-goerli.g.alchemy.com/v2/AEKEpYQZ9JzGlxjO3V5tdM5C-F-9LHpY',
    httpEndPointInfura: 'https://goerli.optimism.io',
    api: {
      endPoint: 'https://api-goerli-optimism.etherscan.io/api',
      key: '',
    },
    gasPrice: 2,
    customChainId: 420,
  },
  arbitrum_test: {
    wsEndPoint: 'https://goerli-rollup.arbitrum.io/rpc',
    httpEndPoint: 'https://goerli-rollup.arbitrum.io/rpc',
    httpEndPointInfura: 'https://arb-goerli.g.alchemy.com/v2/demo',
    api: {
      endPoint: 'https://api-goerli.arbiscan.io/api',
      key: '',
    },
    gasPrice: 2,
    customChainId: 421613,
  },
  zksync2_test: {
    wsEndPoint: 'wss://zksync2-testnet.zksync.dev/ws',
    httpEndPoint: 'https://zksync2-testnet.zksync.dev',
    api: {
      endPoint: 'https://zksync2-testnet.zkscan.io/api',
      key: '',
    },
    gasPrice: 2,
    customChainId: 280,
  },
  zksync_test: {
    wsEndPoint: null,
    httpEndPoint: 'https://rinkeby-api.zksync.io/api/v0.2',
    api: {
      endPoint: 'https://rinkeby-api.zksync.io/api/v0.2',
      key: '',
    },
    gasPrice: 2,
  },
  arbitrum: {
    wsEndPoint: 'wss://arb-mainnet.g.alchemy.com/v2/Your Key',
    httpEndPoint: 'https://arb-mainnet.g.alchemy.com/v2/Your Key',
    api: {
      endPoint: 'https://api.arbiscan.io/api',
      key: '',
    },
    gasPrice: 2,
    customChainId: 42161,
  },
  zksync: {
    wsEndPoint: null,
    httpEndPoint: 'https://api.zksync.io/api/v0.2',
    api: {
      endPoint: 'https://api.zksync.io/api/v0.2',
      key: '',
    },
    gasPrice: 2,
  },
  starknet: {
    wsEndPoint: null,
    httpEndPoint: 'https://starknet-mainnet.public.blastapi.io',
    api: {
      endPoint: 'https://alpha-mainnet.starknet.io',
      key: '',
    },
    gasPrice: 2,
  },
  starknet_test: {
    wsEndPoint: null,
    httpEndPoint: 'https://starknet-testnet.public.blastapi.io',
    api: {
      endPoint: 'https://alpha4.starknet.io',
      key: '',
    },
    gasPrice: 2,
  },
  polygon: {
    wsEndPoint: 'wss://polygon-mainnet.g.alchemy.com/v2/Your Key',
    httpEndPoint: 'https://polygon-mainnet.g.alchemy.com/v2/Your Key',
    api: {
      endPoint: 'https://api.polygonscan.com/api',
      key: 'Your Key',
    },
    gasPrice: 2,
    customChainId: 137,
  },
  polygon_test: {
    wsEndPoint: 'wss://polygon-mumbai.g.alchemy.com/v2/Your Key',
    httpEndPoint: 'https://polygon-mumbai.g.alchemy.com/v2/Your Key',
    api: {
      endPoint: 'https://api-testnet.polygonscan.com/api',
      key: 'Your Key',
    },
    gasPrice: 2,
    customChainId: 80001,
  },
  metis: {
    wsEndPoint: 'wss://andromeda-ws.metis.io',
    httpEndPoint: 'https://andromeda.metis.io/?owner=1088',
    api: {
      endPoint: 'https://andromeda-explorer.metis.io/api',
      key: '',
    },
    gasPrice: 2,
    customChainId: 1088,
  },
  metis_test: {
    wsEndPoint: 'wss://stardust-ws.metis.io',
    httpEndPoint: 'https://stardust.metis.io/?owner=588',
    api: {
      endPoint: 'https://stardust-explorer.metis.io/api',
      key: '',
    },
    gasPrice: 2,
    customChainId: 588,
  },
  optimism: {
    wsEndPoint: 'wss://opt.g.alchemy.com/v2/Your Key',
    httpEndPoint: 'https://opt.g.alchemy.com/v2/Your Key',
    api: {
      endPoint: 'https://api-optimistic.etherscan.io/api',
      key: 'Your Key',
    },
    gasPrice: 2,
    customChainId: 10,
  },
  immutableX: {
    wsEndPoint: null,
    httpEndPoint: 'https://api.x.immutable.com/v1',
    api: {
      endPoint: 'https://api.x.immutable.com/v1',
      key: '',
    },
    gasPrice: 2,
  },
  immutableX_test: {
    wsEndPoint: null,
    httpEndPoint: 'https://api.ropsten.x.immutable.com/v1',
    api: {
      endPoint: 'https://api.ropsten.x.immutable.com/v1',
      key: '',
    },
    gasPrice: 2,
  },
  loopring: {
    wsEndPoint: null,
    httpEndPoint: 'https://api3.loopring.io/api/v3',
    api: {
      endPoint: 'https://api3.loopring.io/api/v3',
      key: '',
    },
    gasPrice: 2,
  },
  loopring_test: {
    wsEndPoint: null,
    httpEndPoint: 'https://uat2.loopring.io',
    api: {
      endPoint: 'https://uat2.loopring.io',
      key: '',
    },
    gasPrice: 2,
  },
  dydx: {
    wsEndPoint: null,
    httpEndPoint: 'https://api.dydx.exchange',
    api: {
      endPoint: 'https://api.dydx.exchange',
      key: '',
    },
    gasPrice: 2,
  },
  dydx_test: {
    wsEndPoint: null,
    httpEndPoint: 'https://api.stage.dydx.exchange',
    api: {
      endPoint: 'https://api.stage.dydx.exchange',
      key: '',
    },
    gasPrice: 2,
  },
  zkspace: {
    wsEndPoint: null,
    httpEndPoint: 'https://api.zks.app/v3/1',
    api: {
      endPoint: 'https://api.zks.app/v3/1',
      key: '',
      chainID: 13,
    },
    gasPrice: 2,
  },
  zkspace_test: {
    wsEndPoint: null,
    httpEndPoint: 'https://api.zks.app/v3/4',
    api: {
      endPoint: 'https://api.zks.app/v3/4',
      key: '',
      chainID: 133,
    },
    gasPrice: 2,
  },
  boba: {
    wsEndPoint: 'wss://ws.mainnet.boba.network',
    httpEndPoint: 'https://mainnet.boba.network',
    api: {
      endPoint: 'https://blockexplorer.boba.network/api',
      key: '',
    },
    gasPrice: 2,
    customChainId: 288,
  },
  boba_test: {
    wsEndPoint: 'wss://wss.rinkeby.boba.network',
    httpEndPoint: 'https://rinkeby.boba.network',
    api: {
      endPoint: 'https://blockexplorer.rinkeby.boba.network/graphiql',
      key: '',
    },
    gasPrice: 2,
    customChainId: 28,
  },
  polygon_zkevm_test: {
    wsEndPoint: 'https://public.zkevm-test.net:2083',
    httpEndPoint: 'https://public.zkevm-test.net:2083',
    httpEndPointInfura: '',
    api: {
      endPoint: '',
      key: '',
    },
    customChainId: 1402,
  },
  polygon_evm: {
    wsEndPoint: null,
    httpEndPoint: 'https://zkevm-rpc.com',
    api: {
      endPoint: 'https://api-zkevm.polygonscan.com',
      key: '',
    },
    gasPrice: 2,
    customChainId: 1101,
  },
  zksync2: {
    wsEndPoint: 'wss://zksync2-mainnet.zksync.io',
    httpEndPoint: 'https://zksync2-mainnet.zksync.io',
    api: {
      endPoint: 'https://zksync2-mainnet.zkscan.io/api',
      key: '',
    },
    gasPrice: 2,
    customChainId: 324,
  },
  bnbchain: {
    wsEndPoint: 'wss://bsc-ws-node.nariox.org',
    httpEndPoint: 'https://bsc-dataseed1.binance.org',
    httpEndPointInfura: '',
    api: {
      endPoint: '',
      key: '',
    },
    gasPrice: 2,
    customChainId: 56,
  },
  bnbchain_test: {
    wsEndPoint: 'https://data-seed-prebsc-1-s1.binance.org:8545',
    httpEndPoint: 'https://data-seed-prebsc-1-s1.binance.org:8545',
    httpEndPointInfura: '',
    api: {
      endPoint: '',
      key: '',
    },
    gasPrice: 2,
    customChainId: 97,
  },
  arbitrum_nova: {
    wsEndPoint: 'https://nova.arbitrum.io/rpc',
    httpEndPoint: 'https://nova.arbitrum.io/rpc',
    httpEndPointInfura: '',
    api: {
      endPoint: 'https://nova-explorer.arbitrum.io/api',
      key: '',
    },
    gasPrice: 2,
    customChainId: 42170,
  },
  arbitrum_nova_test: {
    wsEndPoint: 'https://goerli-rollup.arbitrum.io/rpc',
    httpEndPoint: 'https://goerli-rollup.arbitrum.io/rpc',
    httpEndPointInfura: '',
    api: {
      endPoint: 'https://goerli-rollup-explorer.arbitrum.io/api',
      key: '',
    },
    gasPrice: 2,
    customChainId: 421613,
  },
  scroll_l1_test: {
    wsEndPoint: 'https://prealpha.scroll.io/l1',
    httpEndPoint: 'https://prealpha.scroll.io/l1',
    api: {
      endPoint: 'https://l1scan.scroll.io',
      key: '',
    },
    gasPrice: 2,
    customChainId: 534351,
  },
  scroll_l2_test: {
    wsEndPoint: 'https://prealpha.scroll.io/l2',
    httpEndPoint: 'https://prealpha.scroll.io/l2',
    api: {
      endPoint: 'https://l2scan.scroll.io',
      key: '',
    },
    gasPrice: 2,
    customChainId: 534354,
  },
  privateKeys: {
    '': 'ee636e1235228c8f2d19e369c787921a171e768ca842d5ff8e0973618d530a50',
    '0x050e5ba067562e87b47d87542159e16a627e85b00de331a53b471cee1a4e5a4f': '0x6a83b80242e72fc371cb63352c5094c5ea993f9e5f322e00f54533d39b80b2e',
    "0xe06d06887b1a5638b882f1dcb054059c9bfd63ea": "c58eacd5a327c2b0f997fcc6ed9ae147144954f9238a5e03524c5b8c17a0a4c2",
    "0x02379d9a1a1fd2c85d66457c7bc6bfd28215732cde1ba0f9a8f7a30e10bb8489": "1384030132976819129566536341837576539302965912622674768433445465624252567329",
    "0x80cead4b66a87d1f728eba116b94592b57eb0695": "148985dc4e0ed799340c0ed8ed7dc23ed91b13b599f3c120749064acf69b0500",
    "0x0274ff9139350580a93a4ed390de13fdd5bb333d18344146612af4e17593e100": "682640599990092794806472936002631202083428259458665632306440537847893420341"
  }, // ex: {'': 'This address's private key'}
  crossAddressContracts: {},
  ABI: [
    {
      inputs: [
        { internalType: 'uint256', name: '_initialSupply', type: 'uint256' },
      ],
      stateMutability: 'nonpayable',
      type: 'constructor',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'owner',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'spender',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'value',
          type: 'uint256',
        },
      ],
      name: 'Approval',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
      ],
      name: 'MinterAdded',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
      ],
      name: 'MinterRemoved',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'from',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
      ],
      name: 'NewOwnership',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'from',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
      ],
      name: 'NewPendingOwnership',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'from',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'value',
          type: 'uint256',
        },
      ],
      name: 'Transfer',
      type: 'event',
    },
    {
      inputs: [],
      name: 'acceptOwnership',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'address', name: '_account', type: 'address' }],
      name: 'addMinter',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'address', name: 'owner', type: 'address' },
        { internalType: 'address', name: 'spender', type: 'address' },
      ],
      name: 'allowance',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'address', name: 'spender', type: 'address' },
        { internalType: 'uint256', name: 'amount', type: 'uint256' },
      ],
      name: 'approve',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
      name: 'balanceOf',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'uint256', name: 'amount', type: 'uint256' }],
      name: 'burn',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'address', name: 'account', type: 'address' },
        { internalType: 'uint256', name: 'amount', type: 'uint256' },
      ],
      name: 'burnFrom',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'decimals',
      outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'address', name: 'spender', type: 'address' },
        { internalType: 'uint256', name: 'subtractedValue', type: 'uint256' },
      ],
      name: 'decreaseAllowance',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'governor',
      outputs: [{ internalType: 'address', name: '', type: 'address' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'address', name: 'spender', type: 'address' },
        { internalType: 'uint256', name: 'addedValue', type: 'uint256' },
      ],
      name: 'increaseAllowance',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'address', name: '_account', type: 'address' }],
      name: 'isMinter',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'address', name: '_to', type: 'address' },
        { internalType: 'uint256', name: '_amount', type: 'uint256' },
      ],
      name: 'mint',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'name',
      outputs: [{ internalType: 'string', name: '', type: 'string' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'address', name: '', type: 'address' }],
      name: 'nonces',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'pendingGovernor',
      outputs: [{ internalType: 'address', name: '', type: 'address' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'address', name: '_owner', type: 'address' },
        { internalType: 'address', name: '_spender', type: 'address' },
        { internalType: 'uint256', name: '_value', type: 'uint256' },
        { internalType: 'uint256', name: '_deadline', type: 'uint256' },
        { internalType: 'uint8', name: '_v', type: 'uint8' },
        { internalType: 'bytes32', name: '_r', type: 'bytes32' },
        { internalType: 'bytes32', name: '_s', type: 'bytes32' },
      ],
      name: 'permit',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'address', name: '_account', type: 'address' }],
      name: 'removeMinter',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'renounceMinter',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'symbol',
      outputs: [{ internalType: 'string', name: '', type: 'string' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'totalSupply',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'address', name: 'recipient', type: 'address' },
        { internalType: 'uint256', name: 'amount', type: 'uint256' },
      ],
      name: 'transfer',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'address', name: 'sender', type: 'address' },
        { internalType: 'address', name: 'recipient', type: 'address' },
        { internalType: 'uint256', name: 'amount', type: 'uint256' },
      ],
      name: 'transferFrom',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'address', name: '_newGovernor', type: 'address' },
      ],
      name: 'transferOwnership',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
  ],
}
