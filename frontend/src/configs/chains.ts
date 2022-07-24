export const myChainToMetamask = {
  1: 1,
  2: 42161,
  22: 421611,
  3: 1,
  33: 4,
  4: 4,
  5: 4,
}

export const metamaskChains = {
  chainList: [
    {
      name: 'Ethereum',
      chainId: 1,
      shortName: 'eth',
      networkId: 1,
      nativeCurrency: {
        name: 'Ether',
        symbol: 'ETH',
        decimals: 18,
      },
      rpc: [
        'https://mainnet.infura.io/v3/${INFURA_API_KEY}',
        'wss://mainnet.infura.io/ws/v3/${INFURA_API_KEY}',
        'https://api.mycryptoapi.com/eth',
        'https://cloudflare-eth.com',
      ],
      faucets: [],
      infoURL: 'https://etherscan.io/',
    },
    {
      name: 'Rinkeby',
      chainId: 4,
      shortName: 'rin',
      networkId: 4,
      nativeCurrency: {
        name: 'Rinkeby Ether',
        symbol: 'RIN',
        decimals: 18,
      },
      rpc: [
        'https://rinkeby.infura.io/v3/125c410d47c94c4fbbc6f9fc3a33bf68',
        'wss://rinkeby.infura.io/ws/v3/125c410d47c94c4fbbc6f9fc3a33bf68',
      ],
      faucets: ['https://faucet.rinkeby.io'],
      infoURL: 'https://rinkeby.etherscan.io/',
    },
    {
      name: 'Ropsten',
      chainId: 3,
      shortName: 'rop',
      networkId: 3,
      nativeCurrency: {
        name: 'Ropsten Ether',
        symbol: 'ROP',
        decimals: 18,
      },
      rpc: [
        'https://ropsten.infura.io/v3/${INFURA_API_KEY}',
        'wss://ropsten.infura.io/ws/v3/${INFURA_API_KEY}',
      ],
      faucets: ['https://faucet.ropsten.be?${ADDRESS}'],
      infoURL: 'https://ropsten.etherscan.io/',
    },
    {
      name: 'Arbitrum',
      chainId: 42161,
      shortName: 'arb1',
      networkId: 42161,
      nativeCurrency: {
        name: 'Ether',
        symbol: 'AETH',
        decimals: 18,
      },
      rpc: [
        'https://mainnet.infura.io/v3/${INFURA_API_KEY}',
        'https://arb-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}',
        'https://arb1.arbitrum.io/rpc',
        'wss://arb1.arbitrum.io/ws',
      ],
      faucets: [],
      infoURL: 'https://arbiscan.io/',
    },
    {
      name: 'Arbitrum(R)',
      chainId: 421611,
      shortName: 'arb-rinkeby',
      networkId: 421611,
      nativeCurrency: {
        name: 'Arbitrum Rinkeby Ether',
        symbol: 'ARETH',
        decimals: 18,
      },
      rpc: ['https://rinkeby.arbitrum.io/rpc', 'wss://rinkeby.arbitrum.io/ws'],
      faucets: [],
      infoURL: 'https://rinkeby-explorer.arbitrum.io/',
    },
  ],
}
