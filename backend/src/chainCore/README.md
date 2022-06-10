# Orbiter-Finance ChainCoreBin

[Hacker News](https://github.com/Orbiter-Finance) showcase using typescript

## QuickStart

### Chain structure

- chains.json Mainnet
- testnet.json Testnet

```json
{
  // Whether to enable debug mode, default false
  "debug": false,
  "api": {
    // API interface of block browser
    "url": "https://api.etherscan.io/api",
    // Interface request key, if any
    "key": "84974CAA7PEIHE6CC5WTBZFVGBIBU9YQ2S"
  },
  // ChainID
  "chainId": "1",
  // NetworkId In most public chains, the network ID and the public chain ID are the same
  "networkId": "1",
  // Orbiter custom id，unique, not repeated
  "internalId": "1",
  // Chain Name
  "name": "Ethereum Mainnet",
  // The default main currency of the public chain
  "nativeCurrency": {
    // Token Name
    "name": "Ether",
    // Token Symbol
    "symbol": "ETH",
    // Token decimals
    "decimals": 18,
    // Token Contract Address
    "address": "0x0000000000000000000000000000000000000000"
  },
  // RPC server address
  "rpc": [
    "wss://eth-mainnet.alchemyapi.io/v2/1qliM8190Db9cTpzuJcItGucaESVHdP-"
  ],
  // The monitoring method to enable
  "watch": ["rpc", "api"],
  // contract address to monitor
  "contracts": ["0xd9d74a29307cc6fc8bf424ee4217f1a587fbc8dc"],
  // List of contract tokens to monitor
  "tokens": [
    // The structure is consistent with nativeCurrency
    {
      "name": "USD Coin",
      "symbol": "USDC",
      "decimals": 6,
      "address": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
    }
  ]
}
```

### Easy access to code

```
import { ScanChainMain } from '../chainCore'
const watchList = {
    'Chain Config InternalId':['0x12345..... You Watch Wallet Address']
};
const scanChain = new ScanChainMain(watchList)
for (const intranetId in watchList) {
    scanChain.mq.subscribe(`${intranetId}:txlist`,(result) => {
        // Subscribe to deal list
    })
}
// Start Watch
scanChain.run()
```

### Monitored cursor position

- The monitored cursor position is stored and the cache directory

#### Struct

```
{
  "cache": [
    [
      "keyv:ApiCursor:{Wallet Address}",
      {
        "value": "{\"value\":{\"blockNumber\":{Last Watch Tx Number},\"hash\":\"{Last Watch Tx Hash}\",\"timestamp\":{Last Watch Tx Time}}},\"expires\":null}"
      }
    ],
    [
      "keyv:rpcScan:288",
      {
        "value": "{\"value\":{RPC Last Scan Block Number}},\"expires\":null}"
      }
    ]
  ],
  "lastExpire": 1654672839824
}

```

### Query historical transactions
- If you need to query historical transactions, you need to rebuild the cursor index, and you need to modify the index file in the cache directory corresponding to the public chain
- Api Major Modified Fields
  - blockNumber   // Start scanning from this block
  - hash // Start scanning from this Hash
  - timestamp // Start scanning from this Time
- RPC Major Modified Fields
  - rpcScan-> value // Start scanning from this block
### Requirement

- Node.js 8.x+
- Typescript 2.8+
