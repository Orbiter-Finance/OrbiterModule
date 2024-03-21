import {cloneDeep} from 'lodash';
export const makerListHistory = [];
const initMakerList = [
  {
    "id": "1-2/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 1,
    "c2ID": 2,
    "c1Name": "mainnet",
    "c2Name": "arbitrum",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0012,
    "c2TradingFee": 0.0058,
    "c1GasFee": 0.15,
    "c2GasFee": 0.3,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 10,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 10,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "1-2/USDC",
    "tName": "USDC",
    "makerAddress": "0x41d3d33156ae7c62c094aae2995003ae63f587b3",
    "c1ID": 1,
    "c2ID": 2,
    "c1Name": "mainnet",
    "c2Name": "arbitrum",
    "t1Address": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    "t2Address": "0xff970a61a04b1ca14834a43f5de4533ebddb5cc8",
    "precision": 6,
    "c1TradingFee": 2,
    "c2TradingFee": 15,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 10000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 10000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "1-2/USDT",
    "tName": "USDT",
    "makerAddress": "0xd7aa9ba6caac7b0436c91396f22ca5a7f31664fc",
    "c1ID": 1,
    "c2ID": 2,
    "c1Name": "mainnet",
    "c2Name": "arbitrum",
    "t1Address": "0xdac17f958d2ee523a2206206994597c13d831ec7",
    "t2Address": "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9",
    "precision": 6,
    "c1TradingFee": 2,
    "c2TradingFee": 15,
    "c1GasFee": 0.2,
    "c2GasFee": 0.2,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 10000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 10000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "1-3/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 1,
    "c2ID": 3,
    "c1Name": "mainnet",
    "c2Name": "zksync",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0013,
    "c2TradingFee": 0.0058,
    "c1GasFee": 0.15,
    "c2GasFee": 0.3,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 10,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 10,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "1-3/USDC",
    "tName": "USDC",
    "makerAddress": "0x41d3d33156ae7c62c094aae2995003ae63f587b3",
    "c1ID": 1,
    "c2ID": 3,
    "c1Name": "mainnet",
    "c2Name": "zksync",
    "t1Address": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    "t2Address": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    "precision": 6,
    "c1TradingFee": 1.8,
    "c2TradingFee": 15,
    "c1GasFee": 0.5,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 10000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 10000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "1-3/USDT",
    "tName": "USDT",
    "makerAddress": "0xd7aa9ba6caac7b0436c91396f22ca5a7f31664fc",
    "c1ID": 1,
    "c2ID": 3,
    "c1Name": "mainnet",
    "c2Name": "zksync",
    "t1Address": "0xdac17f958d2ee523a2206206994597c13d831ec7",
    "t2Address": "0xdac17f958d2ee523a2206206994597c13d831ec7",
    "precision": 6,
    "c1TradingFee": 1.6,
    "c2TradingFee": 15,
    "c1GasFee": 0.2,
    "c2GasFee": 0.2,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 10000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 10000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "1-4/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 1,
    "c2ID": 4,
    "c1Name": "mainnet",
    "c2Name": "starknet",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
    "precision": 18,
    "c1TradingFee": 0.0014,
    "c2TradingFee": 0.0058,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "1-4/USDC",
    "tName": "USDC",
    "makerAddress": "0x41d3d33156ae7c62c094aae2995003ae63f587b3",
    "c1ID": 1,
    "c2ID": 4,
    "c1Name": "mainnet",
    "c2Name": "starknet",
    "t1Address": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    "t2Address": "0x053c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8",
    "precision": 6,
    "c1TradingFee": 1.8,
    "c2TradingFee": 15,
    "c1GasFee": 0.5,
    "c2GasFee": 1,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 10000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 10000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "1-4/USDT",
    "tName": "USDT",
    "makerAddress": "0xd7aa9ba6caac7b0436c91396f22ca5a7f31664fc",
    "c1ID": 1,
    "c2ID": 4,
    "c1Name": "mainnet",
    "c2Name": "starknet",
    "t1Address": "0xdac17f958d2ee523a2206206994597c13d831ec7",
    "t2Address": "0x068f5c6a61780768455de69077e07e89787839bf8166decfbf92b645209c0fb8",
    "precision": 6,
    "c1TradingFee": 1.8,
    "c2TradingFee": 15,
    "c1GasFee": 0.5,
    "c2GasFee": 1,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 5000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 5000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "1-6/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 1,
    "c2ID": 6,
    "c1Name": "mainnet",
    "c2Name": "polygon",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0.0058,
    "c1GasFee": 0.15,
    "c2GasFee": 0.3,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 10,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 10,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "1-6/USDC",
    "tName": "USDC",
    "makerAddress": "0x41d3d33156ae7c62c094aae2995003ae63f587b3",
    "c1ID": 1,
    "c2ID": 6,
    "c1Name": "mainnet",
    "c2Name": "polygon",
    "t1Address": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    "t2Address": "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
    "precision": 6,
    "c1TradingFee": 1.5,
    "c2TradingFee": 15,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 10000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 10000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "1-6/USDT",
    "tName": "USDT",
    "makerAddress": "0xd7aa9ba6caac7b0436c91396f22ca5a7f31664fc",
    "c1ID": 1,
    "c2ID": 6,
    "c1Name": "mainnet",
    "c2Name": "polygon",
    "t1Address": "0xdac17f958d2ee523a2206206994597c13d831ec7",
    "t2Address": "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
    "precision": 6,
    "c1TradingFee": 1.6,
    "c2TradingFee": 15,
    "c1GasFee": 0.2,
    "c2GasFee": 0.2,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 10000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 10000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "1-7/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 1,
    "c2ID": 7,
    "c1Name": "mainnet",
    "c2Name": "optimism",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0017,
    "c2TradingFee": 0.0058,
    "c1GasFee": 0.15,
    "c2GasFee": 0.3,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 10,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 10,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "1-7/USDC",
    "tName": "USDC",
    "makerAddress": "0x41d3d33156ae7c62c094aae2995003ae63f587b3",
    "c1ID": 1,
    "c2ID": 7,
    "c1Name": "mainnet",
    "c2Name": "optimism",
    "t1Address": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    "t2Address": "0x7f5c764cbc14f9669b88837ca1490cca17c31607",
    "precision": 6,
    "c1TradingFee": 2,
    "c2TradingFee": 15,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 10000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 10000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "1-7/USDT",
    "tName": "USDT",
    "makerAddress": "0xd7aa9ba6caac7b0436c91396f22ca5a7f31664fc",
    "c1ID": 1,
    "c2ID": 7,
    "c1Name": "mainnet",
    "c2Name": "optimism",
    "t1Address": "0xdac17f958d2ee523a2206206994597c13d831ec7",
    "t2Address": "0x94b008aa00579c1307b0ef2c499ad98a8ce58e58",
    "precision": 6,
    "c1TradingFee": 2.5,
    "c2TradingFee": 15,
    "c1GasFee": 0.2,
    "c2GasFee": 0.2,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 10000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 10000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "1-8/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 1,
    "c2ID": 8,
    "c1Name": "mainnet",
    "c2Name": "immutableX",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0.0058,
    "c1GasFee": 0.2,
    "c2GasFee": 0.3,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "1-9/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 1,
    "c2ID": 9,
    "c1Name": "mainnet",
    "c2Name": "loopring",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0.0058,
    "c1GasFee": 0.15,
    "c2GasFee": 0.3,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "1-12/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 1,
    "c2ID": 12,
    "c1Name": "mainnet",
    "c2Name": "zkspace",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0058,
    "c1GasFee": 0.2,
    "c2GasFee": 0.3,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "1-13/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 1,
    "c2ID": 13,
    "c1Name": "mainnet",
    "c2Name": "boba",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.0058,
    "c1GasFee": 0.2,
    "c2GasFee": 0.3,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "1-14/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 1,
    "c2ID": 14,
    "c1Name": "mainnet",
    "c2Name": "zksync2",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0021,
    "c2TradingFee": 0.0058,
    "c1GasFee": 0,
    "c2GasFee": 1,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 10,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "1-14/USDC",
    "tName": "USDC",
    "makerAddress": "0x41d3d33156ae7c62c094aae2995003ae63f587b3",
    "c1ID": 1,
    "c2ID": 14,
    "c1Name": "mainnet",
    "c2Name": "zksync2",
    "t1Address": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    "t2Address": "0x3355df6d4c9c3035724fd0e3914de96a5a83aaf4",
    "precision": 6,
    "c1TradingFee": 2,
    "c2TradingFee": 15,
    "c1GasFee": 0,
    "c2GasFee": 1,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 10000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 10000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "1-14/USDT",
    "tName": "USDT",
    "makerAddress": "0xd7aa9ba6caac7b0436c91396f22ca5a7f31664fc",
    "c1ID": 1,
    "c2ID": 14,
    "c1Name": "mainnet",
    "c2Name": "zksync2",
    "t1Address": "0xdac17f958d2ee523a2206206994597c13d831ec7",
    "t2Address": "0x493257fd37edb34451f62edf8d2a0c418852ba4c",
    "precision": 6,
    "c1TradingFee": 2,
    "c2TradingFee": 15,
    "c1GasFee": 0,
    "c2GasFee": 1,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 20000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 20000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "1-15/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 1,
    "c2ID": 15,
    "c1Name": "mainnet",
    "c2Name": "bnbchain",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0.0058,
    "c1GasFee": 0,
    "c2GasFee": 0.3,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 10,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 10,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "1-15/USDC",
    "tName": "USDC",
    "makerAddress": "0x41d3d33156ae7c62c094aae2995003ae63f587b3",
    "c1ID": 1,
    "c2ID": 15,
    "c1Name": "mainnet",
    "c2Name": "bnbchain",
    "t1Address": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    "t2Address": "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d",
    "precision": 6,
    "c1TradingFee": 2,
    "c2TradingFee": 15,
    "c1GasFee": 0.5,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 20000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 20000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "1-15/USDT",
    "tName": "USDT",
    "makerAddress": "0xd7aa9ba6caac7b0436c91396f22ca5a7f31664fc",
    "c1ID": 1,
    "c2ID": 15,
    "c1Name": "mainnet",
    "c2Name": "bnbchain",
    "t1Address": "0xdac17f958d2ee523a2206206994597c13d831ec7",
    "t2Address": "0x55d398326f99059ff775485246999027b3197955",
    "precision": 6,
    "c1TradingFee": 2,
    "c2TradingFee": 15,
    "c1GasFee": 0.5,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 20000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 20000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "1-16/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 1,
    "c2ID": 16,
    "c1Name": "mainnet",
    "c2Name": "arbitrum_nova",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0058,
    "c1GasFee": 0,
    "c2GasFee": 6,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "1-16/USDC",
    "tName": "USDC",
    "makerAddress": "0x41d3d33156ae7c62c094aae2995003ae63f587b3",
    "c1ID": 1,
    "c2ID": 16,
    "c1Name": "mainnet",
    "c2Name": "arbitrum_nova",
    "t1Address": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    "t2Address": "0x750ba8b76187092b0d1e87e28daaf484d1b5273b",
    "precision": 6,
    "c1TradingFee": 1,
    "c2TradingFee": 15,
    "c1GasFee": 0,
    "c2GasFee": 2,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 10000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 3000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "1-17/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 1,
    "c2ID": 17,
    "c1Name": "mainnet",
    "c2Name": "polygon_evm",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0012,
    "c2TradingFee": 0.0058,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "1-17/USDC",
    "tName": "USDC",
    "makerAddress": "0x41d3d33156ae7c62c094aae2995003ae63f587b3",
    "c1ID": 1,
    "c2ID": 17,
    "c1Name": "mainnet",
    "c2Name": "polygon_evm",
    "t1Address": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    "t2Address": "0xa8ce8aee21bc2a48a5ef670afcc9274c7bbbc035",
    "precision": 6,
    "c1TradingFee": 1.8,
    "c2TradingFee": 15,
    "c1GasFee": 0.5,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 10000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 10000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "1-17/USDT",
    "tName": "USDT",
    "makerAddress": "0xd7aa9ba6caac7b0436c91396f22ca5a7f31664fc",
    "c1ID": 1,
    "c2ID": 17,
    "c1Name": "mainnet",
    "c2Name": "polygon_evm",
    "t1Address": "0xdac17f958d2ee523a2206206994597c13d831ec7",
    "t2Address": "0x1e4a5963abfd975d8c9021ce480b42188849d41d",
    "precision": 6,
    "c1TradingFee": 1.8,
    "c2TradingFee": 15,
    "c1GasFee": 0.5,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 5000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 5000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "1-19/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 1,
    "c2ID": 19,
    "c1Name": "mainnet",
    "c2Name": "scroll",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0015,
    "c2TradingFee": 0.0058,
    "c1GasFee": 0,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "1-19/USDT",
    "tName": "USDT",
    "makerAddress": "0xd7aa9ba6caac7b0436c91396f22ca5a7f31664fc",
    "c1ID": 1,
    "c2ID": 19,
    "c1Name": "mainnet",
    "c2Name": "scroll",
    "t1Address": "0xdac17f958d2ee523a2206206994597c13d831ec7",
    "t2Address": "0xf55bec9cafdbe8730f096aa55dad6d22d44099df",
    "precision": 6,
    "c1TradingFee": 2,
    "c2TradingFee": 15,
    "c1GasFee": 0,
    "c2GasFee": 1,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 20000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 20000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "1-19/USDC",
    "tName": "USDC",
    "makerAddress": "0x41d3d33156ae7c62c094aae2995003ae63f587b3",
    "c1ID": 1,
    "c2ID": 19,
    "c1Name": "mainnet",
    "c2Name": "scroll",
    "t1Address": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    "t2Address": "0x06efdbff2a14a7c8e15944d1f4a48f9f95f663a4",
    "precision": 6,
    "c1TradingFee": 2,
    "c2TradingFee": 15,
    "c1GasFee": 0,
    "c2GasFee": 1,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 20000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 20000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "1-21/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 1,
    "c2ID": 21,
    "c1Name": "mainnet",
    "c2Name": "base",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0015,
    "c2TradingFee": 0.0058,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "1-21/USDC",
    "tName": "USDC",
    "makerAddress": "0x41d3d33156ae7c62c094aae2995003ae63f587b3",
    "c1ID": 1,
    "c2ID": 21,
    "c1Name": "mainnet",
    "c2Name": "base",
    "t1Address": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    "t2Address": "0xd9aaec86b65d86f6a7b5b1b0c42ffa531710b6ca",
    "precision": 6,
    "c1TradingFee": 1.4,
    "c2TradingFee": 15,
    "c1GasFee": 0.5,
    "c2GasFee": 1.5,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 20000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 20000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "1-23/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 1,
    "c2ID": 23,
    "c1Name": "mainnet",
    "c2Name": "linea",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0058,
    "c1GasFee": 0,
    "c2GasFee": 1,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "1-23/USDC",
    "tName": "USDC",
    "makerAddress": "0x41d3d33156ae7c62c094aae2995003ae63f587b3",
    "c1ID": 1,
    "c2ID": 23,
    "c1Name": "mainnet",
    "c2Name": "linea",
    "t1Address": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    "t2Address": "0x176211869ca2b568f2a7d4ee941e073a821ee1ff",
    "precision": 6,
    "c1TradingFee": 3,
    "c2TradingFee": 15,
    "c1GasFee": 0,
    "c2GasFee": 1,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 20000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 20000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "1-23/USDT",
    "tName": "USDT",
    "makerAddress": "0xd7aa9ba6caac7b0436c91396f22ca5a7f31664fc",
    "c1ID": 1,
    "c2ID": 23,
    "c1Name": "mainnet",
    "c2Name": "linea",
    "t1Address": "0xdac17f958d2ee523a2206206994597c13d831ec7",
    "t2Address": "0xa219439258ca9da29e9cc4ce5596924745e12b93",
    "precision": 6,
    "c1TradingFee": 3,
    "c2TradingFee": 15,
    "c1GasFee": 0,
    "c2GasFee": 1,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 20000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 20000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "1-24/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 1,
    "c2ID": 24,
    "c1Name": "mainnet",
    "c2Name": "mantle",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0xdeaddeaddeaddeaddeaddeaddeaddeaddead1111",
    "precision": 18,
    "c1TradingFee": 0.0018,
    "c2TradingFee": 0.0058,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "1-25/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 1,
    "c2ID": 25,
    "c1Name": "mainnet",
    "c2Name": "opbnb",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0xe7798f023fc62146e8aa1b36da45fb70855a77ea",
    "precision": 18,
    "c1TradingFee": 0.0011,
    "c2TradingFee": 0.0058,
    "c1GasFee": 0,
    "c2GasFee": 2,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "1-30/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 1,
    "c2ID": 30,
    "c1Name": "mainnet",
    "c2Name": "zora",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.0058,
    "c1GasFee": 0,
    "c2GasFee": 10,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "1-31/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 1,
    "c2ID": 31,
    "c1Name": "mainnet",
    "c2Name": "manta",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.0058,
    "c1GasFee": 0,
    "c2GasFee": 1.5,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "1-36/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 1,
    "c2ID": 36,
    "c1Name": "mainnet",
    "c2Name": "kroma",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 3,
    "c2MinPrice": 0,
    "c2MaxPrice": 0,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "1-38/USDC",
    "tName": "USDC",
    "makerAddress": "0x41d3d33156ae7c62c094aae2995003ae63f587b3",
    "c1ID": 1,
    "c2ID": 38,
    "c1Name": "mainnet",
    "c2Name": "zkfair",
    "t1Address": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 6,
    "c1TradingFee": 1.2,
    "c2TradingFee": 18,
    "c1GasFee": 1.5,
    "c2GasFee": 1.5,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 10000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 10000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "1-38/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 1,
    "c2ID": 38,
    "c1Name": "mainnet",
    "c2Name": "zkfair",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x4b21b980d0dc7d3c0c6175b0a412694f3a1c7c6b",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0055,
    "c1GasFee": 0.5,
    "c2GasFee": 1.5,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "2-3/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 2,
    "c2ID": 3,
    "c1Name": "arbitrum",
    "c2Name": "zksync",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0013,
    "c2TradingFee": 0.0011,
    "c1GasFee": 0.1,
    "c2GasFee": 0.15,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 10,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 10,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "2-3/USDC",
    "tName": "USDC",
    "makerAddress": "0x41d3d33156ae7c62c094aae2995003ae63f587b3",
    "c1ID": 2,
    "c2ID": 3,
    "c1Name": "arbitrum",
    "c2Name": "zksync",
    "t1Address": "0xff970a61a04b1ca14834a43f5de4533ebddb5cc8",
    "t2Address": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    "precision": 6,
    "c1TradingFee": 1.8,
    "c2TradingFee": 1.8,
    "c1GasFee": 0.5,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 10000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 10000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "2-3/USDT",
    "tName": "USDT",
    "makerAddress": "0xd7aa9ba6caac7b0436c91396f22ca5a7f31664fc",
    "c1ID": 2,
    "c2ID": 3,
    "c1Name": "arbitrum",
    "c2Name": "zksync",
    "t1Address": "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9",
    "t2Address": "0xdac17f958d2ee523a2206206994597c13d831ec7",
    "precision": 6,
    "c1TradingFee": 1.8,
    "c2TradingFee": 1.8,
    "c1GasFee": 0.2,
    "c2GasFee": 0.2,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 10000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 10000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "2-4/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 2,
    "c2ID": 4,
    "c1Name": "arbitrum",
    "c2Name": "starknet",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
    "precision": 18,
    "c1TradingFee": 0.0013,
    "c2TradingFee": 0.0013,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "2-4/USDC",
    "tName": "USDC",
    "makerAddress": "0x41d3d33156ae7c62c094aae2995003ae63f587b3",
    "c1ID": 2,
    "c2ID": 4,
    "c1Name": "arbitrum",
    "c2Name": "starknet",
    "t1Address": "0xff970a61a04b1ca14834a43f5de4533ebddb5cc8",
    "t2Address": "0x053c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8",
    "precision": 6,
    "c1TradingFee": 1.5,
    "c2TradingFee": 1.6,
    "c1GasFee": 0.5,
    "c2GasFee": 1,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 10000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 10000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "2-4/USDT",
    "tName": "USDT",
    "makerAddress": "0xd7aa9ba6caac7b0436c91396f22ca5a7f31664fc",
    "c1ID": 2,
    "c2ID": 4,
    "c1Name": "arbitrum",
    "c2Name": "starknet",
    "t1Address": "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9",
    "t2Address": "0x068f5c6a61780768455de69077e07e89787839bf8166decfbf92b645209c0fb8",
    "precision": 6,
    "c1TradingFee": 1.5,
    "c2TradingFee": 1.6,
    "c1GasFee": 0.5,
    "c2GasFee": 1,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 5000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 5000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "2-6/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 2,
    "c2ID": 6,
    "c1Name": "arbitrum",
    "c2Name": "polygon",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0.0011,
    "c1GasFee": 0.1,
    "c2GasFee": 0.15,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 10,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 10,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "2-6/USDC",
    "tName": "USDC",
    "makerAddress": "0x41d3d33156ae7c62c094aae2995003ae63f587b3",
    "c1ID": 2,
    "c2ID": 6,
    "c1Name": "arbitrum",
    "c2Name": "polygon",
    "t1Address": "0xff970a61a04b1ca14834a43f5de4533ebddb5cc8",
    "t2Address": "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
    "precision": 6,
    "c1TradingFee": 1.3,
    "c2TradingFee": 1.6,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 10000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 10000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "2-6/USDT",
    "tName": "USDT",
    "makerAddress": "0xd7aa9ba6caac7b0436c91396f22ca5a7f31664fc",
    "c1ID": 2,
    "c2ID": 6,
    "c1Name": "arbitrum",
    "c2Name": "polygon",
    "t1Address": "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9",
    "t2Address": "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
    "precision": 6,
    "c1TradingFee": 1.5,
    "c2TradingFee": 1.8,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 10000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 10000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "2-7/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 2,
    "c2ID": 7,
    "c1Name": "arbitrum",
    "c2Name": "optimism",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0012,
    "c2TradingFee": 0.0011,
    "c1GasFee": 0.1,
    "c2GasFee": 0.1,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 10,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 10,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "2-7/USDC",
    "tName": "USDC",
    "makerAddress": "0x41d3d33156ae7c62c094aae2995003ae63f587b3",
    "c1ID": 2,
    "c2ID": 7,
    "c1Name": "arbitrum",
    "c2Name": "optimism",
    "t1Address": "0xff970a61a04b1ca14834a43f5de4533ebddb5cc8",
    "t2Address": "0x7f5c764cbc14f9669b88837ca1490cca17c31607",
    "precision": 6,
    "c1TradingFee": 1.8,
    "c2TradingFee": 1.6,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 10000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 10000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "2-7/USDT",
    "tName": "USDT",
    "makerAddress": "0xd7aa9ba6caac7b0436c91396f22ca5a7f31664fc",
    "c1ID": 2,
    "c2ID": 7,
    "c1Name": "arbitrum",
    "c2Name": "optimism",
    "t1Address": "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9",
    "t2Address": "0x94b008aa00579c1307b0ef2c499ad98a8ce58e58",
    "precision": 6,
    "c1TradingFee": 2,
    "c2TradingFee": 1.8,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 10000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 10000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "2-8/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 2,
    "c2ID": 8,
    "c1Name": "arbitrum",
    "c2Name": "immutableX",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0.001,
    "c1GasFee": 0.1,
    "c2GasFee": 0.2,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "2-9/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 2,
    "c2ID": 9,
    "c1Name": "arbitrum",
    "c2Name": "loopring",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0.0011,
    "c1GasFee": 0.1,
    "c2GasFee": 0.15,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 10,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 10,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "2-12/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 2,
    "c2ID": 12,
    "c1Name": "arbitrum",
    "c2Name": "zkspace",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0.0009,
    "c1GasFee": 0.1,
    "c2GasFee": 0.2,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "2-13/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 2,
    "c2ID": 13,
    "c1Name": "arbitrum",
    "c2Name": "boba",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.0011,
    "c1GasFee": 0.1,
    "c2GasFee": 1,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "2-14/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 2,
    "c2ID": 14,
    "c1Name": "arbitrum",
    "c2Name": "zksync2",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0016,
    "c2TradingFee": 0.0013,
    "c1GasFee": 0,
    "c2GasFee": 1,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 10,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "2-14/USDC",
    "tName": "USDC",
    "makerAddress": "0x41d3d33156ae7c62c094aae2995003ae63f587b3",
    "c1ID": 2,
    "c2ID": 14,
    "c1Name": "arbitrum",
    "c2Name": "zksync2",
    "t1Address": "0xff970a61a04b1ca14834a43f5de4533ebddb5cc8",
    "t2Address": "0x3355df6d4c9c3035724fd0e3914de96a5a83aaf4",
    "precision": 6,
    "c1TradingFee": 1.6,
    "c2TradingFee": 1.6,
    "c1GasFee": 0,
    "c2GasFee": 1,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 10000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 10000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "2-14/USDT",
    "tName": "USDT",
    "makerAddress": "0xd7aa9ba6caac7b0436c91396f22ca5a7f31664fc",
    "c1ID": 2,
    "c2ID": 14,
    "c1Name": "arbitrum",
    "c2Name": "zksync2",
    "t1Address": "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9",
    "t2Address": "0x493257fd37edb34451f62edf8d2a0c418852ba4c",
    "precision": 6,
    "c1TradingFee": 1.6,
    "c2TradingFee": 1.6,
    "c1GasFee": 0,
    "c2GasFee": 1,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 20000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 20000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "2-15/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 2,
    "c2ID": 15,
    "c1Name": "arbitrum",
    "c2Name": "bnbchain",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0.0008,
    "c1GasFee": 0.1,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 10,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 10,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "2-15/USDC",
    "tName": "USDC",
    "makerAddress": "0x41d3d33156ae7c62c094aae2995003ae63f587b3",
    "c1ID": 2,
    "c2ID": 15,
    "c1Name": "arbitrum",
    "c2Name": "bnbchain",
    "t1Address": "0xff970a61a04b1ca14834a43f5de4533ebddb5cc8",
    "t2Address": "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d",
    "precision": 6,
    "c1TradingFee": 1.4,
    "c2TradingFee": 1.4,
    "c1GasFee": 0.5,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 20000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 20000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "2-15/USDT",
    "tName": "USDT",
    "makerAddress": "0xd7aa9ba6caac7b0436c91396f22ca5a7f31664fc",
    "c1ID": 2,
    "c2ID": 15,
    "c1Name": "arbitrum",
    "c2Name": "bnbchain",
    "t1Address": "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9",
    "t2Address": "0x55d398326f99059ff775485246999027b3197955",
    "precision": 6,
    "c1TradingFee": 1.4,
    "c2TradingFee": 1.4,
    "c1GasFee": 0.5,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 20000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 20000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "2-16/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 2,
    "c2ID": 16,
    "c1Name": "arbitrum",
    "c2Name": "arbitrum_nova",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0006,
    "c1GasFee": 0.1,
    "c2GasFee": 6,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "2-16/USDC",
    "tName": "USDC",
    "makerAddress": "0x41d3d33156ae7c62c094aae2995003ae63f587b3",
    "c1ID": 2,
    "c2ID": 16,
    "c1Name": "arbitrum",
    "c2Name": "arbitrum_nova",
    "t1Address": "0xff970a61a04b1ca14834a43f5de4533ebddb5cc8",
    "t2Address": "0x750ba8b76187092b0d1e87e28daaf484d1b5273b",
    "precision": 6,
    "c1TradingFee": 1,
    "c2TradingFee": 1,
    "c1GasFee": 0,
    "c2GasFee": 2,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 5000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 3000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "2-17/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 2,
    "c2ID": 17,
    "c1Name": "arbitrum",
    "c2Name": "polygon_evm",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.001,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "2-17/USDC",
    "tName": "USDC",
    "makerAddress": "0x41d3d33156ae7c62c094aae2995003ae63f587b3",
    "c1ID": 2,
    "c2ID": 17,
    "c1Name": "arbitrum",
    "c2Name": "polygon_evm",
    "t1Address": "0xff970a61a04b1ca14834a43f5de4533ebddb5cc8",
    "t2Address": "0xa8ce8aee21bc2a48a5ef670afcc9274c7bbbc035",
    "precision": 6,
    "c1TradingFee": 1.8,
    "c2TradingFee": 1.8,
    "c1GasFee": 0.5,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 10000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 10000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "2-17/USDT",
    "tName": "USDT",
    "makerAddress": "0xd7aa9ba6caac7b0436c91396f22ca5a7f31664fc",
    "c1ID": 2,
    "c2ID": 17,
    "c1Name": "arbitrum",
    "c2Name": "polygon_evm",
    "t1Address": "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9",
    "t2Address": "0x1e4a5963abfd975d8c9021ce480b42188849d41d",
    "precision": 6,
    "c1TradingFee": 1.8,
    "c2TradingFee": 1.8,
    "c1GasFee": 0.5,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 5000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 5000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "2-19/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 2,
    "c2ID": 19,
    "c1Name": "arbitrum",
    "c2Name": "scroll",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0012,
    "c2TradingFee": 0.0013,
    "c1GasFee": 0,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "2-19/USDT",
    "tName": "USDT",
    "makerAddress": "0xd7aa9ba6caac7b0436c91396f22ca5a7f31664fc",
    "c1ID": 2,
    "c2ID": 19,
    "c1Name": "arbitrum",
    "c2Name": "scroll",
    "t1Address": "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9",
    "t2Address": "0xf55bec9cafdbe8730f096aa55dad6d22d44099df",
    "precision": 6,
    "c1TradingFee": 1.6,
    "c2TradingFee": 1.6,
    "c1GasFee": 0,
    "c2GasFee": 1,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 20000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 20000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "2-19/USDC",
    "tName": "USDC",
    "makerAddress": "0x41d3d33156ae7c62c094aae2995003ae63f587b3",
    "c1ID": 2,
    "c2ID": 19,
    "c1Name": "arbitrum",
    "c2Name": "scroll",
    "t1Address": "0xff970a61a04b1ca14834a43f5de4533ebddb5cc8",
    "t2Address": "0x06efdbff2a14a7c8e15944d1f4a48f9f95f663a4",
    "precision": 6,
    "c1TradingFee": 1.6,
    "c2TradingFee": 1.6,
    "c1GasFee": 0,
    "c2GasFee": 1,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 20000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 20000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "2-21/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 2,
    "c2ID": 21,
    "c1Name": "arbitrum",
    "c2Name": "base",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.001,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "2-21/USDC",
    "tName": "USDC",
    "makerAddress": "0x41d3d33156ae7c62c094aae2995003ae63f587b3",
    "c1ID": 2,
    "c2ID": 21,
    "c1Name": "arbitrum",
    "c2Name": "base",
    "t1Address": "0xff970a61a04b1ca14834a43f5de4533ebddb5cc8",
    "t2Address": "0xd9aaec86b65d86f6a7b5b1b0c42ffa531710b6ca",
    "precision": 6,
    "c1TradingFee": 1.4,
    "c2TradingFee": 1.4,
    "c1GasFee": 0.5,
    "c2GasFee": 1.5,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 20000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 20000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "2-23/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 2,
    "c2ID": 23,
    "c1Name": "arbitrum",
    "c2Name": "linea",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "2-23/USDC",
    "tName": "USDC",
    "makerAddress": "0x41d3d33156ae7c62c094aae2995003ae63f587b3",
    "c1ID": 2,
    "c2ID": 23,
    "c1Name": "arbitrum",
    "c2Name": "linea",
    "t1Address": "0xff970a61a04b1ca14834a43f5de4533ebddb5cc8",
    "t2Address": "0x176211869ca2b568f2a7d4ee941e073a821ee1ff",
    "precision": 6,
    "c1TradingFee": 2,
    "c2TradingFee": 2,
    "c1GasFee": 0,
    "c2GasFee": 1,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 20000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 20000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "2-23/USDT",
    "tName": "USDT",
    "makerAddress": "0xd7aa9ba6caac7b0436c91396f22ca5a7f31664fc",
    "c1ID": 2,
    "c2ID": 23,
    "c1Name": "arbitrum",
    "c2Name": "linea",
    "t1Address": "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9",
    "t2Address": "0xa219439258ca9da29e9cc4ce5596924745e12b93",
    "precision": 6,
    "c1TradingFee": 2,
    "c2TradingFee": 2,
    "c1GasFee": 0,
    "c2GasFee": 1,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 20000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 20000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "2-24/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 2,
    "c2ID": 24,
    "c1Name": "arbitrum",
    "c2Name": "mantle",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0xdeaddeaddeaddeaddeaddeaddeaddeaddead1111",
    "precision": 18,
    "c1TradingFee": 0.0015,
    "c2TradingFee": 0.0015,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "2-25/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 2,
    "c2ID": 25,
    "c1Name": "arbitrum",
    "c2Name": "opbnb",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0xe7798f023fc62146e8aa1b36da45fb70855a77ea",
    "precision": 18,
    "c1TradingFee": 0.0011,
    "c2TradingFee": 0.0012,
    "c1GasFee": 0,
    "c2GasFee": 2,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "2-30/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 2,
    "c2ID": 30,
    "c1Name": "arbitrum",
    "c2Name": "zora",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.0015,
    "c1GasFee": 0,
    "c2GasFee": 10,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "2-31/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 2,
    "c2ID": 31,
    "c1Name": "arbitrum",
    "c2Name": "manta",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.001,
    "c1GasFee": 0,
    "c2GasFee": 1.5,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "2-36/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 2,
    "c2ID": 36,
    "c1Name": "arbitrum",
    "c2Name": "kroma",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 3,
    "c2MinPrice": 0,
    "c2MaxPrice": 0,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "2-38/USDC",
    "tName": "USDC",
    "makerAddress": "0x41d3d33156ae7c62c094aae2995003ae63f587b3",
    "c1ID": 2,
    "c2ID": 38,
    "c1Name": "arbitrum",
    "c2Name": "zkfair",
    "t1Address": "0xff970a61a04b1ca14834a43f5de4533ebddb5cc8",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 6,
    "c1TradingFee": 1.2,
    "c2TradingFee": 1.4,
    "c1GasFee": 1.5,
    "c2GasFee": 1.5,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 10000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 10000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "2-38/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 2,
    "c2ID": 38,
    "c1Name": "arbitrum",
    "c2Name": "zkfair",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x4b21b980d0dc7d3c0c6175b0a412694f3a1c7c6b",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0.5,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "3-4/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 3,
    "c2ID": 4,
    "c1Name": "zksync",
    "c2Name": "starknet",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
    "precision": 18,
    "c1TradingFee": 0,
    "c2TradingFee": 0.0015,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0,
    "c1MaxPrice": 0,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "3-4/USDC",
    "tName": "USDC",
    "makerAddress": "0x41d3d33156ae7c62c094aae2995003ae63f587b3",
    "c1ID": 3,
    "c2ID": 4,
    "c1Name": "zksync",
    "c2Name": "starknet",
    "t1Address": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    "t2Address": "0x053c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8",
    "precision": 6,
    "c1TradingFee": 0,
    "c2TradingFee": 1.6,
    "c1GasFee": 0,
    "c2GasFee": 1,
    "c1MinPrice": 0,
    "c1MaxPrice": 0,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 10000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "3-4/USDT",
    "tName": "USDT",
    "makerAddress": "0xd7aa9ba6caac7b0436c91396f22ca5a7f31664fc",
    "c1ID": 3,
    "c2ID": 4,
    "c1Name": "zksync",
    "c2Name": "starknet",
    "t1Address": "0xdac17f958d2ee523a2206206994597c13d831ec7",
    "t2Address": "0x068f5c6a61780768455de69077e07e89787839bf8166decfbf92b645209c0fb8",
    "precision": 6,
    "c1TradingFee": 0,
    "c2TradingFee": 1.6,
    "c1GasFee": 0,
    "c2GasFee": 1,
    "c1MinPrice": 0,
    "c1MaxPrice": 0,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 5000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "3-6/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 3,
    "c2ID": 6,
    "c1Name": "zksync",
    "c2Name": "polygon",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0.0013,
    "c1GasFee": 0.15,
    "c2GasFee": 0.15,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 10,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 10,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "3-6/USDC",
    "tName": "USDC",
    "makerAddress": "0x41d3d33156ae7c62c094aae2995003ae63f587b3",
    "c1ID": 3,
    "c2ID": 6,
    "c1Name": "zksync",
    "c2Name": "polygon",
    "t1Address": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    "t2Address": "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
    "precision": 6,
    "c1TradingFee": 1.5,
    "c2TradingFee": 1.6,
    "c1GasFee": 0.5,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 10000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 10000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "3-6/USDT",
    "tName": "USDT",
    "makerAddress": "0xd7aa9ba6caac7b0436c91396f22ca5a7f31664fc",
    "c1ID": 3,
    "c2ID": 6,
    "c1Name": "zksync",
    "c2Name": "polygon",
    "t1Address": "0xdac17f958d2ee523a2206206994597c13d831ec7",
    "t2Address": "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
    "precision": 6,
    "c1TradingFee": 1.5,
    "c2TradingFee": 1.8,
    "c1GasFee": 0.2,
    "c2GasFee": 0.2,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 10000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 10000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "3-7/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 3,
    "c2ID": 7,
    "c1Name": "zksync",
    "c2Name": "optimism",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0013,
    "c2TradingFee": 0.0013,
    "c1GasFee": 0.15,
    "c2GasFee": 0.1,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 10,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 10,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "3-7/USDC",
    "tName": "USDC",
    "makerAddress": "0x41d3d33156ae7c62c094aae2995003ae63f587b3",
    "c1ID": 3,
    "c2ID": 7,
    "c1Name": "zksync",
    "c2Name": "optimism",
    "t1Address": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    "t2Address": "0x7f5c764cbc14f9669b88837ca1490cca17c31607",
    "precision": 6,
    "c1TradingFee": 1.8,
    "c2TradingFee": 1.6,
    "c1GasFee": 0.5,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 10000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 10000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "3-7/USDT",
    "tName": "USDT",
    "makerAddress": "0xd7aa9ba6caac7b0436c91396f22ca5a7f31664fc",
    "c1ID": 3,
    "c2ID": 7,
    "c1Name": "zksync",
    "c2Name": "optimism",
    "t1Address": "0xdac17f958d2ee523a2206206994597c13d831ec7",
    "t2Address": "0x94b008aa00579c1307b0ef2c499ad98a8ce58e58",
    "precision": 6,
    "c1TradingFee": 1.8,
    "c2TradingFee": 1.8,
    "c1GasFee": 0.2,
    "c2GasFee": 0.2,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 10000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 10000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "3-8/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 3,
    "c2ID": 8,
    "c1Name": "zksync",
    "c2Name": "immutableX",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0.2,
    "c2GasFee": 0.2,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "3-9/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 3,
    "c2ID": 9,
    "c1Name": "zksync",
    "c2Name": "loopring",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0.0013,
    "c1GasFee": 0.15,
    "c2GasFee": 0.15,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 10,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 10,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "3-12/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 3,
    "c2ID": 12,
    "c1Name": "zksync",
    "c2Name": "zkspace",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0.2,
    "c2GasFee": 0.2,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "3-13/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 3,
    "c2ID": 13,
    "c1Name": "zksync",
    "c2Name": "boba",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0.2,
    "c2GasFee": 1,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "3-14/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 3,
    "c2ID": 14,
    "c1Name": "zksync",
    "c2Name": "zksync2",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0018,
    "c2TradingFee": 0.0012,
    "c1GasFee": 0,
    "c2GasFee": 1,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 10,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "3-14/USDC",
    "tName": "USDC",
    "makerAddress": "0x41d3d33156ae7c62c094aae2995003ae63f587b3",
    "c1ID": 3,
    "c2ID": 14,
    "c1Name": "zksync",
    "c2Name": "zksync2",
    "t1Address": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    "t2Address": "0x3355df6d4c9c3035724fd0e3914de96a5a83aaf4",
    "precision": 6,
    "c1TradingFee": 2,
    "c2TradingFee": 2,
    "c1GasFee": 1,
    "c2GasFee": 1,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 10000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 10000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "3-14/USDT",
    "tName": "USDT",
    "makerAddress": "0xd7aa9ba6caac7b0436c91396f22ca5a7f31664fc",
    "c1ID": 3,
    "c2ID": 14,
    "c1Name": "zksync",
    "c2Name": "zksync2",
    "t1Address": "0xdac17f958d2ee523a2206206994597c13d831ec7",
    "t2Address": "0x493257fd37edb34451f62edf8d2a0c418852ba4c",
    "precision": 6,
    "c1TradingFee": 2,
    "c2TradingFee": 2,
    "c1GasFee": 1,
    "c2GasFee": 1,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 20000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 20000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "3-15/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 3,
    "c2ID": 15,
    "c1Name": "zksync",
    "c2Name": "bnbchain",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0.0005,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 10,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 10,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "3-15/USDC",
    "tName": "USDC",
    "makerAddress": "0x41d3d33156ae7c62c094aae2995003ae63f587b3",
    "c1ID": 3,
    "c2ID": 15,
    "c1Name": "zksync",
    "c2Name": "bnbchain",
    "t1Address": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    "t2Address": "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d",
    "precision": 6,
    "c1TradingFee": 2,
    "c2TradingFee": 2,
    "c1GasFee": 1,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 20000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 20000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "3-15/USDT",
    "tName": "USDT",
    "makerAddress": "0xd7aa9ba6caac7b0436c91396f22ca5a7f31664fc",
    "c1ID": 3,
    "c2ID": 15,
    "c1Name": "zksync",
    "c2Name": "bnbchain",
    "t1Address": "0xdac17f958d2ee523a2206206994597c13d831ec7",
    "t2Address": "0x55d398326f99059ff775485246999027b3197955",
    "precision": 6,
    "c1TradingFee": 2,
    "c2TradingFee": 2,
    "c1GasFee": 1,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 20000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 20000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "3-16/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 3,
    "c2ID": 16,
    "c1Name": "zksync",
    "c2Name": "arbitrum_nova",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0005,
    "c1GasFee": 0,
    "c2GasFee": 6,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "3-16/USDC",
    "tName": "USDC",
    "makerAddress": "0x41d3d33156ae7c62c094aae2995003ae63f587b3",
    "c1ID": 3,
    "c2ID": 16,
    "c1Name": "zksync",
    "c2Name": "arbitrum_nova",
    "t1Address": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    "t2Address": "0x750ba8b76187092b0d1e87e28daaf484d1b5273b",
    "precision": 6,
    "c1TradingFee": 1,
    "c2TradingFee": 1,
    "c1GasFee": 0,
    "c2GasFee": 2,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 10000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 3000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "3-17/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 3,
    "c2ID": 17,
    "c1Name": "zksync",
    "c2Name": "polygon_evm",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.001,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "3-17/USDC",
    "tName": "USDC",
    "makerAddress": "0x41d3d33156ae7c62c094aae2995003ae63f587b3",
    "c1ID": 3,
    "c2ID": 17,
    "c1Name": "zksync",
    "c2Name": "polygon_evm",
    "t1Address": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    "t2Address": "0xa8ce8aee21bc2a48a5ef670afcc9274c7bbbc035",
    "precision": 6,
    "c1TradingFee": 1.8,
    "c2TradingFee": 1.8,
    "c1GasFee": 0.5,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 10000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 10000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "3-17/USDT",
    "tName": "USDT",
    "makerAddress": "0xd7aa9ba6caac7b0436c91396f22ca5a7f31664fc",
    "c1ID": 3,
    "c2ID": 17,
    "c1Name": "zksync",
    "c2Name": "polygon_evm",
    "t1Address": "0xdac17f958d2ee523a2206206994597c13d831ec7",
    "t2Address": "0x1e4a5963abfd975d8c9021ce480b42188849d41d",
    "precision": 6,
    "c1TradingFee": 1.8,
    "c2TradingFee": 1.8,
    "c1GasFee": 0.5,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 5000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 5000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "3-19/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 3,
    "c2ID": 19,
    "c1Name": "zksync",
    "c2Name": "scroll",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0015,
    "c2TradingFee": 0.0015,
    "c1GasFee": 0,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "3-19/USDT",
    "tName": "USDT",
    "makerAddress": "0xd7aa9ba6caac7b0436c91396f22ca5a7f31664fc",
    "c1ID": 3,
    "c2ID": 19,
    "c1Name": "zksync",
    "c2Name": "scroll",
    "t1Address": "0xdac17f958d2ee523a2206206994597c13d831ec7",
    "t2Address": "0xf55bec9cafdbe8730f096aa55dad6d22d44099df",
    "precision": 6,
    "c1TradingFee": 2,
    "c2TradingFee": 2,
    "c1GasFee": 1,
    "c2GasFee": 1,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 20000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 20000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "3-19/USDC",
    "tName": "USDC",
    "makerAddress": "0x41d3d33156ae7c62c094aae2995003ae63f587b3",
    "c1ID": 3,
    "c2ID": 19,
    "c1Name": "zksync",
    "c2Name": "scroll",
    "t1Address": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    "t2Address": "0x06efdbff2a14a7c8e15944d1f4a48f9f95f663a4",
    "precision": 6,
    "c1TradingFee": 2,
    "c2TradingFee": 2,
    "c1GasFee": 1,
    "c2GasFee": 1,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 20000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 20000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "3-21/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 3,
    "c2ID": 21,
    "c1Name": "zksync",
    "c2Name": "base",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.001,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "3-21/USDC",
    "tName": "USDC",
    "makerAddress": "0x41d3d33156ae7c62c094aae2995003ae63f587b3",
    "c1ID": 3,
    "c2ID": 21,
    "c1Name": "zksync",
    "c2Name": "base",
    "t1Address": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    "t2Address": "0xd9aaec86b65d86f6a7b5b1b0c42ffa531710b6ca",
    "precision": 6,
    "c1TradingFee": 2,
    "c2TradingFee": 2,
    "c1GasFee": 1,
    "c2GasFee": 1.5,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 20000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 20000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "3-23/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 3,
    "c2ID": 23,
    "c1Name": "zksync",
    "c2Name": "linea",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "3-23/USDC",
    "tName": "USDC",
    "makerAddress": "0x41d3d33156ae7c62c094aae2995003ae63f587b3",
    "c1ID": 3,
    "c2ID": 23,
    "c1Name": "zksync",
    "c2Name": "linea",
    "t1Address": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    "t2Address": "0x176211869ca2b568f2a7d4ee941e073a821ee1ff",
    "precision": 6,
    "c1TradingFee": 2,
    "c2TradingFee": 2,
    "c1GasFee": 0,
    "c2GasFee": 1,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 20000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 20000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "3-23/USDT",
    "tName": "USDT",
    "makerAddress": "0xd7aa9ba6caac7b0436c91396f22ca5a7f31664fc",
    "c1ID": 3,
    "c2ID": 23,
    "c1Name": "zksync",
    "c2Name": "linea",
    "t1Address": "0xdac17f958d2ee523a2206206994597c13d831ec7",
    "t2Address": "0xa219439258ca9da29e9cc4ce5596924745e12b93",
    "precision": 6,
    "c1TradingFee": 2,
    "c2TradingFee": 2,
    "c1GasFee": 0,
    "c2GasFee": 1,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 20000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 20000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "3-24/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 3,
    "c2ID": 24,
    "c1Name": "zksync",
    "c2Name": "mantle",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0xdeaddeaddeaddeaddeaddeaddeaddeaddead1111",
    "precision": 18,
    "c1TradingFee": 0.0015,
    "c2TradingFee": 0.0015,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "3-25/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 3,
    "c2ID": 25,
    "c1Name": "zksync",
    "c2Name": "opbnb",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0xe7798f023fc62146e8aa1b36da45fb70855a77ea",
    "precision": 18,
    "c1TradingFee": 0.0011,
    "c2TradingFee": 0.0012,
    "c1GasFee": 0,
    "c2GasFee": 2,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "3-30/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 3,
    "c2ID": 30,
    "c1Name": "zksync",
    "c2Name": "zora",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.0015,
    "c1GasFee": 0,
    "c2GasFee": 10,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "3-31/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 3,
    "c2ID": 31,
    "c1Name": "zksync",
    "c2Name": "manta",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.001,
    "c1GasFee": 0,
    "c2GasFee": 1.5,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "3-36/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 3,
    "c2ID": 36,
    "c1Name": "zksync",
    "c2Name": "kroma",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 3,
    "c2MinPrice": 0,
    "c2MaxPrice": 0,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "3-38/USDC",
    "tName": "USDC",
    "makerAddress": "0x41d3d33156ae7c62c094aae2995003ae63f587b3",
    "c1ID": 3,
    "c2ID": 38,
    "c1Name": "zksync",
    "c2Name": "zkfair",
    "t1Address": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 6,
    "c1TradingFee": 1.2,
    "c2TradingFee": 1.4,
    "c1GasFee": 1.5,
    "c2GasFee": 1.5,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 10000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 10000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "3-38/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 3,
    "c2ID": 38,
    "c1Name": "zksync",
    "c2Name": "zkfair",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x4b21b980d0dc7d3c0c6175b0a412694f3a1c7c6b",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0.5,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "4-6/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 4,
    "c2ID": 6,
    "c1Name": "starknet",
    "c2Name": "polygon",
    "t1Address": "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
    "t2Address": "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
    "precision": 18,
    "c1TradingFee": 0.0013,
    "c2TradingFee": 0.0013,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "4-6/USDC",
    "tName": "USDC",
    "makerAddress": "0x41d3d33156ae7c62c094aae2995003ae63f587b3",
    "c1ID": 4,
    "c2ID": 6,
    "c1Name": "starknet",
    "c2Name": "polygon",
    "t1Address": "0x053c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8",
    "t2Address": "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
    "precision": 6,
    "c1TradingFee": 1.6,
    "c2TradingFee": 1.5,
    "c1GasFee": 1,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 10000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 10000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "4-6/USDT",
    "tName": "USDT",
    "makerAddress": "0xd7aa9ba6caac7b0436c91396f22ca5a7f31664fc",
    "c1ID": 4,
    "c2ID": 6,
    "c1Name": "starknet",
    "c2Name": "polygon",
    "t1Address": "0x068f5c6a61780768455de69077e07e89787839bf8166decfbf92b645209c0fb8",
    "t2Address": "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
    "precision": 6,
    "c1TradingFee": 1.6,
    "c2TradingFee": 1.5,
    "c1GasFee": 1,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 5000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 5000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "4-7/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 4,
    "c2ID": 7,
    "c1Name": "starknet",
    "c2Name": "optimism",
    "t1Address": "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0013,
    "c2TradingFee": 0.0013,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "4-7/USDC",
    "tName": "USDC",
    "makerAddress": "0x41d3d33156ae7c62c094aae2995003ae63f587b3",
    "c1ID": 4,
    "c2ID": 7,
    "c1Name": "starknet",
    "c2Name": "optimism",
    "t1Address": "0x053c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8",
    "t2Address": "0x7f5c764cbc14f9669b88837ca1490cca17c31607",
    "precision": 6,
    "c1TradingFee": 1.8,
    "c2TradingFee": 1.5,
    "c1GasFee": 1,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 10000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 10000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "4-7/USDT",
    "tName": "USDT",
    "makerAddress": "0xd7aa9ba6caac7b0436c91396f22ca5a7f31664fc",
    "c1ID": 4,
    "c2ID": 7,
    "c1Name": "starknet",
    "c2Name": "optimism",
    "t1Address": "0x068f5c6a61780768455de69077e07e89787839bf8166decfbf92b645209c0fb8",
    "t2Address": "0x94b008aa00579c1307b0ef2c499ad98a8ce58e58",
    "precision": 6,
    "c1TradingFee": 1.8,
    "c2TradingFee": 1.5,
    "c1GasFee": 1,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 5000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 5000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "4-8/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 4,
    "c2ID": 8,
    "c1Name": "starknet",
    "c2Name": "immutableX",
    "t1Address": "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0,
    "c1GasFee": 3.5,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 3,
    "c2MinPrice": 0,
    "c2MaxPrice": 0,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "4-9/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 4,
    "c2ID": 9,
    "c1Name": "starknet",
    "c2Name": "loopring",
    "t1Address": "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0,
    "c1GasFee": 3.5,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 3,
    "c2MinPrice": 0,
    "c2MaxPrice": 0,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "4-12/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 4,
    "c2ID": 12,
    "c1Name": "starknet",
    "c2Name": "zkspace",
    "t1Address": "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0,
    "c1GasFee": 3.5,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 0.1,
    "c2MinPrice": 0,
    "c2MaxPrice": 0,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "4-13/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 4,
    "c2ID": 13,
    "c1Name": "starknet",
    "c2Name": "boba",
    "t1Address": "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0,
    "c1GasFee": 3.5,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 0.1,
    "c2MinPrice": 0,
    "c2MaxPrice": 0,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "4-14/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 4,
    "c2ID": 14,
    "c1Name": "starknet",
    "c2Name": "zksync2",
    "t1Address": "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0014,
    "c2TradingFee": 0.0015,
    "c1GasFee": 0,
    "c2GasFee": 0.3,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 10,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "4-14/USDC",
    "tName": "USDC",
    "makerAddress": "0x41d3d33156ae7c62c094aae2995003ae63f587b3",
    "c1ID": 4,
    "c2ID": 14,
    "c1Name": "starknet",
    "c2Name": "zksync2",
    "t1Address": "0x053c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8",
    "t2Address": "0x3355df6d4c9c3035724fd0e3914de96a5a83aaf4",
    "precision": 6,
    "c1TradingFee": 2,
    "c2TradingFee": 2,
    "c1GasFee": 2,
    "c2GasFee": 1,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 10000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 10000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "4-14/USDT",
    "tName": "USDT",
    "makerAddress": "0xd7aa9ba6caac7b0436c91396f22ca5a7f31664fc",
    "c1ID": 4,
    "c2ID": 14,
    "c1Name": "starknet",
    "c2Name": "zksync2",
    "t1Address": "0x068f5c6a61780768455de69077e07e89787839bf8166decfbf92b645209c0fb8",
    "t2Address": "0x493257fd37edb34451f62edf8d2a0c418852ba4c",
    "precision": 6,
    "c1TradingFee": 2,
    "c2TradingFee": 2,
    "c1GasFee": 2,
    "c2GasFee": 1,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 20000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 20000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "4-15/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 4,
    "c2ID": 15,
    "c1Name": "starknet",
    "c2Name": "bnbchain",
    "t1Address": "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
    "t2Address": "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
    "precision": 18,
    "c1TradingFee": 0.0013,
    "c2TradingFee": 0.0013,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 10,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "4-15/USDC",
    "tName": "USDC",
    "makerAddress": "0x41d3d33156ae7c62c094aae2995003ae63f587b3",
    "c1ID": 4,
    "c2ID": 15,
    "c1Name": "starknet",
    "c2Name": "bnbchain",
    "t1Address": "0x053c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8",
    "t2Address": "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d",
    "precision": 18,
    "c1TradingFee": 2,
    "c2TradingFee": 2,
    "c1GasFee": 2,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 20000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 20000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "4-15/USDT",
    "tName": "USDT",
    "makerAddress": "0xd7aa9ba6caac7b0436c91396f22ca5a7f31664fc",
    "c1ID": 4,
    "c2ID": 15,
    "c1Name": "starknet",
    "c2Name": "bnbchain",
    "t1Address": "0x068f5c6a61780768455de69077e07e89787839bf8166decfbf92b645209c0fb8",
    "t2Address": "0x55d398326f99059ff775485246999027b3197955",
    "precision": 18,
    "c1TradingFee": 2,
    "c2TradingFee": 2,
    "c1GasFee": 2,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 20000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 20000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "4-16/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 4,
    "c2ID": 16,
    "c1Name": "starknet",
    "c2Name": "arbitrum_nova",
    "t1Address": "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0013,
    "c2TradingFee": 0.0013,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "4-17/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 4,
    "c2ID": 17,
    "c1Name": "starknet",
    "c2Name": "polygon_evm",
    "t1Address": "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0013,
    "c2TradingFee": 0.0013,
    "c1GasFee": 0,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "4-17/USDC",
    "tName": "USDC",
    "makerAddress": "0x41d3d33156ae7c62c094aae2995003ae63f587b3",
    "c1ID": 4,
    "c2ID": 17,
    "c1Name": "starknet",
    "c2Name": "polygon_evm",
    "t1Address": "0x053c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8",
    "t2Address": "0xa8ce8aee21bc2a48a5ef670afcc9274c7bbbc035",
    "precision": 6,
    "c1TradingFee": 1.8,
    "c2TradingFee": 1.8,
    "c1GasFee": 0.5,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 10000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 10000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "4-17/USDT",
    "tName": "USDT",
    "makerAddress": "0xd7aa9ba6caac7b0436c91396f22ca5a7f31664fc",
    "c1ID": 4,
    "c2ID": 17,
    "c1Name": "starknet",
    "c2Name": "polygon_evm",
    "t1Address": "0x068f5c6a61780768455de69077e07e89787839bf8166decfbf92b645209c0fb8",
    "t2Address": "0x1e4a5963abfd975d8c9021ce480b42188849d41d",
    "precision": 6,
    "c1TradingFee": 1.8,
    "c2TradingFee": 1.8,
    "c1GasFee": 0.5,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 5000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 5000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "4-19/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 4,
    "c2ID": 19,
    "c1Name": "starknet",
    "c2Name": "scroll",
    "t1Address": "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0014,
    "c2TradingFee": 0.0015,
    "c1GasFee": 0,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "4-19/USDT",
    "tName": "USDT",
    "makerAddress": "0xd7aa9ba6caac7b0436c91396f22ca5a7f31664fc",
    "c1ID": 4,
    "c2ID": 19,
    "c1Name": "starknet",
    "c2Name": "scroll",
    "t1Address": "0x068f5c6a61780768455de69077e07e89787839bf8166decfbf92b645209c0fb8",
    "t2Address": "0xf55bec9cafdbe8730f096aa55dad6d22d44099df",
    "precision": 6,
    "c1TradingFee": 2,
    "c2TradingFee": 2,
    "c1GasFee": 2,
    "c2GasFee": 1,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 20000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 20000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "4-19/USDC",
    "tName": "USDC",
    "makerAddress": "0x41d3d33156ae7c62c094aae2995003ae63f587b3",
    "c1ID": 4,
    "c2ID": 19,
    "c1Name": "starknet",
    "c2Name": "scroll",
    "t1Address": "0x053c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8",
    "t2Address": "0x06efdbff2a14a7c8e15944d1f4a48f9f95f663a4",
    "precision": 6,
    "c1TradingFee": 2,
    "c2TradingFee": 2,
    "c1GasFee": 2,
    "c2GasFee": 1,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 20000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 20000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "4-21/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 4,
    "c2ID": 21,
    "c1Name": "starknet",
    "c2Name": "base",
    "t1Address": "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0013,
    "c2TradingFee": 0.0013,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "4-21/USDC",
    "tName": "USDC",
    "makerAddress": "0x41d3d33156ae7c62c094aae2995003ae63f587b3",
    "c1ID": 4,
    "c2ID": 21,
    "c1Name": "starknet",
    "c2Name": "base",
    "t1Address": "0x053c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8",
    "t2Address": "0xd9aaec86b65d86f6a7b5b1b0c42ffa531710b6ca",
    "precision": 6,
    "c1TradingFee": 2,
    "c2TradingFee": 2,
    "c1GasFee": 2,
    "c2GasFee": 1.5,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 20000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 20000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "4-23/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 4,
    "c2ID": 23,
    "c1Name": "starknet",
    "c2Name": "linea",
    "t1Address": "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "4-23/USDC",
    "tName": "USDC",
    "makerAddress": "0x41d3d33156ae7c62c094aae2995003ae63f587b3",
    "c1ID": 4,
    "c2ID": 23,
    "c1Name": "starknet",
    "c2Name": "linea",
    "t1Address": "0x053c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8",
    "t2Address": "0x176211869ca2b568f2a7d4ee941e073a821ee1ff",
    "precision": 6,
    "c1TradingFee": 2,
    "c2TradingFee": 2,
    "c1GasFee": 1,
    "c2GasFee": 1,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 20000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 20000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "4-23/USDT",
    "tName": "USDT",
    "makerAddress": "0xd7aa9ba6caac7b0436c91396f22ca5a7f31664fc",
    "c1ID": 4,
    "c2ID": 23,
    "c1Name": "starknet",
    "c2Name": "linea",
    "t1Address": "0x068f5c6a61780768455de69077e07e89787839bf8166decfbf92b645209c0fb8",
    "t2Address": "0xa219439258ca9da29e9cc4ce5596924745e12b93",
    "precision": 6,
    "c1TradingFee": 2,
    "c2TradingFee": 2,
    "c1GasFee": 1,
    "c2GasFee": 1,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 20000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 20000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "4-24/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 4,
    "c2ID": 24,
    "c1Name": "starknet",
    "c2Name": "mantle",
    "t1Address": "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
    "t2Address": "0xdeaddeaddeaddeaddeaddeaddeaddeaddead1111",
    "precision": 18,
    "c1TradingFee": 0.0013,
    "c2TradingFee": 0.0013,
    "c1GasFee": 0,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "4-25/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 4,
    "c2ID": 25,
    "c1Name": "starknet",
    "c2Name": "opbnb",
    "t1Address": "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
    "t2Address": "0xe7798f023fc62146e8aa1b36da45fb70855a77ea",
    "precision": 18,
    "c1TradingFee": 0.0012,
    "c2TradingFee": 0.0014,
    "c1GasFee": 0.5,
    "c2GasFee": 2,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "4-30/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 4,
    "c2ID": 30,
    "c1Name": "starknet",
    "c2Name": "zora",
    "t1Address": "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0013,
    "c2TradingFee": 0.0013,
    "c1GasFee": 0,
    "c2GasFee": 1,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "4-31/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 4,
    "c2ID": 31,
    "c1Name": "starknet",
    "c2Name": "manta",
    "t1Address": "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0013,
    "c2TradingFee": 0.001,
    "c1GasFee": 0,
    "c2GasFee": 1.5,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "4-36/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 4,
    "c2ID": 36,
    "c1Name": "starknet",
    "c2Name": "kroma",
    "t1Address": "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 3,
    "c2MinPrice": 0,
    "c2MaxPrice": 0,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "4-38/USDC",
    "tName": "USDC",
    "makerAddress": "0x41d3d33156ae7c62c094aae2995003ae63f587b3",
    "c1ID": 4,
    "c2ID": 38,
    "c1Name": "starknet",
    "c2Name": "zkfair",
    "t1Address": "0x053c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 6,
    "c1TradingFee": 1.2,
    "c2TradingFee": 1.4,
    "c1GasFee": 1.5,
    "c2GasFee": 1.5,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 10000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 10000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "4-38/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 4,
    "c2ID": 38,
    "c1Name": "starknet",
    "c2Name": "zkfair",
    "t1Address": "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
    "t2Address": "0x4b21b980d0dc7d3c0c6175b0a412694f3a1c7c6b",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0.5,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "6-7/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 6,
    "c2ID": 7,
    "c1Name": "polygon",
    "c2Name": "optimism",
    "t1Address": "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0013,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0.15,
    "c2GasFee": 0.1,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 10,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 10,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "6-7/USDC",
    "tName": "USDC",
    "makerAddress": "0x41d3d33156ae7c62c094aae2995003ae63f587b3",
    "c1ID": 6,
    "c2ID": 7,
    "c1Name": "polygon",
    "c2Name": "optimism",
    "t1Address": "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
    "t2Address": "0x7f5c764cbc14f9669b88837ca1490cca17c31607",
    "precision": 6,
    "c1TradingFee": 1.8,
    "c2TradingFee": 1.3,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 10000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 10000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "6-7/USDT",
    "tName": "USDT",
    "makerAddress": "0xd7aa9ba6caac7b0436c91396f22ca5a7f31664fc",
    "c1ID": 6,
    "c2ID": 7,
    "c1Name": "polygon",
    "c2Name": "optimism",
    "t1Address": "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
    "t2Address": "0x94b008aa00579c1307b0ef2c499ad98a8ce58e58",
    "precision": 6,
    "c1TradingFee": 1.8,
    "c2TradingFee": 1.5,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 10000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 10000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "6-8/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 6,
    "c2ID": 8,
    "c1Name": "polygon",
    "c2Name": "immutableX",
    "t1Address": "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0.2,
    "c2GasFee": 0.2,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "6-9/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 6,
    "c2ID": 9,
    "c1Name": "polygon",
    "c2Name": "loopring",
    "t1Address": "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0.15,
    "c2GasFee": 0.15,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 10,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 10,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "6-12/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 6,
    "c2ID": 12,
    "c1Name": "polygon",
    "c2Name": "zkspace",
    "t1Address": "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0.2,
    "c2GasFee": 0.2,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "6-13/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 6,
    "c2ID": 13,
    "c1Name": "polygon",
    "c2Name": "boba",
    "t1Address": "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0.2,
    "c2GasFee": 1,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "6-14/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 6,
    "c2ID": 14,
    "c1Name": "polygon",
    "c2Name": "zksync2",
    "t1Address": "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0016,
    "c2TradingFee": 0.0009,
    "c1GasFee": 0,
    "c2GasFee": 1,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 10,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "6-14/USDC",
    "tName": "USDC",
    "makerAddress": "0x41d3d33156ae7c62c094aae2995003ae63f587b3",
    "c1ID": 6,
    "c2ID": 14,
    "c1Name": "polygon",
    "c2Name": "zksync2",
    "t1Address": "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
    "t2Address": "0x3355df6d4c9c3035724fd0e3914de96a5a83aaf4",
    "precision": 6,
    "c1TradingFee": 1.6,
    "c2TradingFee": 1.6,
    "c1GasFee": 0,
    "c2GasFee": 1,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 10000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 10000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "6-14/USDT",
    "tName": "USDT",
    "makerAddress": "0xd7aa9ba6caac7b0436c91396f22ca5a7f31664fc",
    "c1ID": 6,
    "c2ID": 14,
    "c1Name": "polygon",
    "c2Name": "zksync2",
    "t1Address": "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
    "t2Address": "0x493257fd37edb34451f62edf8d2a0c418852ba4c",
    "precision": 6,
    "c1TradingFee": 1.6,
    "c2TradingFee": 1.6,
    "c1GasFee": 0,
    "c2GasFee": 1,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 20000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 20000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "6-15/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 6,
    "c2ID": 15,
    "c1Name": "polygon",
    "c2Name": "bnbchain",
    "t1Address": "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
    "t2Address": "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 10,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 10,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "6-15/USDC",
    "tName": "USDC",
    "makerAddress": "0x41d3d33156ae7c62c094aae2995003ae63f587b3",
    "c1ID": 6,
    "c2ID": 15,
    "c1Name": "polygon",
    "c2Name": "bnbchain",
    "t1Address": "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
    "t2Address": "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d",
    "precision": 6,
    "c1TradingFee": 1.4,
    "c2TradingFee": 1.4,
    "c1GasFee": 0.5,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 20000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 20000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "6-15/USDT",
    "tName": "USDT",
    "makerAddress": "0xd7aa9ba6caac7b0436c91396f22ca5a7f31664fc",
    "c1ID": 6,
    "c2ID": 15,
    "c1Name": "polygon",
    "c2Name": "bnbchain",
    "t1Address": "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
    "t2Address": "0x55d398326f99059ff775485246999027b3197955",
    "precision": 6,
    "c1TradingFee": 1.4,
    "c2TradingFee": 1.4,
    "c1GasFee": 0.5,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 20000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 20000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "6-16/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 6,
    "c2ID": 16,
    "c1Name": "polygon",
    "c2Name": "arbitrum_nova",
    "t1Address": "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0,
    "c2GasFee": 6,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "6-16/USDC",
    "tName": "USDC",
    "makerAddress": "0x41d3d33156ae7c62c094aae2995003ae63f587b3",
    "c1ID": 6,
    "c2ID": 16,
    "c1Name": "polygon",
    "c2Name": "arbitrum_nova",
    "t1Address": "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
    "t2Address": "0x750ba8b76187092b0d1e87e28daaf484d1b5273b",
    "precision": 6,
    "c1TradingFee": 1,
    "c2TradingFee": 1,
    "c1GasFee": 0,
    "c2GasFee": 2,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 10000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 3000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "6-17/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 6,
    "c2ID": 17,
    "c1Name": "polygon",
    "c2Name": "polygon_evm",
    "t1Address": "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "6-17/USDC",
    "tName": "USDC",
    "makerAddress": "0x41d3d33156ae7c62c094aae2995003ae63f587b3",
    "c1ID": 6,
    "c2ID": 17,
    "c1Name": "polygon",
    "c2Name": "polygon_evm",
    "t1Address": "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
    "t2Address": "0xa8ce8aee21bc2a48a5ef670afcc9274c7bbbc035",
    "precision": 6,
    "c1TradingFee": 1.8,
    "c2TradingFee": 1.8,
    "c1GasFee": 0.5,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 10000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 10000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "6-17/USDT",
    "tName": "USDT",
    "makerAddress": "0xd7aa9ba6caac7b0436c91396f22ca5a7f31664fc",
    "c1ID": 6,
    "c2ID": 17,
    "c1Name": "polygon",
    "c2Name": "polygon_evm",
    "t1Address": "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
    "t2Address": "0x1e4a5963abfd975d8c9021ce480b42188849d41d",
    "precision": 6,
    "c1TradingFee": 1.8,
    "c2TradingFee": 1.8,
    "c1GasFee": 0.5,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 5000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 5000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "6-19/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 6,
    "c2ID": 19,
    "c1Name": "polygon",
    "c2Name": "scroll",
    "t1Address": "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0012,
    "c2TradingFee": 0.0013,
    "c1GasFee": 0,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "6-19/USDT",
    "tName": "USDT",
    "makerAddress": "0xd7aa9ba6caac7b0436c91396f22ca5a7f31664fc",
    "c1ID": 6,
    "c2ID": 19,
    "c1Name": "polygon",
    "c2Name": "scroll",
    "t1Address": "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
    "t2Address": "0xf55bec9cafdbe8730f096aa55dad6d22d44099df",
    "precision": 6,
    "c1TradingFee": 1.6,
    "c2TradingFee": 1.6,
    "c1GasFee": 0,
    "c2GasFee": 1,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 20000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 20000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "6-19/USDC",
    "tName": "USDC",
    "makerAddress": "0x41d3d33156ae7c62c094aae2995003ae63f587b3",
    "c1ID": 6,
    "c2ID": 19,
    "c1Name": "polygon",
    "c2Name": "scroll",
    "t1Address": "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
    "t2Address": "0x06efdbff2a14a7c8e15944d1f4a48f9f95f663a4",
    "precision": 6,
    "c1TradingFee": 1.6,
    "c2TradingFee": 1.6,
    "c1GasFee": 0,
    "c2GasFee": 1,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 20000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 20000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "6-21/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 6,
    "c2ID": 21,
    "c1Name": "polygon",
    "c2Name": "base",
    "t1Address": "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.001,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "6-21/USDC",
    "tName": "USDC",
    "makerAddress": "0x41d3d33156ae7c62c094aae2995003ae63f587b3",
    "c1ID": 6,
    "c2ID": 21,
    "c1Name": "polygon",
    "c2Name": "base",
    "t1Address": "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
    "t2Address": "0xd9aaec86b65d86f6a7b5b1b0c42ffa531710b6ca",
    "precision": 6,
    "c1TradingFee": 2,
    "c2TradingFee": 2,
    "c1GasFee": 0.5,
    "c2GasFee": 1.5,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 20000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 20000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "6-23/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 6,
    "c2ID": 23,
    "c1Name": "polygon",
    "c2Name": "linea",
    "t1Address": "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "6-23/USDC",
    "tName": "USDC",
    "makerAddress": "0x41d3d33156ae7c62c094aae2995003ae63f587b3",
    "c1ID": 6,
    "c2ID": 23,
    "c1Name": "polygon",
    "c2Name": "linea",
    "t1Address": "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
    "t2Address": "0x176211869ca2b568f2a7d4ee941e073a821ee1ff",
    "precision": 6,
    "c1TradingFee": 2,
    "c2TradingFee": 2,
    "c1GasFee": 0,
    "c2GasFee": 1,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 20000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 20000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "6-23/USDT",
    "tName": "USDT",
    "makerAddress": "0xd7aa9ba6caac7b0436c91396f22ca5a7f31664fc",
    "c1ID": 6,
    "c2ID": 23,
    "c1Name": "polygon",
    "c2Name": "linea",
    "t1Address": "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
    "t2Address": "0xa219439258ca9da29e9cc4ce5596924745e12b93",
    "precision": 6,
    "c1TradingFee": 2,
    "c2TradingFee": 2,
    "c1GasFee": 0,
    "c2GasFee": 1,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 20000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 20000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "6-24/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 6,
    "c2ID": 24,
    "c1Name": "polygon",
    "c2Name": "mantle",
    "t1Address": "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
    "t2Address": "0xdeaddeaddeaddeaddeaddeaddeaddeaddead1111",
    "precision": 18,
    "c1TradingFee": 0.0015,
    "c2TradingFee": 0.0015,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "6-25/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 6,
    "c2ID": 25,
    "c1Name": "polygon",
    "c2Name": "opbnb",
    "t1Address": "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
    "t2Address": "0xe7798f023fc62146e8aa1b36da45fb70855a77ea",
    "precision": 18,
    "c1TradingFee": 0.0011,
    "c2TradingFee": 0.0013,
    "c1GasFee": 0,
    "c2GasFee": 2,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "6-30/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 6,
    "c2ID": 30,
    "c1Name": "polygon",
    "c2Name": "zora",
    "t1Address": "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.0015,
    "c1GasFee": 0,
    "c2GasFee": 10,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "6-31/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 6,
    "c2ID": 31,
    "c1Name": "polygon",
    "c2Name": "manta",
    "t1Address": "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.001,
    "c1GasFee": 0,
    "c2GasFee": 1.5,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "6-36/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 6,
    "c2ID": 36,
    "c1Name": "polygon",
    "c2Name": "kroma",
    "t1Address": "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 3,
    "c2MinPrice": 0,
    "c2MaxPrice": 0,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "6-38/USDC",
    "tName": "USDC",
    "makerAddress": "0x41d3d33156ae7c62c094aae2995003ae63f587b3",
    "c1ID": 6,
    "c2ID": 38,
    "c1Name": "polygon",
    "c2Name": "zkfair",
    "t1Address": "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 6,
    "c1TradingFee": 1.2,
    "c2TradingFee": 1.4,
    "c1GasFee": 1.5,
    "c2GasFee": 1.5,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 10000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 10000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "6-38/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 6,
    "c2ID": 38,
    "c1Name": "polygon",
    "c2Name": "zkfair",
    "t1Address": "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
    "t2Address": "0x4b21b980d0dc7d3c0c6175b0a412694f3a1c7c6b",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0.5,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "7-8/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 7,
    "c2ID": 8,
    "c1Name": "optimism",
    "c2Name": "immutableX",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0.0015,
    "c1GasFee": 0.1,
    "c2GasFee": 0.2,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "7-9/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 7,
    "c2ID": 9,
    "c1Name": "optimism",
    "c2Name": "loopring",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0.0016,
    "c1GasFee": 0.1,
    "c2GasFee": 0.15,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 10,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 10,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "7-12/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 7,
    "c2ID": 12,
    "c1Name": "optimism",
    "c2Name": "zkspace",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0.0015,
    "c1GasFee": 0.1,
    "c2GasFee": 0.2,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "7-13/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 7,
    "c2ID": 13,
    "c1Name": "optimism",
    "c2Name": "boba",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.0015,
    "c1GasFee": 0.1,
    "c2GasFee": 1,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "7-14/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 7,
    "c2ID": 14,
    "c1Name": "optimism",
    "c2Name": "zksync2",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0016,
    "c2TradingFee": 0.0017,
    "c1GasFee": 0,
    "c2GasFee": 1,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 10,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "7-14/USDC",
    "tName": "USDC",
    "makerAddress": "0x41d3d33156ae7c62c094aae2995003ae63f587b3",
    "c1ID": 7,
    "c2ID": 14,
    "c1Name": "optimism",
    "c2Name": "zksync2",
    "t1Address": "0x7f5c764cbc14f9669b88837ca1490cca17c31607",
    "t2Address": "0x3355df6d4c9c3035724fd0e3914de96a5a83aaf4",
    "precision": 6,
    "c1TradingFee": 1.6,
    "c2TradingFee": 1.6,
    "c1GasFee": 0,
    "c2GasFee": 1,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 10000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 10000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "7-14/USDT",
    "tName": "USDT",
    "makerAddress": "0xd7aa9ba6caac7b0436c91396f22ca5a7f31664fc",
    "c1ID": 7,
    "c2ID": 14,
    "c1Name": "optimism",
    "c2Name": "zksync2",
    "t1Address": "0x94b008aa00579c1307b0ef2c499ad98a8ce58e58",
    "t2Address": "0x493257fd37edb34451f62edf8d2a0c418852ba4c",
    "precision": 6,
    "c1TradingFee": 1.6,
    "c2TradingFee": 1.6,
    "c1GasFee": 0,
    "c2GasFee": 1,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 20000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 20000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "7-15/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 7,
    "c2ID": 15,
    "c1Name": "optimism",
    "c2Name": "bnbchain",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0.0013,
    "c1GasFee": 0.1,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 10,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 10,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "7-15/USDC",
    "tName": "USDC",
    "makerAddress": "0x41d3d33156ae7c62c094aae2995003ae63f587b3",
    "c1ID": 7,
    "c2ID": 15,
    "c1Name": "optimism",
    "c2Name": "bnbchain",
    "t1Address": "0x7f5c764cbc14f9669b88837ca1490cca17c31607",
    "t2Address": "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d",
    "precision": 6,
    "c1TradingFee": 1.4,
    "c2TradingFee": 1.4,
    "c1GasFee": 0.5,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 20000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 20000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "7-15/USDT",
    "tName": "USDT",
    "makerAddress": "0xd7aa9ba6caac7b0436c91396f22ca5a7f31664fc",
    "c1ID": 7,
    "c2ID": 15,
    "c1Name": "optimism",
    "c2Name": "bnbchain",
    "t1Address": "0x94b008aa00579c1307b0ef2c499ad98a8ce58e58",
    "t2Address": "0x55d398326f99059ff775485246999027b3197955",
    "precision": 6,
    "c1TradingFee": 1.4,
    "c2TradingFee": 1.4,
    "c1GasFee": 0.5,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 20000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 20000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "7-16/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 7,
    "c2ID": 16,
    "c1Name": "optimism",
    "c2Name": "arbitrum_nova",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.001,
    "c1GasFee": 0.1,
    "c2GasFee": 6,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "7-16/USDC",
    "tName": "USDC",
    "makerAddress": "0x41d3d33156ae7c62c094aae2995003ae63f587b3",
    "c1ID": 7,
    "c2ID": 16,
    "c1Name": "optimism",
    "c2Name": "arbitrum_nova",
    "t1Address": "0x7f5c764cbc14f9669b88837ca1490cca17c31607",
    "t2Address": "0x750ba8b76187092b0d1e87e28daaf484d1b5273b",
    "precision": 6,
    "c1TradingFee": 1,
    "c2TradingFee": 1,
    "c1GasFee": 0,
    "c2GasFee": 2,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 5000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 3000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "7-17/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 7,
    "c2ID": 17,
    "c1Name": "optimism",
    "c2Name": "polygon_evm",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.0018,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "7-17/USDC",
    "tName": "USDC",
    "makerAddress": "0x41d3d33156ae7c62c094aae2995003ae63f587b3",
    "c1ID": 7,
    "c2ID": 17,
    "c1Name": "optimism",
    "c2Name": "polygon_evm",
    "t1Address": "0x7f5c764cbc14f9669b88837ca1490cca17c31607",
    "t2Address": "0xa8ce8aee21bc2a48a5ef670afcc9274c7bbbc035",
    "precision": 6,
    "c1TradingFee": 1.8,
    "c2TradingFee": 1.8,
    "c1GasFee": 0.5,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 10000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 10000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "7-17/USDT",
    "tName": "USDT",
    "makerAddress": "0xd7aa9ba6caac7b0436c91396f22ca5a7f31664fc",
    "c1ID": 7,
    "c2ID": 17,
    "c1Name": "optimism",
    "c2Name": "polygon_evm",
    "t1Address": "0x94b008aa00579c1307b0ef2c499ad98a8ce58e58",
    "t2Address": "0x1e4a5963abfd975d8c9021ce480b42188849d41d",
    "precision": 6,
    "c1TradingFee": 1.8,
    "c2TradingFee": 1.8,
    "c1GasFee": 0.5,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 5000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 5000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "7-19/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 7,
    "c2ID": 19,
    "c1Name": "optimism",
    "c2Name": "scroll",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0012,
    "c2TradingFee": 0.0013,
    "c1GasFee": 0,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "7-19/USDT",
    "tName": "USDT",
    "makerAddress": "0xd7aa9ba6caac7b0436c91396f22ca5a7f31664fc",
    "c1ID": 7,
    "c2ID": 19,
    "c1Name": "optimism",
    "c2Name": "scroll",
    "t1Address": "0x94b008aa00579c1307b0ef2c499ad98a8ce58e58",
    "t2Address": "0xf55bec9cafdbe8730f096aa55dad6d22d44099df",
    "precision": 6,
    "c1TradingFee": 1.6,
    "c2TradingFee": 1.6,
    "c1GasFee": 0,
    "c2GasFee": 1,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 20000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 20000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "7-19/USDC",
    "tName": "USDC",
    "makerAddress": "0x41d3d33156ae7c62c094aae2995003ae63f587b3",
    "c1ID": 7,
    "c2ID": 19,
    "c1Name": "optimism",
    "c2Name": "scroll",
    "t1Address": "0x7f5c764cbc14f9669b88837ca1490cca17c31607",
    "t2Address": "0x06efdbff2a14a7c8e15944d1f4a48f9f95f663a4",
    "precision": 6,
    "c1TradingFee": 1.6,
    "c2TradingFee": 1.6,
    "c1GasFee": 0,
    "c2GasFee": 1,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 20000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 20000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "7-21/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 7,
    "c2ID": 21,
    "c1Name": "optimism",
    "c2Name": "base",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.001,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "7-21/USDC",
    "tName": "USDC",
    "makerAddress": "0x41d3d33156ae7c62c094aae2995003ae63f587b3",
    "c1ID": 7,
    "c2ID": 21,
    "c1Name": "optimism",
    "c2Name": "base",
    "t1Address": "0x7f5c764cbc14f9669b88837ca1490cca17c31607",
    "t2Address": "0xd9aaec86b65d86f6a7b5b1b0c42ffa531710b6ca",
    "precision": 6,
    "c1TradingFee": 1.4,
    "c2TradingFee": 1.4,
    "c1GasFee": 0.5,
    "c2GasFee": 1.5,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 20000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 20000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "7-23/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 7,
    "c2ID": 23,
    "c1Name": "optimism",
    "c2Name": "linea",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "7-23/USDC",
    "tName": "USDC",
    "makerAddress": "0x41d3d33156ae7c62c094aae2995003ae63f587b3",
    "c1ID": 7,
    "c2ID": 23,
    "c1Name": "optimism",
    "c2Name": "linea",
    "t1Address": "0x7f5c764cbc14f9669b88837ca1490cca17c31607",
    "t2Address": "0x176211869ca2b568f2a7d4ee941e073a821ee1ff",
    "precision": 6,
    "c1TradingFee": 2,
    "c2TradingFee": 2,
    "c1GasFee": 0,
    "c2GasFee": 1,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 20000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 20000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "7-23/USDT",
    "tName": "USDT",
    "makerAddress": "0xd7aa9ba6caac7b0436c91396f22ca5a7f31664fc",
    "c1ID": 7,
    "c2ID": 23,
    "c1Name": "optimism",
    "c2Name": "linea",
    "t1Address": "0x94b008aa00579c1307b0ef2c499ad98a8ce58e58",
    "t2Address": "0xa219439258ca9da29e9cc4ce5596924745e12b93",
    "precision": 6,
    "c1TradingFee": 2,
    "c2TradingFee": 2,
    "c1GasFee": 0,
    "c2GasFee": 1,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 20000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 20000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "7-24/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 7,
    "c2ID": 24,
    "c1Name": "optimism",
    "c2Name": "mantle",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0xdeaddeaddeaddeaddeaddeaddeaddeaddead1111",
    "precision": 18,
    "c1TradingFee": 0.0015,
    "c2TradingFee": 0.0015,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "7-25/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 7,
    "c2ID": 25,
    "c1Name": "optimism",
    "c2Name": "opbnb",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0xe7798f023fc62146e8aa1b36da45fb70855a77ea",
    "precision": 18,
    "c1TradingFee": 0.0011,
    "c2TradingFee": 0.0012,
    "c1GasFee": 0,
    "c2GasFee": 2,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "7-30/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 7,
    "c2ID": 30,
    "c1Name": "optimism",
    "c2Name": "zora",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.0015,
    "c1GasFee": 0,
    "c2GasFee": 10,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "7-31/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 7,
    "c2ID": 31,
    "c1Name": "optimism",
    "c2Name": "manta",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.001,
    "c1GasFee": 0,
    "c2GasFee": 1.5,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "7-36/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 7,
    "c2ID": 36,
    "c1Name": "optimism",
    "c2Name": "kroma",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 3,
    "c2MinPrice": 0,
    "c2MaxPrice": 0,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "7-38/USDC",
    "tName": "USDC",
    "makerAddress": "0x41d3d33156ae7c62c094aae2995003ae63f587b3",
    "c1ID": 7,
    "c2ID": 38,
    "c1Name": "optimism",
    "c2Name": "zkfair",
    "t1Address": "0x7f5c764cbc14f9669b88837ca1490cca17c31607",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 6,
    "c1TradingFee": 1.2,
    "c2TradingFee": 1.4,
    "c1GasFee": 1.5,
    "c2GasFee": 1.5,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 10000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 10000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "7-38/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 7,
    "c2ID": 38,
    "c1Name": "optimism",
    "c2Name": "zkfair",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x4b21b980d0dc7d3c0c6175b0a412694f3a1c7c6b",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0.5,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "8-9/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 8,
    "c2ID": 9,
    "c1Name": "immutableX",
    "c2Name": "loopring",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0.2,
    "c2GasFee": 0.2,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "8-12/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 8,
    "c2ID": 12,
    "c1Name": "immutableX",
    "c2Name": "zkspace",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0.0006,
    "c1GasFee": 0.2,
    "c2GasFee": 0.2,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "8-13/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 8,
    "c2ID": 13,
    "c1Name": "immutableX",
    "c2Name": "boba",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.0006,
    "c1GasFee": 0.2,
    "c2GasFee": 1,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "8-14/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 8,
    "c2ID": 14,
    "c1Name": "immutableX",
    "c2Name": "zksync2",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0018,
    "c2TradingFee": 0.0009,
    "c1GasFee": 0,
    "c2GasFee": 1,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 10,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "8-15/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 8,
    "c2ID": 15,
    "c1Name": "immutableX",
    "c2Name": "bnbchain",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0.0005,
    "c1GasFee": 0.2,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "8-16/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 8,
    "c2ID": 16,
    "c1Name": "immutableX",
    "c2Name": "arbitrum_nova",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0005,
    "c1GasFee": 0,
    "c2GasFee": 6,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "8-17/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 8,
    "c2ID": 17,
    "c1Name": "immutableX",
    "c2Name": "polygon_evm",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.001,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "9-12/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 9,
    "c2ID": 12,
    "c1Name": "loopring",
    "c2Name": "zkspace",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0.0006,
    "c1GasFee": 0.2,
    "c2GasFee": 0.2,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "9-13/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 9,
    "c2ID": 13,
    "c1Name": "loopring",
    "c2Name": "boba",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.0006,
    "c1GasFee": 0.2,
    "c2GasFee": 1,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "9-14/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 9,
    "c2ID": 14,
    "c1Name": "loopring",
    "c2Name": "zksync2",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0018,
    "c2TradingFee": 0.0009,
    "c1GasFee": 0,
    "c2GasFee": 1,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 10,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "9-15/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 9,
    "c2ID": 15,
    "c1Name": "loopring",
    "c2Name": "bnbchain",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0.0006,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "9-16/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 9,
    "c2ID": 16,
    "c1Name": "loopring",
    "c2Name": "arbitrum_nova",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0005,
    "c1GasFee": 0,
    "c2GasFee": 6,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "9-17/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 9,
    "c2ID": 17,
    "c1Name": "loopring",
    "c2Name": "polygon_evm",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.001,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "12-13/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 12,
    "c2ID": 13,
    "c1Name": "zkspace",
    "c2Name": "boba",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0.2,
    "c2GasFee": 1,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "12-15/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 12,
    "c2ID": 15,
    "c1Name": "zkspace",
    "c2Name": "bnbchain",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0.0008,
    "c1GasFee": 1,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "12-16/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 12,
    "c2ID": 16,
    "c1Name": "zkspace",
    "c2Name": "arbitrum_nova",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0008,
    "c1GasFee": 0,
    "c2GasFee": 6,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 1,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 1,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "13-15/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 13,
    "c2ID": 15,
    "c1Name": "boba",
    "c2Name": "bnbchain",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0.0008,
    "c1GasFee": 1,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "13-16/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 13,
    "c2ID": 16,
    "c1Name": "boba",
    "c2Name": "arbitrum_nova",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0008,
    "c1GasFee": 0,
    "c2GasFee": 6,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 1,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 1,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "14-15/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 14,
    "c2ID": 15,
    "c1Name": "zksync2",
    "c2Name": "bnbchain",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
    "precision": 18,
    "c1TradingFee": 0.0013,
    "c2TradingFee": 0.0018,
    "c1GasFee": 1,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 10,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "14-15/USDC",
    "tName": "USDC",
    "makerAddress": "0x41d3d33156ae7c62c094aae2995003ae63f587b3",
    "c1ID": 14,
    "c2ID": 15,
    "c1Name": "zksync2",
    "c2Name": "bnbchain",
    "t1Address": "0x3355df6d4c9c3035724fd0e3914de96a5a83aaf4",
    "t2Address": "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d",
    "precision": 6,
    "c1TradingFee": 2,
    "c2TradingFee": 2,
    "c1GasFee": 1,
    "c2GasFee": 0,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 20000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 20000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "14-15/USDT",
    "tName": "USDT",
    "makerAddress": "0xd7aa9ba6caac7b0436c91396f22ca5a7f31664fc",
    "c1ID": 14,
    "c2ID": 15,
    "c1Name": "zksync2",
    "c2Name": "bnbchain",
    "t1Address": "0x493257fd37edb34451f62edf8d2a0c418852ba4c",
    "t2Address": "0x55d398326f99059ff775485246999027b3197955",
    "precision": 6,
    "c1TradingFee": 2,
    "c2TradingFee": 2,
    "c1GasFee": 1,
    "c2GasFee": 0,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 20000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 20000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "14-16/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 14,
    "c2ID": 16,
    "c1Name": "zksync2",
    "c2Name": "arbitrum_nova",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0008,
    "c2TradingFee": 0.0018,
    "c1GasFee": 1,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 10,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "14-17/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 14,
    "c2ID": 17,
    "c1Name": "zksync2",
    "c2Name": "polygon_evm",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0013,
    "c2TradingFee": 0.0016,
    "c1GasFee": 1,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "14-17/USDC",
    "tName": "USDC",
    "makerAddress": "0x41d3d33156ae7c62c094aae2995003ae63f587b3",
    "c1ID": 14,
    "c2ID": 17,
    "c1Name": "zksync2",
    "c2Name": "polygon_evm",
    "t1Address": "0x3355df6d4c9c3035724fd0e3914de96a5a83aaf4",
    "t2Address": "0xa8ce8aee21bc2a48a5ef670afcc9274c7bbbc035",
    "precision": 6,
    "c1TradingFee": 1.6,
    "c2TradingFee": 1.6,
    "c1GasFee": 1,
    "c2GasFee": 2,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 10000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 10000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "14-17/USDT",
    "tName": "USDT",
    "makerAddress": "0xd7aa9ba6caac7b0436c91396f22ca5a7f31664fc",
    "c1ID": 14,
    "c2ID": 17,
    "c1Name": "zksync2",
    "c2Name": "polygon_evm",
    "t1Address": "0x493257fd37edb34451f62edf8d2a0c418852ba4c",
    "t2Address": "0x1e4a5963abfd975d8c9021ce480b42188849d41d",
    "precision": 6,
    "c1TradingFee": 1.6,
    "c2TradingFee": 1.6,
    "c1GasFee": 1,
    "c2GasFee": 2,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 20000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 20000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "14-19/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 14,
    "c2ID": 19,
    "c1Name": "zksync2",
    "c2Name": "scroll",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0015,
    "c2TradingFee": 0.0015,
    "c1GasFee": 0,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "14-19/USDC",
    "tName": "USDC",
    "makerAddress": "0x41d3d33156ae7c62c094aae2995003ae63f587b3",
    "c1ID": 14,
    "c2ID": 19,
    "c1Name": "zksync2",
    "c2Name": "scroll",
    "t1Address": "0x3355df6d4c9c3035724fd0e3914de96a5a83aaf4",
    "t2Address": "0x06efdbff2a14a7c8e15944d1f4a48f9f95f663a4",
    "precision": 6,
    "c1TradingFee": 2,
    "c2TradingFee": 2,
    "c1GasFee": 1,
    "c2GasFee": 1,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 20000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 20000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "14-19/USDT",
    "tName": "USDT",
    "makerAddress": "0xd7aa9ba6caac7b0436c91396f22ca5a7f31664fc",
    "c1ID": 14,
    "c2ID": 19,
    "c1Name": "zksync2",
    "c2Name": "scroll",
    "t1Address": "0x493257fd37edb34451f62edf8d2a0c418852ba4c",
    "t2Address": "0xf55bec9cafdbe8730f096aa55dad6d22d44099df",
    "precision": 6,
    "c1TradingFee": 2,
    "c2TradingFee": 2,
    "c1GasFee": 1,
    "c2GasFee": 1,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 20000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 20000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "14-21/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 14,
    "c2ID": 21,
    "c1Name": "zksync2",
    "c2Name": "base",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.001,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "14-21/USDC",
    "tName": "USDC",
    "makerAddress": "0x41d3d33156ae7c62c094aae2995003ae63f587b3",
    "c1ID": 14,
    "c2ID": 21,
    "c1Name": "zksync2",
    "c2Name": "base",
    "t1Address": "0x3355df6d4c9c3035724fd0e3914de96a5a83aaf4",
    "t2Address": "0xd9aaec86b65d86f6a7b5b1b0c42ffa531710b6ca",
    "precision": 6,
    "c1TradingFee": 1.6,
    "c2TradingFee": 1.6,
    "c1GasFee": 1,
    "c2GasFee": 2,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 20000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 20000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "14-23/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 14,
    "c2ID": 23,
    "c1Name": "zksync2",
    "c2Name": "linea",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "14-23/USDC",
    "tName": "USDC",
    "makerAddress": "0x41d3d33156ae7c62c094aae2995003ae63f587b3",
    "c1ID": 14,
    "c2ID": 23,
    "c1Name": "zksync2",
    "c2Name": "linea",
    "t1Address": "0x3355df6d4c9c3035724fd0e3914de96a5a83aaf4",
    "t2Address": "0x176211869ca2b568f2a7d4ee941e073a821ee1ff",
    "precision": 6,
    "c1TradingFee": 1.6,
    "c2TradingFee": 1.6,
    "c1GasFee": 1,
    "c2GasFee": 1,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 20000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 20000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "14-23/USDT",
    "tName": "USDT",
    "makerAddress": "0xd7aa9ba6caac7b0436c91396f22ca5a7f31664fc",
    "c1ID": 14,
    "c2ID": 23,
    "c1Name": "zksync2",
    "c2Name": "linea",
    "t1Address": "0x493257fd37edb34451f62edf8d2a0c418852ba4c",
    "t2Address": "0xa219439258ca9da29e9cc4ce5596924745e12b93",
    "precision": 6,
    "c1TradingFee": 1.6,
    "c2TradingFee": 1.6,
    "c1GasFee": 1,
    "c2GasFee": 1,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 20000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 20000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "14-24/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 14,
    "c2ID": 24,
    "c1Name": "zksync2",
    "c2Name": "mantle",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0xdeaddeaddeaddeaddeaddeaddeaddeaddead1111",
    "precision": 18,
    "c1TradingFee": 0.0015,
    "c2TradingFee": 0.0015,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "14-25/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 14,
    "c2ID": 25,
    "c1Name": "zksync2",
    "c2Name": "opbnb",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0xe7798f023fc62146e8aa1b36da45fb70855a77ea",
    "precision": 18,
    "c1TradingFee": 0.0012,
    "c2TradingFee": 0.0014,
    "c1GasFee": 0,
    "c2GasFee": 2,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "14-30/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 14,
    "c2ID": 30,
    "c1Name": "zksync2",
    "c2Name": "zora",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.0015,
    "c1GasFee": 0,
    "c2GasFee": 10,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "14-31/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 14,
    "c2ID": 31,
    "c1Name": "zksync2",
    "c2Name": "manta",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.001,
    "c1GasFee": 0,
    "c2GasFee": 1.5,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "14-36/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 14,
    "c2ID": 36,
    "c1Name": "zksync2",
    "c2Name": "kroma",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 3,
    "c2MinPrice": 0,
    "c2MaxPrice": 0,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "14-38/USDC",
    "tName": "USDC",
    "makerAddress": "0x41d3d33156ae7c62c094aae2995003ae63f587b3",
    "c1ID": 14,
    "c2ID": 38,
    "c1Name": "zksync2",
    "c2Name": "zkfair",
    "t1Address": "0x3355df6d4c9c3035724fd0e3914de96a5a83aaf4",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 6,
    "c1TradingFee": 1.2,
    "c2TradingFee": 1.4,
    "c1GasFee": 1.5,
    "c2GasFee": 1.5,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 10000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 10000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "14-38/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 14,
    "c2ID": 38,
    "c1Name": "zksync2",
    "c2Name": "zkfair",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x4b21b980d0dc7d3c0c6175b0a412694f3a1c7c6b",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0.5,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "15-16/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 15,
    "c2ID": 16,
    "c1Name": "bnbchain",
    "c2Name": "arbitrum_nova",
    "t1Address": "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0,
    "c2GasFee": 6,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "15-16/USDC",
    "tName": "USDC",
    "makerAddress": "0x41d3d33156ae7c62c094aae2995003ae63f587b3",
    "c1ID": 15,
    "c2ID": 16,
    "c1Name": "bnbchain",
    "c2Name": "arbitrum_nova",
    "t1Address": "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d",
    "t2Address": "0x750ba8b76187092b0d1e87e28daaf484d1b5273b",
    "precision": 18,
    "c1TradingFee": 2,
    "c2TradingFee": 2,
    "c1GasFee": 0.5,
    "c2GasFee": 2,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 20000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 20000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "15-17/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 15,
    "c2ID": 17,
    "c1Name": "bnbchain",
    "c2Name": "polygon_evm",
    "t1Address": "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.0008,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "15-17/USDC",
    "tName": "USDC",
    "makerAddress": "0x41d3d33156ae7c62c094aae2995003ae63f587b3",
    "c1ID": 15,
    "c2ID": 17,
    "c1Name": "bnbchain",
    "c2Name": "polygon_evm",
    "t1Address": "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d",
    "t2Address": "0xa8ce8aee21bc2a48a5ef670afcc9274c7bbbc035",
    "precision": 6,
    "c1TradingFee": 2,
    "c2TradingFee": 2,
    "c1GasFee": 0.5,
    "c2GasFee": 2,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 20000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 20000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "15-17/USDT",
    "tName": "USDT",
    "makerAddress": "0xd7aa9ba6caac7b0436c91396f22ca5a7f31664fc",
    "c1ID": 15,
    "c2ID": 17,
    "c1Name": "bnbchain",
    "c2Name": "polygon_evm",
    "t1Address": "0x55d398326f99059ff775485246999027b3197955",
    "t2Address": "0x1e4a5963abfd975d8c9021ce480b42188849d41d",
    "precision": 6,
    "c1TradingFee": 2,
    "c2TradingFee": 2,
    "c1GasFee": 0.5,
    "c2GasFee": 2,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 20000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 20000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "15-19/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 15,
    "c2ID": 19,
    "c1Name": "bnbchain",
    "c2Name": "scroll",
    "t1Address": "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0013,
    "c2TradingFee": 0.0013,
    "c1GasFee": 0,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "15-19/USDT",
    "tName": "USDT",
    "makerAddress": "0xd7aa9ba6caac7b0436c91396f22ca5a7f31664fc",
    "c1ID": 15,
    "c2ID": 19,
    "c1Name": "bnbchain",
    "c2Name": "scroll",
    "t1Address": "0x55d398326f99059ff775485246999027b3197955",
    "t2Address": "0xf55bec9cafdbe8730f096aa55dad6d22d44099df",
    "precision": 6,
    "c1TradingFee": 2,
    "c2TradingFee": 2,
    "c1GasFee": 0,
    "c2GasFee": 1,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 20000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 20000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "15-19/USDC",
    "tName": "USDC",
    "makerAddress": "0x41d3d33156ae7c62c094aae2995003ae63f587b3",
    "c1ID": 15,
    "c2ID": 19,
    "c1Name": "bnbchain",
    "c2Name": "scroll",
    "t1Address": "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d",
    "t2Address": "0x06efdbff2a14a7c8e15944d1f4a48f9f95f663a4",
    "precision": 6,
    "c1TradingFee": 2,
    "c2TradingFee": 2,
    "c1GasFee": 0,
    "c2GasFee": 1,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 20000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 20000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "15-21/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 15,
    "c2ID": 21,
    "c1Name": "bnbchain",
    "c2Name": "base",
    "t1Address": "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.001,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "15-21/USDC",
    "tName": "USDC",
    "makerAddress": "0x41d3d33156ae7c62c094aae2995003ae63f587b3",
    "c1ID": 15,
    "c2ID": 21,
    "c1Name": "bnbchain",
    "c2Name": "base",
    "t1Address": "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d",
    "t2Address": "0xd9aaec86b65d86f6a7b5b1b0c42ffa531710b6ca",
    "precision": 18,
    "c1TradingFee": 2,
    "c2TradingFee": 2,
    "c1GasFee": 0.5,
    "c2GasFee": 1.5,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 20000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 20000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "15-23/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 15,
    "c2ID": 23,
    "c1Name": "bnbchain",
    "c2Name": "linea",
    "t1Address": "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "15-23/USDC",
    "tName": "USDC",
    "makerAddress": "0x41d3d33156ae7c62c094aae2995003ae63f587b3",
    "c1ID": 15,
    "c2ID": 23,
    "c1Name": "bnbchain",
    "c2Name": "linea",
    "t1Address": "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d",
    "t2Address": "0x176211869ca2b568f2a7d4ee941e073a821ee1ff",
    "precision": 18,
    "c1TradingFee": 2,
    "c2TradingFee": 2,
    "c1GasFee": 0.5,
    "c2GasFee": 1,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 20000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 20000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "15-23/USDT",
    "tName": "USDT",
    "makerAddress": "0xd7aa9ba6caac7b0436c91396f22ca5a7f31664fc",
    "c1ID": 15,
    "c2ID": 23,
    "c1Name": "bnbchain",
    "c2Name": "linea",
    "t1Address": "0x55d398326f99059ff775485246999027b3197955",
    "t2Address": "0xa219439258ca9da29e9cc4ce5596924745e12b93",
    "precision": 18,
    "c1TradingFee": 2,
    "c2TradingFee": 2,
    "c1GasFee": 0.5,
    "c2GasFee": 1,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 20000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 20000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "15-24/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 15,
    "c2ID": 24,
    "c1Name": "bnbchain",
    "c2Name": "mantle",
    "t1Address": "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
    "t2Address": "0xdeaddeaddeaddeaddeaddeaddeaddeaddead1111",
    "precision": 18,
    "c1TradingFee": 0.0015,
    "c2TradingFee": 0.0015,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "15-25/BNB",
    "tName": "BNB",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 15,
    "c2ID": 25,
    "c1Name": "bnbchain",
    "c2Name": "opbnb",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0035,
    "c2TradingFee": 0.009,
    "c1GasFee": 0,
    "c2GasFee": 8,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 2,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "15-25/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 15,
    "c2ID": 25,
    "c1Name": "bnbchain",
    "c2Name": "opbnb",
    "t1Address": "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
    "t2Address": "0xe7798f023fc62146e8aa1b36da45fb70855a77ea",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0012,
    "c1GasFee": 0,
    "c2GasFee": 2,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "15-30/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 15,
    "c2ID": 30,
    "c1Name": "bnbchain",
    "c2Name": "zora",
    "t1Address": "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.0015,
    "c1GasFee": 0,
    "c2GasFee": 10,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "15-31/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 15,
    "c2ID": 31,
    "c1Name": "bnbchain",
    "c2Name": "manta",
    "t1Address": "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.001,
    "c1GasFee": 0,
    "c2GasFee": 1.5,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "15-36/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 15,
    "c2ID": 36,
    "c1Name": "bnbchain",
    "c2Name": "kroma",
    "t1Address": "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 3,
    "c2MinPrice": 0,
    "c2MaxPrice": 0,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "15-38/USDC",
    "tName": "USDC",
    "makerAddress": "0x41d3d33156ae7c62c094aae2995003ae63f587b3",
    "c1ID": 15,
    "c2ID": 38,
    "c1Name": "bnbchain",
    "c2Name": "zkfair",
    "t1Address": "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 1.2,
    "c2TradingFee": 1.4,
    "c1GasFee": 1.5,
    "c2GasFee": 1.5,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 10000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 10000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "15-38/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 15,
    "c2ID": 38,
    "c1Name": "bnbchain",
    "c2Name": "zkfair",
    "t1Address": "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
    "t2Address": "0x4b21b980d0dc7d3c0c6175b0a412694f3a1c7c6b",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0.5,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "16-17/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 16,
    "c2ID": 17,
    "c1Name": "arbitrum_nova",
    "c2Name": "polygon_evm",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.0008,
    "c1GasFee": 0.3,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "16-19/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 16,
    "c2ID": 19,
    "c1Name": "arbitrum_nova",
    "c2Name": "scroll",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0013,
    "c2TradingFee": 0.0013,
    "c1GasFee": 0,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "16-19/USDC",
    "tName": "USDC",
    "makerAddress": "0x41d3d33156ae7c62c094aae2995003ae63f587b3",
    "c1ID": 16,
    "c2ID": 19,
    "c1Name": "arbitrum_nova",
    "c2Name": "scroll",
    "t1Address": "0x750ba8b76187092b0d1e87e28daaf484d1b5273b",
    "t2Address": "0x06efdbff2a14a7c8e15944d1f4a48f9f95f663a4",
    "precision": 6,
    "c1TradingFee": 1.6,
    "c2TradingFee": 1.6,
    "c1GasFee": 2,
    "c2GasFee": 1,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 20000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 20000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "16-21/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 16,
    "c2ID": 21,
    "c1Name": "arbitrum_nova",
    "c2Name": "base",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.001,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "16-21/USDC",
    "tName": "USDC",
    "makerAddress": "0x41d3d33156ae7c62c094aae2995003ae63f587b3",
    "c1ID": 16,
    "c2ID": 21,
    "c1Name": "arbitrum_nova",
    "c2Name": "base",
    "t1Address": "0x750ba8b76187092b0d1e87e28daaf484d1b5273b",
    "t2Address": "0xd9aaec86b65d86f6a7b5b1b0c42ffa531710b6ca",
    "precision": 6,
    "c1TradingFee": 1.4,
    "c2TradingFee": 1,
    "c1GasFee": 2,
    "c2GasFee": 1.5,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 20000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 20000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "16-23/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 16,
    "c2ID": 23,
    "c1Name": "arbitrum_nova",
    "c2Name": "linea",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "16-23/USDC",
    "tName": "USDC",
    "makerAddress": "0x41d3d33156ae7c62c094aae2995003ae63f587b3",
    "c1ID": 16,
    "c2ID": 23,
    "c1Name": "arbitrum_nova",
    "c2Name": "linea",
    "t1Address": "0x750ba8b76187092b0d1e87e28daaf484d1b5273b",
    "t2Address": "0x176211869ca2b568f2a7d4ee941e073a821ee1ff",
    "precision": 6,
    "c1TradingFee": 2,
    "c2TradingFee": 2,
    "c1GasFee": 1,
    "c2GasFee": 1,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 20000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 20000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "16-24/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 16,
    "c2ID": 24,
    "c1Name": "arbitrum_nova",
    "c2Name": "mantle",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0xdeaddeaddeaddeaddeaddeaddeaddeaddead1111",
    "precision": 18,
    "c1TradingFee": 0.0015,
    "c2TradingFee": 0.0015,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "16-25/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 16,
    "c2ID": 25,
    "c1Name": "arbitrum_nova",
    "c2Name": "opbnb",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0xe7798f023fc62146e8aa1b36da45fb70855a77ea",
    "precision": 18,
    "c1TradingFee": 0.0011,
    "c2TradingFee": 0.0012,
    "c1GasFee": 0.5,
    "c2GasFee": 2,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "16-30/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 16,
    "c2ID": 30,
    "c1Name": "arbitrum_nova",
    "c2Name": "zora",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.0015,
    "c1GasFee": 0,
    "c2GasFee": 10,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "16-31/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 16,
    "c2ID": 31,
    "c1Name": "arbitrum_nova",
    "c2Name": "manta",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.001,
    "c1GasFee": 0,
    "c2GasFee": 1.5,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "16-36/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 16,
    "c2ID": 36,
    "c1Name": "arbitrum_nova",
    "c2Name": "kroma",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 3,
    "c2MinPrice": 0,
    "c2MaxPrice": 0,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "16-38/USDC",
    "tName": "USDC",
    "makerAddress": "0x41d3d33156ae7c62c094aae2995003ae63f587b3",
    "c1ID": 16,
    "c2ID": 38,
    "c1Name": "arbitrum_nova",
    "c2Name": "zkfair",
    "t1Address": "0x750ba8b76187092b0d1e87e28daaf484d1b5273b",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 6,
    "c1TradingFee": 1.2,
    "c2TradingFee": 1.4,
    "c1GasFee": 1.5,
    "c2GasFee": 1.5,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 10000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 10000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "16-38/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 16,
    "c2ID": 38,
    "c1Name": "arbitrum_nova",
    "c2Name": "zkfair",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x4b21b980d0dc7d3c0c6175b0a412694f3a1c7c6b",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0.5,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "17-19/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 17,
    "c2ID": 19,
    "c1Name": "polygon_evm",
    "c2Name": "scroll",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0013,
    "c2TradingFee": 0.0013,
    "c1GasFee": 0,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "17-19/USDT",
    "tName": "USDT",
    "makerAddress": "0xd7aa9ba6caac7b0436c91396f22ca5a7f31664fc",
    "c1ID": 17,
    "c2ID": 19,
    "c1Name": "polygon_evm",
    "c2Name": "scroll",
    "t1Address": "0x1e4a5963abfd975d8c9021ce480b42188849d41d",
    "t2Address": "0xf55bec9cafdbe8730f096aa55dad6d22d44099df",
    "precision": 6,
    "c1TradingFee": 1.6,
    "c2TradingFee": 1.6,
    "c1GasFee": 2,
    "c2GasFee": 1,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 20000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 20000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "17-19/USDC",
    "tName": "USDC",
    "makerAddress": "0x41d3d33156ae7c62c094aae2995003ae63f587b3",
    "c1ID": 17,
    "c2ID": 19,
    "c1Name": "polygon_evm",
    "c2Name": "scroll",
    "t1Address": "0xa8ce8aee21bc2a48a5ef670afcc9274c7bbbc035",
    "t2Address": "0x06efdbff2a14a7c8e15944d1f4a48f9f95f663a4",
    "precision": 6,
    "c1TradingFee": 1.6,
    "c2TradingFee": 1.6,
    "c1GasFee": 2,
    "c2GasFee": 1,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 20000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 20000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "17-21/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 17,
    "c2ID": 21,
    "c1Name": "polygon_evm",
    "c2Name": "base",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.001,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "17-21/USDC",
    "tName": "USDC",
    "makerAddress": "0x41d3d33156ae7c62c094aae2995003ae63f587b3",
    "c1ID": 17,
    "c2ID": 21,
    "c1Name": "polygon_evm",
    "c2Name": "base",
    "t1Address": "0xa8ce8aee21bc2a48a5ef670afcc9274c7bbbc035",
    "t2Address": "0xd9aaec86b65d86f6a7b5b1b0c42ffa531710b6ca",
    "precision": 6,
    "c1TradingFee": 1.4,
    "c2TradingFee": 1.4,
    "c1GasFee": 2,
    "c2GasFee": 1.5,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 20000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 20000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "17-23/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 17,
    "c2ID": 23,
    "c1Name": "polygon_evm",
    "c2Name": "linea",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "17-23/USDC",
    "tName": "USDC",
    "makerAddress": "0x41d3d33156ae7c62c094aae2995003ae63f587b3",
    "c1ID": 17,
    "c2ID": 23,
    "c1Name": "polygon_evm",
    "c2Name": "linea",
    "t1Address": "0xa8ce8aee21bc2a48a5ef670afcc9274c7bbbc035",
    "t2Address": "0x176211869ca2b568f2a7d4ee941e073a821ee1ff",
    "precision": 6,
    "c1TradingFee": 2,
    "c2TradingFee": 2,
    "c1GasFee": 0,
    "c2GasFee": 1,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 20000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 20000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "17-23/USDT",
    "tName": "USDT",
    "makerAddress": "0xd7aa9ba6caac7b0436c91396f22ca5a7f31664fc",
    "c1ID": 17,
    "c2ID": 23,
    "c1Name": "polygon_evm",
    "c2Name": "linea",
    "t1Address": "0x1e4a5963abfd975d8c9021ce480b42188849d41d",
    "t2Address": "0xa219439258ca9da29e9cc4ce5596924745e12b93",
    "precision": 6,
    "c1TradingFee": 2,
    "c2TradingFee": 2,
    "c1GasFee": 0,
    "c2GasFee": 1,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 20000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 20000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "17-24/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 17,
    "c2ID": 24,
    "c1Name": "polygon_evm",
    "c2Name": "mantle",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0xdeaddeaddeaddeaddeaddeaddeaddeaddead1111",
    "precision": 18,
    "c1TradingFee": 0.0015,
    "c2TradingFee": 0.0015,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "17-25/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 17,
    "c2ID": 25,
    "c1Name": "polygon_evm",
    "c2Name": "opbnb",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0xe7798f023fc62146e8aa1b36da45fb70855a77ea",
    "precision": 18,
    "c1TradingFee": 0.0011,
    "c2TradingFee": 0.0013,
    "c1GasFee": 0.5,
    "c2GasFee": 2,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "17-30/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 17,
    "c2ID": 30,
    "c1Name": "polygon_evm",
    "c2Name": "zora",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.0015,
    "c1GasFee": 0,
    "c2GasFee": 10,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "17-31/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 17,
    "c2ID": 31,
    "c1Name": "polygon_evm",
    "c2Name": "manta",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.001,
    "c1GasFee": 0,
    "c2GasFee": 1.5,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "17-36/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 17,
    "c2ID": 36,
    "c1Name": "polygon_evm",
    "c2Name": "kroma",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 3,
    "c2MinPrice": 0,
    "c2MaxPrice": 0,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "17-38/USDC",
    "tName": "USDC",
    "makerAddress": "0x41d3d33156ae7c62c094aae2995003ae63f587b3",
    "c1ID": 17,
    "c2ID": 38,
    "c1Name": "polygon_evm",
    "c2Name": "zkfair",
    "t1Address": "0xa8ce8aee21bc2a48a5ef670afcc9274c7bbbc035",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 6,
    "c1TradingFee": 1.2,
    "c2TradingFee": 1.4,
    "c1GasFee": 1.5,
    "c2GasFee": 1.5,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 10000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 10000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "17-38/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 17,
    "c2ID": 38,
    "c1Name": "polygon_evm",
    "c2Name": "zkfair",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x4b21b980d0dc7d3c0c6175b0a412694f3a1c7c6b",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0.5,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "19-21/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 19,
    "c2ID": 21,
    "c1Name": "scroll",
    "c2Name": "base",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0013,
    "c2TradingFee": 0.0013,
    "c1GasFee": 0.5,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "19-21/USDC",
    "tName": "USDC",
    "makerAddress": "0x41d3d33156ae7c62c094aae2995003ae63f587b3",
    "c1ID": 19,
    "c2ID": 21,
    "c1Name": "scroll",
    "c2Name": "base",
    "t1Address": "0x06efdbff2a14a7c8e15944d1f4a48f9f95f663a4",
    "t2Address": "0xd9aaec86b65d86f6a7b5b1b0c42ffa531710b6ca",
    "precision": 6,
    "c1TradingFee": 1.6,
    "c2TradingFee": 1.6,
    "c1GasFee": 1,
    "c2GasFee": 2,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 20000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 20000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "19-23/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 19,
    "c2ID": 23,
    "c1Name": "scroll",
    "c2Name": "linea",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "19-23/USDT",
    "tName": "USDT",
    "makerAddress": "0xd7aa9ba6caac7b0436c91396f22ca5a7f31664fc",
    "c1ID": 19,
    "c2ID": 23,
    "c1Name": "scroll",
    "c2Name": "linea",
    "t1Address": "0xf55bec9cafdbe8730f096aa55dad6d22d44099df",
    "t2Address": "0xa219439258ca9da29e9cc4ce5596924745e12b93",
    "precision": 6,
    "c1TradingFee": 1.6,
    "c2TradingFee": 1.6,
    "c1GasFee": 1,
    "c2GasFee": 1,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 20000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 20000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "19-23/USDC",
    "tName": "USDC",
    "makerAddress": "0x41d3d33156ae7c62c094aae2995003ae63f587b3",
    "c1ID": 19,
    "c2ID": 23,
    "c1Name": "scroll",
    "c2Name": "linea",
    "t1Address": "0x06efdbff2a14a7c8e15944d1f4a48f9f95f663a4",
    "t2Address": "0x176211869ca2b568f2a7d4ee941e073a821ee1ff",
    "precision": 6,
    "c1TradingFee": 1.6,
    "c2TradingFee": 1.6,
    "c1GasFee": 1,
    "c2GasFee": 1,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 20000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 20000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "19-24/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 19,
    "c2ID": 24,
    "c1Name": "scroll",
    "c2Name": "mantle",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0xdeaddeaddeaddeaddeaddeaddeaddeaddead1111",
    "precision": 18,
    "c1TradingFee": 0.0013,
    "c2TradingFee": 0.0013,
    "c1GasFee": 0.5,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "19-25/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 19,
    "c2ID": 25,
    "c1Name": "scroll",
    "c2Name": "opbnb",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0xe7798f023fc62146e8aa1b36da45fb70855a77ea",
    "precision": 18,
    "c1TradingFee": 0.0011,
    "c2TradingFee": 0.0013,
    "c1GasFee": 0.5,
    "c2GasFee": 2,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "19-30/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 19,
    "c2ID": 30,
    "c1Name": "scroll",
    "c2Name": "zora",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0013,
    "c2TradingFee": 0.0013,
    "c1GasFee": 0.5,
    "c2GasFee": 1,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "19-31/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 19,
    "c2ID": 31,
    "c1Name": "scroll",
    "c2Name": "manta",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0013,
    "c2TradingFee": 0.001,
    "c1GasFee": 0.5,
    "c2GasFee": 1.5,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "19-36/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 19,
    "c2ID": 36,
    "c1Name": "scroll",
    "c2Name": "kroma",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 3,
    "c2MinPrice": 0,
    "c2MaxPrice": 0,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "19-38/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 19,
    "c2ID": 38,
    "c1Name": "scroll",
    "c2Name": "zkfair",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x4b21b980d0dc7d3c0c6175b0a412694f3a1c7c6b",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0.5,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "19-38/USDC",
    "tName": "USDC",
    "makerAddress": "0x41d3d33156ae7c62c094aae2995003ae63f587b3",
    "c1ID": 19,
    "c2ID": 38,
    "c1Name": "scroll",
    "c2Name": "zkfair",
    "t1Address": "0x06efdbff2a14a7c8e15944d1f4a48f9f95f663a4",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 1.2,
    "c2TradingFee": 1.4,
    "c1GasFee": 1.5,
    "c2GasFee": 1.5,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 10000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 10000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "21-23/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 21,
    "c2ID": 23,
    "c1Name": "base",
    "c2Name": "linea",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 2,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "21-23/USDC",
    "tName": "USDC",
    "makerAddress": "0x41d3d33156ae7c62c094aae2995003ae63f587b3",
    "c1ID": 21,
    "c2ID": 23,
    "c1Name": "base",
    "c2Name": "linea",
    "t1Address": "0xd9aaec86b65d86f6a7b5b1b0c42ffa531710b6ca",
    "t2Address": "0x176211869ca2b568f2a7d4ee941e073a821ee1ff",
    "precision": 6,
    "c1TradingFee": 1.4,
    "c2TradingFee": 1.4,
    "c1GasFee": 1.5,
    "c2GasFee": 1,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 20000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 20000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "21-24/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 21,
    "c2ID": 24,
    "c1Name": "base",
    "c2Name": "mantle",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0xdeaddeaddeaddeaddeaddeaddeaddeaddead1111",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.001,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 2,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "21-25/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 21,
    "c2ID": 25,
    "c1Name": "base",
    "c2Name": "opbnb",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0xe7798f023fc62146e8aa1b36da45fb70855a77ea",
    "precision": 18,
    "c1TradingFee": 0.0011,
    "c2TradingFee": 0.0013,
    "c1GasFee": 0,
    "c2GasFee": 2,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "21-30/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 21,
    "c2ID": 30,
    "c1Name": "base",
    "c2Name": "zora",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.0015,
    "c1GasFee": 0,
    "c2GasFee": 10,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "21-31/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 21,
    "c2ID": 31,
    "c1Name": "base",
    "c2Name": "manta",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.001,
    "c1GasFee": 0,
    "c2GasFee": 1.5,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "21-36/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 21,
    "c2ID": 36,
    "c1Name": "base",
    "c2Name": "kroma",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 3,
    "c2MinPrice": 0,
    "c2MaxPrice": 0,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "21-38/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 21,
    "c2ID": 38,
    "c1Name": "base",
    "c2Name": "zkfair",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x4b21b980d0dc7d3c0c6175b0a412694f3a1c7c6b",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0.5,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "21-38/USDC",
    "tName": "USDC",
    "makerAddress": "0x41d3d33156ae7c62c094aae2995003ae63f587b3",
    "c1ID": 21,
    "c2ID": 38,
    "c1Name": "base",
    "c2Name": "zkfair",
    "t1Address": "0xd9aaec86b65d86f6a7b5b1b0c42ffa531710b6ca",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 1.2,
    "c2TradingFee": 1.4,
    "c1GasFee": 1.5,
    "c2GasFee": 1.5,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 10000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 10000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "23-24/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 23,
    "c2ID": 24,
    "c1Name": "linea",
    "c2Name": "mantle",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0xdeaddeaddeaddeaddeaddeaddeaddeaddead1111",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0.0005,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 2,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "23-25/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 23,
    "c2ID": 25,
    "c1Name": "linea",
    "c2Name": "opbnb",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0xe7798f023fc62146e8aa1b36da45fb70855a77ea",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0.0005,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 2,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "23-30/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 23,
    "c2ID": 30,
    "c1Name": "linea",
    "c2Name": "zora",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0.0005,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 2,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "23-31/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 23,
    "c2ID": 31,
    "c1Name": "linea",
    "c2Name": "manta",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0.001,
    "c1GasFee": 0,
    "c2GasFee": 1.5,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 2,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "23-36/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 23,
    "c2ID": 36,
    "c1Name": "linea",
    "c2Name": "kroma",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 3,
    "c2MinPrice": 0,
    "c2MaxPrice": 0,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "23-38/USDC",
    "tName": "USDC",
    "makerAddress": "0x41d3d33156ae7c62c094aae2995003ae63f587b3",
    "c1ID": 23,
    "c2ID": 38,
    "c1Name": "linea",
    "c2Name": "zkfair",
    "t1Address": "0x176211869ca2b568f2a7d4ee941e073a821ee1ff",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 6,
    "c1TradingFee": 1.2,
    "c2TradingFee": 1.4,
    "c1GasFee": 1.5,
    "c2GasFee": 1.5,
    "c1MinPrice": 0.1,
    "c1MaxPrice": 10000,
    "c2MinPrice": 0.1,
    "c2MaxPrice": 10000,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "23-38/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 23,
    "c2ID": 38,
    "c1Name": "linea",
    "c2Name": "zkfair",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x4b21b980d0dc7d3c0c6175b0a412694f3a1c7c6b",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0.5,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "24-25/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 24,
    "c2ID": 25,
    "c1Name": "mantle",
    "c2Name": "opbnb",
    "t1Address": "0xdeaddeaddeaddeaddeaddeaddeaddeaddead1111",
    "t2Address": "0xe7798f023fc62146e8aa1b36da45fb70855a77ea",
    "precision": 18,
    "c1TradingFee": 0.0011,
    "c2TradingFee": 0.0013,
    "c1GasFee": 0.5,
    "c2GasFee": 2,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "24-30/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 24,
    "c2ID": 30,
    "c1Name": "mantle",
    "c2Name": "zora",
    "t1Address": "0xdeaddeaddeaddeaddeaddeaddeaddeaddead1111",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.0015,
    "c1GasFee": 0,
    "c2GasFee": 10,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "24-31/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 24,
    "c2ID": 31,
    "c1Name": "mantle",
    "c2Name": "manta",
    "t1Address": "0xdeaddeaddeaddeaddeaddeaddeaddeaddead1111",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.001,
    "c1GasFee": 0,
    "c2GasFee": 1.5,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "24-36/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 24,
    "c2ID": 36,
    "c1Name": "mantle",
    "c2Name": "kroma",
    "t1Address": "0xdeaddeaddeaddeaddeaddeaddeaddeaddead1111",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 3,
    "c2MinPrice": 0,
    "c2MaxPrice": 0,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "24-38/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 24,
    "c2ID": 38,
    "c1Name": "mantle",
    "c2Name": "zkfair",
    "t1Address": "0xdeaddeaddeaddeaddeaddeaddeaddeaddead1111",
    "t2Address": "0x4b21b980d0dc7d3c0c6175b0a412694f3a1c7c6b",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0.5,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "25-30/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 25,
    "c2ID": 30,
    "c1Name": "opbnb",
    "c2Name": "zora",
    "t1Address": "0xe7798f023fc62146e8aa1b36da45fb70855a77ea",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0013,
    "c2TradingFee": 0.0011,
    "c1GasFee": 2,
    "c2GasFee": 1,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 2,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "25-31/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 25,
    "c2ID": 31,
    "c1Name": "opbnb",
    "c2Name": "manta",
    "t1Address": "0xe7798f023fc62146e8aa1b36da45fb70855a77ea",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0013,
    "c2TradingFee": 0.001,
    "c1GasFee": 0,
    "c2GasFee": 1.5,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 2,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "30-31/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 30,
    "c2ID": 31,
    "c1Name": "zora",
    "c2Name": "manta",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.001,
    "c1GasFee": 0,
    "c2GasFee": 1.5,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "30-36/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 30,
    "c2ID": 36,
    "c1Name": "zora",
    "c2Name": "kroma",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 3,
    "c2MinPrice": 0,
    "c2MaxPrice": 0,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "30-38/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 30,
    "c2ID": 38,
    "c1Name": "zora",
    "c2Name": "zkfair",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x4b21b980d0dc7d3c0c6175b0a412694f3a1c7c6b",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0007,
    "c1GasFee": 1,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "31-36/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 31,
    "c2ID": 36,
    "c1Name": "manta",
    "c2Name": "kroma",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 3,
    "c2MinPrice": 0,
    "c2MaxPrice": 0,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "31-38/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 31,
    "c2ID": 38,
    "c1Name": "manta",
    "c2Name": "zkfair",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x4b21b980d0dc7d3c0c6175b0a412694f3a1c7c6b",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.0007,
    "c1GasFee": 1.5,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 2,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "1-40/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 1,
    "c2ID": 40,
    "c1Name": "mainnet",
    "c2Name": "blast",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0008,
    "c2TradingFee": 0.0055,
    "c1GasFee": 0,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "2-40/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 2,
    "c2ID": 40,
    "c1Name": "arbitrum",
    "c2Name": "blast",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0008,
    "c2TradingFee": 0.001,
    "c1GasFee": 0,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "3-40/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 3,
    "c2ID": 40,
    "c1Name": "zksync",
    "c2Name": "blast",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0008,
    "c2TradingFee": 0.001,
    "c1GasFee": 0,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "4-40/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 4,
    "c2ID": 40,
    "c1Name": "starknet",
    "c2Name": "blast",
    "t1Address": "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0008,
    "c2TradingFee": 0.001,
    "c1GasFee": 0,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "6-40/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 6,
    "c2ID": 40,
    "c1Name": "polygon",
    "c2Name": "blast",
    "t1Address": "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0008,
    "c2TradingFee": 0.001,
    "c1GasFee": 0,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "7-40/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 7,
    "c2ID": 40,
    "c1Name": "optimism",
    "c2Name": "blast",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0008,
    "c2TradingFee": 0.001,
    "c1GasFee": 0,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "14-40/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 14,
    "c2ID": 40,
    "c1Name": "zksync2",
    "c2Name": "blast",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0008,
    "c2TradingFee": 0.001,
    "c1GasFee": 0,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "16-40/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 16,
    "c2ID": 40,
    "c1Name": "arbitrum_nova",
    "c2Name": "blast",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0008,
    "c2TradingFee": 0.001,
    "c1GasFee": 0,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "17-40/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 17,
    "c2ID": 40,
    "c1Name": "polygon_evm",
    "c2Name": "blast",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0008,
    "c2TradingFee": 0.001,
    "c1GasFee": 0,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "19-40/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 19,
    "c2ID": 40,
    "c1Name": "scroll",
    "c2Name": "blast",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0008,
    "c2TradingFee": 0.001,
    "c1GasFee": 0,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "21-40/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 21,
    "c2ID": 40,
    "c1Name": "base",
    "c2Name": "blast",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0008,
    "c2TradingFee": 0.001,
    "c1GasFee": 0,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "23-40/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 23,
    "c2ID": 40,
    "c1Name": "linea",
    "c2Name": "blast",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0008,
    "c2TradingFee": 0.001,
    "c1GasFee": 0,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "24-40/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 24,
    "c2ID": 40,
    "c1Name": "mantle",
    "c2Name": "blast",
    "t1Address": "0xdeaddeaddeaddeaddeaddeaddeaddeaddead1111",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0008,
    "c2TradingFee": 0.001,
    "c1GasFee": 0,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "30-40/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 30,
    "c2ID": 40,
    "c1Name": "zora",
    "c2Name": "blast",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0008,
    "c2TradingFee": 0.001,
    "c1GasFee": 0,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "31-40/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 31,
    "c2ID": 40,
    "c1Name": "manta",
    "c2Name": "blast",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0008,
    "c2TradingFee": 0.001,
    "c1GasFee": 0,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "36-40/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 36,
    "c2ID": 40,
    "c1Name": "kroma",
    "c2Name": "blast",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0008,
    "c2TradingFee": 0.001,
    "c1GasFee": 0,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "40-41/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 40,
    "c2ID": 41,
    "c1Name": "blast",
    "c2Name": "zeta",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0xd97b1de3619ed2c6beb3860147e30ca8a7dc9891",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.0008,
    "c1GasFee": 0.5,
    "c2GasFee": 0,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "40-47/ETH",
    "tName": "ETH",
    "makerAddress": "0x80c67432656d59144ceff962e8faf8926599bcf8",
    "c1ID": 40,
    "c2ID": 47,
    "c1Name": "blast",
    "c2Name": "mode",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.0008,
    "c1GasFee": 0.5,
    "c2GasFee": 0,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  }
]

initMakerList.push(...[
  {
    "id": "1-40/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 1,
    "c2ID": 40,
    "c1Name": "mainnet",
    "c2Name": "blast",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0008,
    "c2TradingFee": 0.0055,
    "c1GasFee": 0,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "1-2/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 1,
    "c2ID": 2,
    "c1Name": "ethereum",
    "c2Name": "arbitrum",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0012,
    "c2TradingFee": 0.0058,
    "c1GasFee": 0.15,
    "c2GasFee": 0.3,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 10,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 10,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "1-3/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 1,
    "c2ID": 3,
    "c1Name": "ethereum",
    "c2Name": "zksync lite",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0013,
    "c2TradingFee": 0.0058,
    "c1GasFee": 0.15,
    "c2GasFee": 0.3,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 10,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 10,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "1-6/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 1,
    "c2ID": 6,
    "c1Name": "ethereum",
    "c2Name": "polygon",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0.0058,
    "c1GasFee": 0.15,
    "c2GasFee": 0.3,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 10,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 10,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "1-7/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 1,
    "c2ID": 7,
    "c1Name": "ethereum",
    "c2Name": "optimism",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0017,
    "c2TradingFee": 0.0058,
    "c1GasFee": 0.15,
    "c2GasFee": 0.3,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 10,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 10,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "1-8/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 1,
    "c2ID": 8,
    "c1Name": "ethereum",
    "c2Name": "immutable x",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0.0058,
    "c1GasFee": 0.2,
    "c2GasFee": 0.3,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "1-9/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 1,
    "c2ID": 9,
    "c1Name": "ethereum",
    "c2Name": "loopring",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0.0058,
    "c1GasFee": 0.15,
    "c2GasFee": 0.3,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "1-12/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 1,
    "c2ID": 12,
    "c1Name": "ethereum",
    "c2Name": "zkspace",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0058,
    "c1GasFee": 0.2,
    "c2GasFee": 0.3,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "1-13/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 1,
    "c2ID": 13,
    "c1Name": "ethereum",
    "c2Name": "boba",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.0058,
    "c1GasFee": 0.2,
    "c2GasFee": 0.3,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "1-14/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 1,
    "c2ID": 14,
    "c1Name": "ethereum",
    "c2Name": "zksync era",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0021,
    "c2TradingFee": 0.0058,
    "c1GasFee": 0,
    "c2GasFee": 1,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 10,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "1-15/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 1,
    "c2ID": 15,
    "c1Name": "ethereum",
    "c2Name": "bnb chain",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0.0058,
    "c1GasFee": 0,
    "c2GasFee": 0.3,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 10,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 10,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "1-16/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 1,
    "c2ID": 16,
    "c1Name": "ethereum",
    "c2Name": "arbitrum nova",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0058,
    "c1GasFee": 0,
    "c2GasFee": 6,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "1-17/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 1,
    "c2ID": 17,
    "c1Name": "ethereum",
    "c2Name": "polygon zkevm",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0012,
    "c2TradingFee": 0.0058,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "1-19/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 1,
    "c2ID": 19,
    "c1Name": "ethereum",
    "c2Name": "scroll",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0015,
    "c2TradingFee": 0.0058,
    "c1GasFee": 0,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "1-21/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 1,
    "c2ID": 21,
    "c1Name": "ethereum",
    "c2Name": "base",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0015,
    "c2TradingFee": 0.0058,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "1-23/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 1,
    "c2ID": 23,
    "c1Name": "ethereum",
    "c2Name": "linea",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0058,
    "c1GasFee": 0,
    "c2GasFee": 1,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "1-24/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 1,
    "c2ID": 24,
    "c1Name": "ethereum",
    "c2Name": "mantle",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0xdeaddeaddeaddeaddeaddeaddeaddeaddead1111",
    "precision": 18,
    "c1TradingFee": 0.0018,
    "c2TradingFee": 0.0058,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "1-25/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 1,
    "c2ID": 25,
    "c1Name": "ethereum",
    "c2Name": "opbnb",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0xe7798f023fc62146e8aa1b36da45fb70855a77ea",
    "precision": 18,
    "c1TradingFee": 0.0011,
    "c2TradingFee": 0.0058,
    "c1GasFee": 0,
    "c2GasFee": 2,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "1-30/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 1,
    "c2ID": 30,
    "c1Name": "ethereum",
    "c2Name": "zora",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.0058,
    "c1GasFee": 0,
    "c2GasFee": 10,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "1-31/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 1,
    "c2ID": 31,
    "c1Name": "ethereum",
    "c2Name": "manta",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.0058,
    "c1GasFee": 0,
    "c2GasFee": 1.5,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "1-36/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 1,
    "c2ID": 36,
    "c1Name": "ethereum",
    "c2Name": "kroma",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 3,
    "c2MinPrice": 0,
    "c2MaxPrice": 0,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "1-38/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 1,
    "c2ID": 38,
    "c1Name": "ethereum",
    "c2Name": "zkfair",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x4b21b980d0dc7d3c0c6175b0a412694f3a1c7c6b",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0055,
    "c1GasFee": 0.5,
    "c2GasFee": 1.5,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "2-3/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 2,
    "c2ID": 3,
    "c1Name": "arbitrum",
    "c2Name": "zksync lite",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0013,
    "c2TradingFee": 0.0011,
    "c1GasFee": 0.1,
    "c2GasFee": 0.15,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 10,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 10,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "2-6/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 2,
    "c2ID": 6,
    "c1Name": "arbitrum",
    "c2Name": "polygon",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0.0011,
    "c1GasFee": 0.1,
    "c2GasFee": 0.15,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 10,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 10,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "2-7/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 2,
    "c2ID": 7,
    "c1Name": "arbitrum",
    "c2Name": "optimism",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0012,
    "c2TradingFee": 0.0011,
    "c1GasFee": 0.1,
    "c2GasFee": 0.1,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 10,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 10,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "2-8/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 2,
    "c2ID": 8,
    "c1Name": "arbitrum",
    "c2Name": "immutable x",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0.001,
    "c1GasFee": 0.1,
    "c2GasFee": 0.2,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "2-9/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 2,
    "c2ID": 9,
    "c1Name": "arbitrum",
    "c2Name": "loopring",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0.0011,
    "c1GasFee": 0.1,
    "c2GasFee": 0.15,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 10,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 10,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "2-12/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 2,
    "c2ID": 12,
    "c1Name": "arbitrum",
    "c2Name": "zkspace",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0.0009,
    "c1GasFee": 0.1,
    "c2GasFee": 0.2,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "2-13/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 2,
    "c2ID": 13,
    "c1Name": "arbitrum",
    "c2Name": "boba",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.0011,
    "c1GasFee": 0.1,
    "c2GasFee": 1,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "2-14/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 2,
    "c2ID": 14,
    "c1Name": "arbitrum",
    "c2Name": "zksync era",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0016,
    "c2TradingFee": 0.0013,
    "c1GasFee": 0,
    "c2GasFee": 1,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 10,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "2-15/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 2,
    "c2ID": 15,
    "c1Name": "arbitrum",
    "c2Name": "bnb chain",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0.0008,
    "c1GasFee": 0.1,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 10,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 10,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "2-16/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 2,
    "c2ID": 16,
    "c1Name": "arbitrum",
    "c2Name": "arbitrum nova",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0006,
    "c1GasFee": 0.1,
    "c2GasFee": 6,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "2-17/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 2,
    "c2ID": 17,
    "c1Name": "arbitrum",
    "c2Name": "polygon zkevm",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.001,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "2-19/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 2,
    "c2ID": 19,
    "c1Name": "arbitrum",
    "c2Name": "scroll",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0012,
    "c2TradingFee": 0.0013,
    "c1GasFee": 0,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "2-21/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 2,
    "c2ID": 21,
    "c1Name": "arbitrum",
    "c2Name": "base",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.001,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "2-23/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 2,
    "c2ID": 23,
    "c1Name": "arbitrum",
    "c2Name": "linea",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "2-24/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 2,
    "c2ID": 24,
    "c1Name": "arbitrum",
    "c2Name": "mantle",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0xdeaddeaddeaddeaddeaddeaddeaddeaddead1111",
    "precision": 18,
    "c1TradingFee": 0.0015,
    "c2TradingFee": 0.0015,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "2-25/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 2,
    "c2ID": 25,
    "c1Name": "arbitrum",
    "c2Name": "opbnb",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0xe7798f023fc62146e8aa1b36da45fb70855a77ea",
    "precision": 18,
    "c1TradingFee": 0.0011,
    "c2TradingFee": 0.0012,
    "c1GasFee": 0,
    "c2GasFee": 2,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "2-30/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 2,
    "c2ID": 30,
    "c1Name": "arbitrum",
    "c2Name": "zora",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.0015,
    "c1GasFee": 0,
    "c2GasFee": 10,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "2-31/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 2,
    "c2ID": 31,
    "c1Name": "arbitrum",
    "c2Name": "manta",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.001,
    "c1GasFee": 0,
    "c2GasFee": 1.5,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "2-36/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 2,
    "c2ID": 36,
    "c1Name": "arbitrum",
    "c2Name": "kroma",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 3,
    "c2MinPrice": 0,
    "c2MaxPrice": 0,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "2-38/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 2,
    "c2ID": 38,
    "c1Name": "arbitrum",
    "c2Name": "zkfair",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x4b21b980d0dc7d3c0c6175b0a412694f3a1c7c6b",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0.5,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "3-6/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 3,
    "c2ID": 6,
    "c1Name": "zksync lite",
    "c2Name": "polygon",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0.0013,
    "c1GasFee": 0.15,
    "c2GasFee": 0.15,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 10,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 10,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "3-7/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 3,
    "c2ID": 7,
    "c1Name": "zksync lite",
    "c2Name": "optimism",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0013,
    "c2TradingFee": 0.0013,
    "c1GasFee": 0.15,
    "c2GasFee": 0.1,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 10,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 10,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "3-8/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 3,
    "c2ID": 8,
    "c1Name": "zksync lite",
    "c2Name": "immutable x",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0.2,
    "c2GasFee": 0.2,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "3-9/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 3,
    "c2ID": 9,
    "c1Name": "zksync lite",
    "c2Name": "loopring",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0.0013,
    "c1GasFee": 0.15,
    "c2GasFee": 0.15,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 10,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 10,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "3-12/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 3,
    "c2ID": 12,
    "c1Name": "zksync lite",
    "c2Name": "zkspace",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0.2,
    "c2GasFee": 0.2,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "3-13/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 3,
    "c2ID": 13,
    "c1Name": "zksync lite",
    "c2Name": "boba",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0.2,
    "c2GasFee": 1,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "3-14/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 3,
    "c2ID": 14,
    "c1Name": "zksync lite",
    "c2Name": "zksync era",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0018,
    "c2TradingFee": 0.0012,
    "c1GasFee": 0,
    "c2GasFee": 1,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 10,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "3-15/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 3,
    "c2ID": 15,
    "c1Name": "zksync lite",
    "c2Name": "bnb chain",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0.0005,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 10,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 10,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "3-16/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 3,
    "c2ID": 16,
    "c1Name": "zksync lite",
    "c2Name": "arbitrum nova",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0005,
    "c1GasFee": 0,
    "c2GasFee": 6,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "3-17/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 3,
    "c2ID": 17,
    "c1Name": "zksync lite",
    "c2Name": "polygon zkevm",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.001,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "3-19/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 3,
    "c2ID": 19,
    "c1Name": "zksync lite",
    "c2Name": "scroll",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0015,
    "c2TradingFee": 0.0015,
    "c1GasFee": 0,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "3-21/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 3,
    "c2ID": 21,
    "c1Name": "zksync lite",
    "c2Name": "base",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.001,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "3-23/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 3,
    "c2ID": 23,
    "c1Name": "zksync lite",
    "c2Name": "linea",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "3-24/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 3,
    "c2ID": 24,
    "c1Name": "zksync lite",
    "c2Name": "mantle",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0xdeaddeaddeaddeaddeaddeaddeaddeaddead1111",
    "precision": 18,
    "c1TradingFee": 0.0015,
    "c2TradingFee": 0.0015,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "3-25/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 3,
    "c2ID": 25,
    "c1Name": "zksync lite",
    "c2Name": "opbnb",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0xe7798f023fc62146e8aa1b36da45fb70855a77ea",
    "precision": 18,
    "c1TradingFee": 0.0011,
    "c2TradingFee": 0.0012,
    "c1GasFee": 0,
    "c2GasFee": 2,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "3-30/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 3,
    "c2ID": 30,
    "c1Name": "zksync lite",
    "c2Name": "zora",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.0015,
    "c1GasFee": 0,
    "c2GasFee": 10,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "3-31/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 3,
    "c2ID": 31,
    "c1Name": "zksync lite",
    "c2Name": "manta",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.001,
    "c1GasFee": 0,
    "c2GasFee": 1.5,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "3-36/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 3,
    "c2ID": 36,
    "c1Name": "zksync lite",
    "c2Name": "kroma",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 3,
    "c2MinPrice": 0,
    "c2MaxPrice": 0,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "3-38/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 3,
    "c2ID": 38,
    "c1Name": "zksync lite",
    "c2Name": "zkfair",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x4b21b980d0dc7d3c0c6175b0a412694f3a1c7c6b",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0.5,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "4-21/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 4,
    "c2ID": 21,
    "c1Name": "starknet",
    "c2Name": "base",
    "t1Address": "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0013,
    "c2TradingFee": 0.0013,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "4-23/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 4,
    "c2ID": 23,
    "c1Name": "starknet",
    "c2Name": "linea",
    "t1Address": "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "4-24/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 4,
    "c2ID": 24,
    "c1Name": "starknet",
    "c2Name": "mantle",
    "t1Address": "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
    "t2Address": "0xdeaddeaddeaddeaddeaddeaddeaddeaddead1111",
    "precision": 18,
    "c1TradingFee": 0.0013,
    "c2TradingFee": 0.0013,
    "c1GasFee": 0,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "4-30/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 4,
    "c2ID": 30,
    "c1Name": "starknet",
    "c2Name": "zora",
    "t1Address": "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0013,
    "c2TradingFee": 0.0013,
    "c1GasFee": 0,
    "c2GasFee": 1,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "4-38/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 4,
    "c2ID": 38,
    "c1Name": "starknet",
    "c2Name": "zkfair",
    "t1Address": "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
    "t2Address": "0x4b21b980d0dc7d3c0c6175b0a412694f3a1c7c6b",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0.5,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "6-7/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 6,
    "c2ID": 7,
    "c1Name": "polygon",
    "c2Name": "optimism",
    "t1Address": "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0013,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0.15,
    "c2GasFee": 0.1,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 10,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 10,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "6-8/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 6,
    "c2ID": 8,
    "c1Name": "polygon",
    "c2Name": "immutable x",
    "t1Address": "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0.2,
    "c2GasFee": 0.2,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "6-9/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 6,
    "c2ID": 9,
    "c1Name": "polygon",
    "c2Name": "loopring",
    "t1Address": "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0.15,
    "c2GasFee": 0.15,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 10,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 10,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "6-12/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 6,
    "c2ID": 12,
    "c1Name": "polygon",
    "c2Name": "zkspace",
    "t1Address": "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0.2,
    "c2GasFee": 0.2,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "6-13/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 6,
    "c2ID": 13,
    "c1Name": "polygon",
    "c2Name": "boba",
    "t1Address": "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0.2,
    "c2GasFee": 1,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "6-14/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 6,
    "c2ID": 14,
    "c1Name": "polygon",
    "c2Name": "zksync era",
    "t1Address": "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0016,
    "c2TradingFee": 0.0009,
    "c1GasFee": 0,
    "c2GasFee": 1,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 10,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "6-15/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 6,
    "c2ID": 15,
    "c1Name": "polygon",
    "c2Name": "bnb chain",
    "t1Address": "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
    "t2Address": "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 10,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 10,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "6-16/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 6,
    "c2ID": 16,
    "c1Name": "polygon",
    "c2Name": "arbitrum nova",
    "t1Address": "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0,
    "c2GasFee": 6,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "6-17/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 6,
    "c2ID": 17,
    "c1Name": "polygon",
    "c2Name": "polygon zkevm",
    "t1Address": "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "6-19/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 6,
    "c2ID": 19,
    "c1Name": "polygon",
    "c2Name": "scroll",
    "t1Address": "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0012,
    "c2TradingFee": 0.0013,
    "c1GasFee": 0,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "6-21/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 6,
    "c2ID": 21,
    "c1Name": "polygon",
    "c2Name": "base",
    "t1Address": "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.001,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "6-23/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 6,
    "c2ID": 23,
    "c1Name": "polygon",
    "c2Name": "linea",
    "t1Address": "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "6-24/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 6,
    "c2ID": 24,
    "c1Name": "polygon",
    "c2Name": "mantle",
    "t1Address": "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
    "t2Address": "0xdeaddeaddeaddeaddeaddeaddeaddeaddead1111",
    "precision": 18,
    "c1TradingFee": 0.0015,
    "c2TradingFee": 0.0015,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "6-25/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 6,
    "c2ID": 25,
    "c1Name": "polygon",
    "c2Name": "opbnb",
    "t1Address": "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
    "t2Address": "0xe7798f023fc62146e8aa1b36da45fb70855a77ea",
    "precision": 18,
    "c1TradingFee": 0.0011,
    "c2TradingFee": 0.0013,
    "c1GasFee": 0,
    "c2GasFee": 2,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "6-30/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 6,
    "c2ID": 30,
    "c1Name": "polygon",
    "c2Name": "zora",
    "t1Address": "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.0015,
    "c1GasFee": 0,
    "c2GasFee": 10,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "6-31/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 6,
    "c2ID": 31,
    "c1Name": "polygon",
    "c2Name": "manta",
    "t1Address": "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.001,
    "c1GasFee": 0,
    "c2GasFee": 1.5,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "6-36/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 6,
    "c2ID": 36,
    "c1Name": "polygon",
    "c2Name": "kroma",
    "t1Address": "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 3,
    "c2MinPrice": 0,
    "c2MaxPrice": 0,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "6-38/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 6,
    "c2ID": 38,
    "c1Name": "polygon",
    "c2Name": "zkfair",
    "t1Address": "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
    "t2Address": "0x4b21b980d0dc7d3c0c6175b0a412694f3a1c7c6b",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0.5,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "7-8/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 7,
    "c2ID": 8,
    "c1Name": "optimism",
    "c2Name": "immutable x",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0.0015,
    "c1GasFee": 0.1,
    "c2GasFee": 0.2,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "7-9/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 7,
    "c2ID": 9,
    "c1Name": "optimism",
    "c2Name": "loopring",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0.0016,
    "c1GasFee": 0.1,
    "c2GasFee": 0.15,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 10,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 10,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "7-12/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 7,
    "c2ID": 12,
    "c1Name": "optimism",
    "c2Name": "zkspace",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0.0015,
    "c1GasFee": 0.1,
    "c2GasFee": 0.2,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "7-13/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 7,
    "c2ID": 13,
    "c1Name": "optimism",
    "c2Name": "boba",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.0015,
    "c1GasFee": 0.1,
    "c2GasFee": 1,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "7-14/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 7,
    "c2ID": 14,
    "c1Name": "optimism",
    "c2Name": "zksync era",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0016,
    "c2TradingFee": 0.0017,
    "c1GasFee": 0,
    "c2GasFee": 1,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 10,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "7-15/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 7,
    "c2ID": 15,
    "c1Name": "optimism",
    "c2Name": "bnb chain",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0.0013,
    "c1GasFee": 0.1,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 10,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 10,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "7-16/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 7,
    "c2ID": 16,
    "c1Name": "optimism",
    "c2Name": "arbitrum nova",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.001,
    "c1GasFee": 0.1,
    "c2GasFee": 6,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "7-17/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 7,
    "c2ID": 17,
    "c1Name": "optimism",
    "c2Name": "polygon zkevm",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.0018,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "7-19/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 7,
    "c2ID": 19,
    "c1Name": "optimism",
    "c2Name": "scroll",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0012,
    "c2TradingFee": 0.0013,
    "c1GasFee": 0,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "7-21/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 7,
    "c2ID": 21,
    "c1Name": "optimism",
    "c2Name": "base",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.001,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "7-23/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 7,
    "c2ID": 23,
    "c1Name": "optimism",
    "c2Name": "linea",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "7-24/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 7,
    "c2ID": 24,
    "c1Name": "optimism",
    "c2Name": "mantle",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0xdeaddeaddeaddeaddeaddeaddeaddeaddead1111",
    "precision": 18,
    "c1TradingFee": 0.0015,
    "c2TradingFee": 0.0015,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "7-25/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 7,
    "c2ID": 25,
    "c1Name": "optimism",
    "c2Name": "opbnb",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0xe7798f023fc62146e8aa1b36da45fb70855a77ea",
    "precision": 18,
    "c1TradingFee": 0.0011,
    "c2TradingFee": 0.0012,
    "c1GasFee": 0,
    "c2GasFee": 2,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "7-30/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 7,
    "c2ID": 30,
    "c1Name": "optimism",
    "c2Name": "zora",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.0015,
    "c1GasFee": 0,
    "c2GasFee": 10,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "7-31/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 7,
    "c2ID": 31,
    "c1Name": "optimism",
    "c2Name": "manta",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.001,
    "c1GasFee": 0,
    "c2GasFee": 1.5,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "7-36/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 7,
    "c2ID": 36,
    "c1Name": "optimism",
    "c2Name": "kroma",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 3,
    "c2MinPrice": 0,
    "c2MaxPrice": 0,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "7-38/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 7,
    "c2ID": 38,
    "c1Name": "optimism",
    "c2Name": "zkfair",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x4b21b980d0dc7d3c0c6175b0a412694f3a1c7c6b",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0.5,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "8-9/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 8,
    "c2ID": 9,
    "c1Name": "immutable x",
    "c2Name": "loopring",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0.2,
    "c2GasFee": 0.2,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "8-12/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 8,
    "c2ID": 12,
    "c1Name": "immutable x",
    "c2Name": "zkspace",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0.0006,
    "c1GasFee": 0.2,
    "c2GasFee": 0.2,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "8-13/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 8,
    "c2ID": 13,
    "c1Name": "immutable x",
    "c2Name": "boba",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.0006,
    "c1GasFee": 0.2,
    "c2GasFee": 1,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "8-14/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 8,
    "c2ID": 14,
    "c1Name": "immutable x",
    "c2Name": "zksync era",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0018,
    "c2TradingFee": 0.0009,
    "c1GasFee": 0,
    "c2GasFee": 1,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 10,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "8-15/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 8,
    "c2ID": 15,
    "c1Name": "immutable x",
    "c2Name": "bnb chain",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0.0005,
    "c1GasFee": 0.2,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "8-16/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 8,
    "c2ID": 16,
    "c1Name": "immutable x",
    "c2Name": "arbitrum nova",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0005,
    "c1GasFee": 0,
    "c2GasFee": 6,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "8-17/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 8,
    "c2ID": 17,
    "c1Name": "immutable x",
    "c2Name": "polygon zkevm",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.001,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "9-12/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 9,
    "c2ID": 12,
    "c1Name": "loopring",
    "c2Name": "zkspace",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0.0006,
    "c1GasFee": 0.2,
    "c2GasFee": 0.2,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "9-13/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 9,
    "c2ID": 13,
    "c1Name": "loopring",
    "c2Name": "boba",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.0006,
    "c1GasFee": 0.2,
    "c2GasFee": 1,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "9-14/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 9,
    "c2ID": 14,
    "c1Name": "loopring",
    "c2Name": "zksync era",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0018,
    "c2TradingFee": 0.0009,
    "c1GasFee": 0,
    "c2GasFee": 1,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 10,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "9-15/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 9,
    "c2ID": 15,
    "c1Name": "loopring",
    "c2Name": "bnb chain",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0.0006,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "9-16/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 9,
    "c2ID": 16,
    "c1Name": "loopring",
    "c2Name": "arbitrum nova",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0005,
    "c1GasFee": 0,
    "c2GasFee": 6,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "9-17/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 9,
    "c2ID": 17,
    "c1Name": "loopring",
    "c2Name": "polygon zkevm",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.001,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "12-13/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 12,
    "c2ID": 13,
    "c1Name": "zkspace",
    "c2Name": "boba",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0.2,
    "c2GasFee": 1,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "12-15/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 12,
    "c2ID": 15,
    "c1Name": "zkspace",
    "c2Name": "bnb chain",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0.0008,
    "c1GasFee": 1,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "12-16/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 12,
    "c2ID": 16,
    "c1Name": "zkspace",
    "c2Name": "arbitrum nova",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0008,
    "c1GasFee": 0,
    "c2GasFee": 6,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 1,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 1,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "13-15/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 13,
    "c2ID": 15,
    "c1Name": "boba",
    "c2Name": "bnb chain",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0.0008,
    "c1GasFee": 1,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "13-16/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 13,
    "c2ID": 16,
    "c1Name": "boba",
    "c2Name": "arbitrum nova",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0008,
    "c1GasFee": 0,
    "c2GasFee": 6,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 1,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 1,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "14-15/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 14,
    "c2ID": 15,
    "c1Name": "zksync era",
    "c2Name": "bnb chain",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
    "precision": 18,
    "c1TradingFee": 0.0013,
    "c2TradingFee": 0.0018,
    "c1GasFee": 1,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 10,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "14-16/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 14,
    "c2ID": 16,
    "c1Name": "zksync era",
    "c2Name": "arbitrum nova",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0008,
    "c2TradingFee": 0.0018,
    "c1GasFee": 1,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 10,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "14-17/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 14,
    "c2ID": 17,
    "c1Name": "zksync era",
    "c2Name": "polygon zkevm",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0013,
    "c2TradingFee": 0.0016,
    "c1GasFee": 1,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "14-19/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 14,
    "c2ID": 19,
    "c1Name": "zksync era",
    "c2Name": "scroll",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0015,
    "c2TradingFee": 0.0015,
    "c1GasFee": 0,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "14-21/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 14,
    "c2ID": 21,
    "c1Name": "zksync era",
    "c2Name": "base",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.001,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "14-23/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 14,
    "c2ID": 23,
    "c1Name": "zksync era",
    "c2Name": "linea",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "14-24/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 14,
    "c2ID": 24,
    "c1Name": "zksync era",
    "c2Name": "mantle",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0xdeaddeaddeaddeaddeaddeaddeaddeaddead1111",
    "precision": 18,
    "c1TradingFee": 0.0015,
    "c2TradingFee": 0.0015,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "14-25/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 14,
    "c2ID": 25,
    "c1Name": "zksync era",
    "c2Name": "opbnb",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0xe7798f023fc62146e8aa1b36da45fb70855a77ea",
    "precision": 18,
    "c1TradingFee": 0.0012,
    "c2TradingFee": 0.0014,
    "c1GasFee": 0,
    "c2GasFee": 2,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "14-30/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 14,
    "c2ID": 30,
    "c1Name": "zksync era",
    "c2Name": "zora",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.0015,
    "c1GasFee": 0,
    "c2GasFee": 10,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "14-31/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 14,
    "c2ID": 31,
    "c1Name": "zksync era",
    "c2Name": "manta",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.001,
    "c1GasFee": 0,
    "c2GasFee": 1.5,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "14-36/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 14,
    "c2ID": 36,
    "c1Name": "zksync era",
    "c2Name": "kroma",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 3,
    "c2MinPrice": 0,
    "c2MaxPrice": 0,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "14-38/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 14,
    "c2ID": 38,
    "c1Name": "zksync era",
    "c2Name": "zkfair",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x4b21b980d0dc7d3c0c6175b0a412694f3a1c7c6b",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0.5,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "15-16/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 15,
    "c2ID": 16,
    "c1Name": "bnb chain",
    "c2Name": "arbitrum nova",
    "t1Address": "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0,
    "c2GasFee": 6,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "15-17/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 15,
    "c2ID": 17,
    "c1Name": "bnb chain",
    "c2Name": "polygon zkevm",
    "t1Address": "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.0008,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "15-19/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 15,
    "c2ID": 19,
    "c1Name": "bnb chain",
    "c2Name": "scroll",
    "t1Address": "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0013,
    "c2TradingFee": 0.0013,
    "c1GasFee": 0,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "15-21/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 15,
    "c2ID": 21,
    "c1Name": "bnb chain",
    "c2Name": "base",
    "t1Address": "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.001,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "15-23/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 15,
    "c2ID": 23,
    "c1Name": "bnb chain",
    "c2Name": "linea",
    "t1Address": "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "15-24/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 15,
    "c2ID": 24,
    "c1Name": "bnb chain",
    "c2Name": "mantle",
    "t1Address": "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
    "t2Address": "0xdeaddeaddeaddeaddeaddeaddeaddeaddead1111",
    "precision": 18,
    "c1TradingFee": 0.0015,
    "c2TradingFee": 0.0015,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "15-25/BNB",
    "tName": "BNB",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 15,
    "c2ID": 25,
    "c1Name": "bnb chain",
    "c2Name": "opbnb",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0035,
    "c2TradingFee": 0.009,
    "c1GasFee": 0,
    "c2GasFee": 8,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 10,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "15-25/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 15,
    "c2ID": 25,
    "c1Name": "bnb chain",
    "c2Name": "opbnb",
    "t1Address": "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
    "t2Address": "0xe7798f023fc62146e8aa1b36da45fb70855a77ea",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0012,
    "c1GasFee": 0,
    "c2GasFee": 2,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "15-30/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 15,
    "c2ID": 30,
    "c1Name": "bnb chain",
    "c2Name": "zora",
    "t1Address": "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.0015,
    "c1GasFee": 0,
    "c2GasFee": 10,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "15-31/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 15,
    "c2ID": 31,
    "c1Name": "bnb chain",
    "c2Name": "manta",
    "t1Address": "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.001,
    "c1GasFee": 0,
    "c2GasFee": 1.5,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "15-36/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 15,
    "c2ID": 36,
    "c1Name": "bnb chain",
    "c2Name": "kroma",
    "t1Address": "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 3,
    "c2MinPrice": 0,
    "c2MaxPrice": 0,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "15-38/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 15,
    "c2ID": 38,
    "c1Name": "bnb chain",
    "c2Name": "zkfair",
    "t1Address": "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
    "t2Address": "0x4b21b980d0dc7d3c0c6175b0a412694f3a1c7c6b",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0.5,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "16-17/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 16,
    "c2ID": 17,
    "c1Name": "arbitrum nova",
    "c2Name": "polygon zkevm",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.0008,
    "c1GasFee": 0.3,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "16-19/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 16,
    "c2ID": 19,
    "c1Name": "arbitrum nova",
    "c2Name": "scroll",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0013,
    "c2TradingFee": 0.0013,
    "c1GasFee": 0,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "16-21/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 16,
    "c2ID": 21,
    "c1Name": "arbitrum nova",
    "c2Name": "base",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.001,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "16-23/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 16,
    "c2ID": 23,
    "c1Name": "arbitrum nova",
    "c2Name": "linea",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "16-24/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 16,
    "c2ID": 24,
    "c1Name": "arbitrum nova",
    "c2Name": "mantle",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0xdeaddeaddeaddeaddeaddeaddeaddeaddead1111",
    "precision": 18,
    "c1TradingFee": 0.0015,
    "c2TradingFee": 0.0015,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "16-25/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 16,
    "c2ID": 25,
    "c1Name": "arbitrum nova",
    "c2Name": "opbnb",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0xe7798f023fc62146e8aa1b36da45fb70855a77ea",
    "precision": 18,
    "c1TradingFee": 0.0011,
    "c2TradingFee": 0.0012,
    "c1GasFee": 0.5,
    "c2GasFee": 2,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "16-30/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 16,
    "c2ID": 30,
    "c1Name": "arbitrum nova",
    "c2Name": "zora",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.0015,
    "c1GasFee": 0,
    "c2GasFee": 10,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "16-31/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 16,
    "c2ID": 31,
    "c1Name": "arbitrum nova",
    "c2Name": "manta",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.001,
    "c1GasFee": 0,
    "c2GasFee": 1.5,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "16-36/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 16,
    "c2ID": 36,
    "c1Name": "arbitrum nova",
    "c2Name": "kroma",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 3,
    "c2MinPrice": 0,
    "c2MaxPrice": 0,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "16-38/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 16,
    "c2ID": 38,
    "c1Name": "arbitrum nova",
    "c2Name": "zkfair",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x4b21b980d0dc7d3c0c6175b0a412694f3a1c7c6b",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0.5,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "17-19/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 17,
    "c2ID": 19,
    "c1Name": "polygon zkevm",
    "c2Name": "scroll",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0013,
    "c2TradingFee": 0.0013,
    "c1GasFee": 0,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "17-21/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 17,
    "c2ID": 21,
    "c1Name": "polygon zkevm",
    "c2Name": "base",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.001,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "17-23/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 17,
    "c2ID": 23,
    "c1Name": "polygon zkevm",
    "c2Name": "linea",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "17-24/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 17,
    "c2ID": 24,
    "c1Name": "polygon zkevm",
    "c2Name": "mantle",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0xdeaddeaddeaddeaddeaddeaddeaddeaddead1111",
    "precision": 18,
    "c1TradingFee": 0.0015,
    "c2TradingFee": 0.0015,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "17-25/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 17,
    "c2ID": 25,
    "c1Name": "polygon zkevm",
    "c2Name": "opbnb",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0xe7798f023fc62146e8aa1b36da45fb70855a77ea",
    "precision": 18,
    "c1TradingFee": 0.0011,
    "c2TradingFee": 0.0013,
    "c1GasFee": 0.5,
    "c2GasFee": 2,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "17-30/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 17,
    "c2ID": 30,
    "c1Name": "polygon zkevm",
    "c2Name": "zora",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.0015,
    "c1GasFee": 0,
    "c2GasFee": 10,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "17-31/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 17,
    "c2ID": 31,
    "c1Name": "polygon zkevm",
    "c2Name": "manta",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.001,
    "c1GasFee": 0,
    "c2GasFee": 1.5,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "17-36/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 17,
    "c2ID": 36,
    "c1Name": "polygon zkevm",
    "c2Name": "kroma",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 3,
    "c2MinPrice": 0,
    "c2MaxPrice": 0,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "17-38/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 17,
    "c2ID": 38,
    "c1Name": "polygon zkevm",
    "c2Name": "zkfair",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x4b21b980d0dc7d3c0c6175b0a412694f3a1c7c6b",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0.5,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "19-21/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 19,
    "c2ID": 21,
    "c1Name": "scroll",
    "c2Name": "base",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0013,
    "c2TradingFee": 0.0013,
    "c1GasFee": 0.5,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "19-23/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 19,
    "c2ID": 23,
    "c1Name": "scroll",
    "c2Name": "linea",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "19-24/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 19,
    "c2ID": 24,
    "c1Name": "scroll",
    "c2Name": "mantle",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0xdeaddeaddeaddeaddeaddeaddeaddeaddead1111",
    "precision": 18,
    "c1TradingFee": 0.0013,
    "c2TradingFee": 0.0013,
    "c1GasFee": 0.5,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "19-25/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 19,
    "c2ID": 25,
    "c1Name": "scroll",
    "c2Name": "opbnb",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0xe7798f023fc62146e8aa1b36da45fb70855a77ea",
    "precision": 18,
    "c1TradingFee": 0.0011,
    "c2TradingFee": 0.0013,
    "c1GasFee": 0.5,
    "c2GasFee": 2,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "19-30/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 19,
    "c2ID": 30,
    "c1Name": "scroll",
    "c2Name": "zora",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0013,
    "c2TradingFee": 0.0013,
    "c1GasFee": 0.5,
    "c2GasFee": 1,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "19-31/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 19,
    "c2ID": 31,
    "c1Name": "scroll",
    "c2Name": "manta",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0013,
    "c2TradingFee": 0.001,
    "c1GasFee": 0.5,
    "c2GasFee": 1.5,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "19-36/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 19,
    "c2ID": 36,
    "c1Name": "scroll",
    "c2Name": "kroma",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 3,
    "c2MinPrice": 0,
    "c2MaxPrice": 0,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "19-38/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 19,
    "c2ID": 38,
    "c1Name": "scroll",
    "c2Name": "zkfair",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x4b21b980d0dc7d3c0c6175b0a412694f3a1c7c6b",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0.5,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "21-23/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 21,
    "c2ID": 23,
    "c1Name": "base",
    "c2Name": "linea",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 2,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "21-24/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 21,
    "c2ID": 24,
    "c1Name": "base",
    "c2Name": "mantle",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0xdeaddeaddeaddeaddeaddeaddeaddeaddead1111",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.001,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 2,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "21-25/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 21,
    "c2ID": 25,
    "c1Name": "base",
    "c2Name": "opbnb",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0xe7798f023fc62146e8aa1b36da45fb70855a77ea",
    "precision": 18,
    "c1TradingFee": 0.0011,
    "c2TradingFee": 0.0013,
    "c1GasFee": 0,
    "c2GasFee": 2,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "21-30/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 21,
    "c2ID": 30,
    "c1Name": "base",
    "c2Name": "zora",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.0015,
    "c1GasFee": 0,
    "c2GasFee": 10,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "21-31/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 21,
    "c2ID": 31,
    "c1Name": "base",
    "c2Name": "manta",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.001,
    "c1GasFee": 0,
    "c2GasFee": 1.5,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "21-36/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 21,
    "c2ID": 36,
    "c1Name": "base",
    "c2Name": "kroma",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 3,
    "c2MinPrice": 0,
    "c2MaxPrice": 0,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "21-38/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 21,
    "c2ID": 38,
    "c1Name": "base",
    "c2Name": "zkfair",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x4b21b980d0dc7d3c0c6175b0a412694f3a1c7c6b",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0.5,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "23-24/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 23,
    "c2ID": 24,
    "c1Name": "linea",
    "c2Name": "mantle",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0xdeaddeaddeaddeaddeaddeaddeaddeaddead1111",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0.0005,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 2,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "23-25/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 23,
    "c2ID": 25,
    "c1Name": "linea",
    "c2Name": "opbnb",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0xe7798f023fc62146e8aa1b36da45fb70855a77ea",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0.0005,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 2,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "23-30/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 23,
    "c2ID": 30,
    "c1Name": "linea",
    "c2Name": "zora",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0.0005,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 2,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "23-31/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 23,
    "c2ID": 31,
    "c1Name": "linea",
    "c2Name": "manta",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0.001,
    "c1GasFee": 0,
    "c2GasFee": 1.5,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 2,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "23-36/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 23,
    "c2ID": 36,
    "c1Name": "linea",
    "c2Name": "kroma",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 3,
    "c2MinPrice": 0,
    "c2MaxPrice": 0,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "23-38/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 23,
    "c2ID": 38,
    "c1Name": "linea",
    "c2Name": "zkfair",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x4b21b980d0dc7d3c0c6175b0a412694f3a1c7c6b",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0.5,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "24-25/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 24,
    "c2ID": 25,
    "c1Name": "mantle",
    "c2Name": "opbnb",
    "t1Address": "0xdeaddeaddeaddeaddeaddeaddeaddeaddead1111",
    "t2Address": "0xe7798f023fc62146e8aa1b36da45fb70855a77ea",
    "precision": 18,
    "c1TradingFee": 0.0011,
    "c2TradingFee": 0.0013,
    "c1GasFee": 0.5,
    "c2GasFee": 2,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "24-30/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 24,
    "c2ID": 30,
    "c1Name": "mantle",
    "c2Name": "zora",
    "t1Address": "0xdeaddeaddeaddeaddeaddeaddeaddeaddead1111",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.0015,
    "c1GasFee": 0,
    "c2GasFee": 10,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "24-31/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 24,
    "c2ID": 31,
    "c1Name": "mantle",
    "c2Name": "manta",
    "t1Address": "0xdeaddeaddeaddeaddeaddeaddeaddeaddead1111",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.001,
    "c1GasFee": 0,
    "c2GasFee": 1.5,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "24-36/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 24,
    "c2ID": 36,
    "c1Name": "mantle",
    "c2Name": "kroma",
    "t1Address": "0xdeaddeaddeaddeaddeaddeaddeaddeaddead1111",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 3,
    "c2MinPrice": 0,
    "c2MaxPrice": 0,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "24-38/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 24,
    "c2ID": 38,
    "c1Name": "mantle",
    "c2Name": "zkfair",
    "t1Address": "0xdeaddeaddeaddeaddeaddeaddeaddeaddead1111",
    "t2Address": "0x4b21b980d0dc7d3c0c6175b0a412694f3a1c7c6b",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0.5,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "25-30/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 25,
    "c2ID": 30,
    "c1Name": "opbnb",
    "c2Name": "zora",
    "t1Address": "0xe7798f023fc62146e8aa1b36da45fb70855a77ea",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0013,
    "c2TradingFee": 0.0011,
    "c1GasFee": 2,
    "c2GasFee": 1,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 2,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "25-31/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 25,
    "c2ID": 31,
    "c1Name": "opbnb",
    "c2Name": "manta",
    "t1Address": "0xe7798f023fc62146e8aa1b36da45fb70855a77ea",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0013,
    "c2TradingFee": 0.001,
    "c1GasFee": 0,
    "c2GasFee": 1.5,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 2,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "30-31/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 30,
    "c2ID": 31,
    "c1Name": "zora",
    "c2Name": "manta",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.001,
    "c1GasFee": 0,
    "c2GasFee": 1.5,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "30-36/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 30,
    "c2ID": 36,
    "c1Name": "zora",
    "c2Name": "kroma",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 3,
    "c2MinPrice": 0,
    "c2MaxPrice": 0,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "30-38/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 30,
    "c2ID": 38,
    "c1Name": "zora",
    "c2Name": "zkfair",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x4b21b980d0dc7d3c0c6175b0a412694f3a1c7c6b",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0007,
    "c1GasFee": 1,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "31-36/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 31,
    "c2ID": 36,
    "c1Name": "manta",
    "c2Name": "kroma",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 3,
    "c2MinPrice": 0,
    "c2MaxPrice": 0,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "31-38/ETH",
    "tName": "ETH",
    "makerAddress": "0xee73323912a4e3772b74ed0ca1595a152b0ef282",
    "c1ID": 31,
    "c2ID": 38,
    "c1Name": "manta",
    "c2Name": "zkfair",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x4b21b980d0dc7d3c0c6175b0a412694f3a1c7c6b",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.0007,
    "c1GasFee": 1.5,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 2,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "1-41/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 1,
    "c2ID": 41,
    "c1Name": "mainnet",
    "c2Name": "zeta",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0xd97b1de3619ed2c6beb3860147e30ca8a7dc9891",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.005,
    "c1GasFee": 0,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "2-41/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 2,
    "c2ID": 41,
    "c1Name": "arbitrum",
    "c2Name": "zeta",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0xd97b1de3619ed2c6beb3860147e30ca8a7dc9891",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0005,
    "c1GasFee": 0,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "7-41/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 7,
    "c2ID": 41,
    "c1Name": "optimism",
    "c2Name": "zeta",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0xd97b1de3619ed2c6beb3860147e30ca8a7dc9891",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0005,
    "c1GasFee": 0,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "14-41/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 14,
    "c2ID": 41,
    "c1Name": "zksync2",
    "c2Name": "zeta",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0xd97b1de3619ed2c6beb3860147e30ca8a7dc9891",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0005,
    "c1GasFee": 0,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "17-41/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 17,
    "c2ID": 41,
    "c1Name": "polygon_evm",
    "c2Name": "zeta",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0xd97b1de3619ed2c6beb3860147e30ca8a7dc9891",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0005,
    "c1GasFee": 0,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },{
    "id": "19-41/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 19,
    "c2ID": 41,
    "c1Name": "scroll",
    "c2Name": "zeta",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0xd97b1de3619ed2c6beb3860147e30ca8a7dc9891",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0005,
    "c1GasFee": 0,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  }
]);

initMakerList.push(...[
  {
    "id": "1-2/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 1,
    "c2ID": 2,
    "c1Name": "mainnet",
    "c2Name": "arbitrum",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0012,
    "c2TradingFee": 0.0058,
    "c1GasFee": 0.15,
    "c2GasFee": 0.3,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 10,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 10,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "1-3/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 1,
    "c2ID": 3,
    "c1Name": "mainnet",
    "c2Name": "zksync",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0013,
    "c2TradingFee": 0.0058,
    "c1GasFee": 0.15,
    "c2GasFee": 0.3,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 10,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 10,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "1-4/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 1,
    "c2ID": 4,
    "c1Name": "mainnet",
    "c2Name": "starknet",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
    "precision": 18,
    "c1TradingFee": 0.0014,
    "c2TradingFee": 0.0058,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "1-6/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 1,
    "c2ID": 6,
    "c1Name": "mainnet",
    "c2Name": "polygon",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0.0058,
    "c1GasFee": 0.15,
    "c2GasFee": 0.3,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 10,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 10,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "1-7/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 1,
    "c2ID": 7,
    "c1Name": "mainnet",
    "c2Name": "optimism",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0017,
    "c2TradingFee": 0.0058,
    "c1GasFee": 0.15,
    "c2GasFee": 0.3,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 10,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 10,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "1-8/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 1,
    "c2ID": 8,
    "c1Name": "mainnet",
    "c2Name": "immutableX",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0.0058,
    "c1GasFee": 0.2,
    "c2GasFee": 0.3,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "1-9/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 1,
    "c2ID": 9,
    "c1Name": "mainnet",
    "c2Name": "loopring",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0.0058,
    "c1GasFee": 0.15,
    "c2GasFee": 0.3,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "1-12/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 1,
    "c2ID": 12,
    "c1Name": "mainnet",
    "c2Name": "zkspace",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0058,
    "c1GasFee": 0.2,
    "c2GasFee": 0.3,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "1-13/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 1,
    "c2ID": 13,
    "c1Name": "mainnet",
    "c2Name": "boba",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.0058,
    "c1GasFee": 0.2,
    "c2GasFee": 0.3,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "1-14/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 1,
    "c2ID": 14,
    "c1Name": "mainnet",
    "c2Name": "zksync2",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0021,
    "c2TradingFee": 0.0058,
    "c1GasFee": 0,
    "c2GasFee": 1,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 10,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "1-15/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 1,
    "c2ID": 15,
    "c1Name": "mainnet",
    "c2Name": "bnbchain",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0.0058,
    "c1GasFee": 0,
    "c2GasFee": 0.3,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 10,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 10,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "1-16/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 1,
    "c2ID": 16,
    "c1Name": "mainnet",
    "c2Name": "arbitrum_nova",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0058,
    "c1GasFee": 0,
    "c2GasFee": 6,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "1-17/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 1,
    "c2ID": 17,
    "c1Name": "mainnet",
    "c2Name": "polygon_evm",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0012,
    "c2TradingFee": 0.0058,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "1-19/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 1,
    "c2ID": 19,
    "c1Name": "mainnet",
    "c2Name": "scroll",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0015,
    "c2TradingFee": 0.0058,
    "c1GasFee": 0,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "1-21/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 1,
    "c2ID": 21,
    "c1Name": "mainnet",
    "c2Name": "base",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0015,
    "c2TradingFee": 0.0058,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "1-23/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 1,
    "c2ID": 23,
    "c1Name": "mainnet",
    "c2Name": "linea",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0058,
    "c1GasFee": 0,
    "c2GasFee": 1,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "1-24/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 1,
    "c2ID": 24,
    "c1Name": "mainnet",
    "c2Name": "mantle",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0xdeaddeaddeaddeaddeaddeaddeaddeaddead1111",
    "precision": 18,
    "c1TradingFee": 0.0018,
    "c2TradingFee": 0.0058,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "1-25/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 1,
    "c2ID": 25,
    "c1Name": "mainnet",
    "c2Name": "opbnb",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0xe7798f023fc62146e8aa1b36da45fb70855a77ea",
    "precision": 18,
    "c1TradingFee": 0.0011,
    "c2TradingFee": 0.0058,
    "c1GasFee": 0,
    "c2GasFee": 2,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "1-30/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 1,
    "c2ID": 30,
    "c1Name": "mainnet",
    "c2Name": "zora",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.0058,
    "c1GasFee": 0,
    "c2GasFee": 10,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "1-31/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 1,
    "c2ID": 31,
    "c1Name": "mainnet",
    "c2Name": "manta",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.0058,
    "c1GasFee": 0,
    "c2GasFee": 1.5,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "1-36/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 1,
    "c2ID": 36,
    "c1Name": "mainnet",
    "c2Name": "kroma",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 3,
    "c2MinPrice": 0,
    "c2MaxPrice": 0,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "1-38/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 1,
    "c2ID": 38,
    "c1Name": "mainnet",
    "c2Name": "zkfair",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x4b21b980d0dc7d3c0c6175b0a412694f3a1c7c6b",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0055,
    "c1GasFee": 0.5,
    "c2GasFee": 1.5,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "1-41/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 1,
    "c2ID": 41,
    "c1Name": "mainnet",
    "c2Name": "zeta",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0xd97b1de3619ed2c6beb3860147e30ca8a7dc9891",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.005,
    "c1GasFee": 0,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 1,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 1,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "1-47/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 1,
    "c2ID": 47,
    "c1Name": "mainnet",
    "c2Name": "mode",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0008,
    "c2TradingFee": 0.0055,
    "c1GasFee": 0,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "2-3/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 2,
    "c2ID": 3,
    "c1Name": "arbitrum",
    "c2Name": "zksync",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0013,
    "c2TradingFee": 0.0011,
    "c1GasFee": 0.1,
    "c2GasFee": 0.15,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 10,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 10,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "2-4/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 2,
    "c2ID": 4,
    "c1Name": "arbitrum",
    "c2Name": "starknet",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
    "precision": 18,
    "c1TradingFee": 0.0013,
    "c2TradingFee": 0.0013,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "2-6/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 2,
    "c2ID": 6,
    "c1Name": "arbitrum",
    "c2Name": "polygon",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0.0011,
    "c1GasFee": 0.1,
    "c2GasFee": 0.15,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 10,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 10,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "2-7/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 2,
    "c2ID": 7,
    "c1Name": "arbitrum",
    "c2Name": "optimism",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0012,
    "c2TradingFee": 0.0011,
    "c1GasFee": 0.1,
    "c2GasFee": 0.1,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 10,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 10,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "2-8/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 2,
    "c2ID": 8,
    "c1Name": "arbitrum",
    "c2Name": "immutableX",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0.001,
    "c1GasFee": 0.1,
    "c2GasFee": 0.2,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "2-9/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 2,
    "c2ID": 9,
    "c1Name": "arbitrum",
    "c2Name": "loopring",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0.0011,
    "c1GasFee": 0.1,
    "c2GasFee": 0.15,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 10,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 10,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "2-12/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 2,
    "c2ID": 12,
    "c1Name": "arbitrum",
    "c2Name": "zkspace",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0.0009,
    "c1GasFee": 0.1,
    "c2GasFee": 0.2,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "2-13/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 2,
    "c2ID": 13,
    "c1Name": "arbitrum",
    "c2Name": "boba",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.0011,
    "c1GasFee": 0.1,
    "c2GasFee": 1,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "2-14/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 2,
    "c2ID": 14,
    "c1Name": "arbitrum",
    "c2Name": "zksync2",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0016,
    "c2TradingFee": 0.0013,
    "c1GasFee": 0,
    "c2GasFee": 1,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 10,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "2-15/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 2,
    "c2ID": 15,
    "c1Name": "arbitrum",
    "c2Name": "bnbchain",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0.0008,
    "c1GasFee": 0.1,
    "c2GasFee": 0,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 10,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 10,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "2-16/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 2,
    "c2ID": 16,
    "c1Name": "arbitrum",
    "c2Name": "arbitrum_nova",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0006,
    "c1GasFee": 0.1,
    "c2GasFee": 6,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "2-17/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 2,
    "c2ID": 17,
    "c1Name": "arbitrum",
    "c2Name": "polygon_evm",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.001,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "2-19/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 2,
    "c2ID": 19,
    "c1Name": "arbitrum",
    "c2Name": "scroll",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0012,
    "c2TradingFee": 0.0013,
    "c1GasFee": 0,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "2-21/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 2,
    "c2ID": 21,
    "c1Name": "arbitrum",
    "c2Name": "base",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.001,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "2-23/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 2,
    "c2ID": 23,
    "c1Name": "arbitrum",
    "c2Name": "linea",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "2-24/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 2,
    "c2ID": 24,
    "c1Name": "arbitrum",
    "c2Name": "mantle",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0xdeaddeaddeaddeaddeaddeaddeaddeaddead1111",
    "precision": 18,
    "c1TradingFee": 0.0015,
    "c2TradingFee": 0.0015,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "2-25/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 2,
    "c2ID": 25,
    "c1Name": "arbitrum",
    "c2Name": "opbnb",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0xe7798f023fc62146e8aa1b36da45fb70855a77ea",
    "precision": 18,
    "c1TradingFee": 0.0011,
    "c2TradingFee": 0.0012,
    "c1GasFee": 0,
    "c2GasFee": 2,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "2-30/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 2,
    "c2ID": 30,
    "c1Name": "arbitrum",
    "c2Name": "zora",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.0015,
    "c1GasFee": 0,
    "c2GasFee": 10,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "2-31/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 2,
    "c2ID": 31,
    "c1Name": "arbitrum",
    "c2Name": "manta",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.001,
    "c1GasFee": 0,
    "c2GasFee": 1.5,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "2-36/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 2,
    "c2ID": 36,
    "c1Name": "arbitrum",
    "c2Name": "kroma",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 3,
    "c2MinPrice": 0,
    "c2MaxPrice": 0,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "2-38/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 2,
    "c2ID": 38,
    "c1Name": "arbitrum",
    "c2Name": "zkfair",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x4b21b980d0dc7d3c0c6175b0a412694f3a1c7c6b",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0.5,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "2-41/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 2,
    "c2ID": 41,
    "c1Name": "arbitrum",
    "c2Name": "zeta",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0xd97b1de3619ed2c6beb3860147e30ca8a7dc9891",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0005,
    "c1GasFee": 0,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 1,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 1,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "2-47/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 2,
    "c2ID": 47,
    "c1Name": "arbitrum",
    "c2Name": "mode",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0008,
    "c2TradingFee": 0.001,
    "c1GasFee": 0,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "3-4/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 3,
    "c2ID": 4,
    "c1Name": "zksync",
    "c2Name": "starknet",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
    "precision": 18,
    "c1TradingFee": 0,
    "c2TradingFee": 0.0015,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0,
    "c1MaxPrice": 0,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "3-6/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 3,
    "c2ID": 6,
    "c1Name": "zksync",
    "c2Name": "polygon",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0.0013,
    "c1GasFee": 0.15,
    "c2GasFee": 0.15,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 10,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 10,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "3-7/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 3,
    "c2ID": 7,
    "c1Name": "zksync",
    "c2Name": "optimism",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0013,
    "c2TradingFee": 0.0013,
    "c1GasFee": 0.15,
    "c2GasFee": 0.1,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 10,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 10,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "3-8/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 3,
    "c2ID": 8,
    "c1Name": "zksync",
    "c2Name": "immutableX",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0.2,
    "c2GasFee": 0.2,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "3-9/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 3,
    "c2ID": 9,
    "c1Name": "zksync",
    "c2Name": "loopring",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0.0013,
    "c1GasFee": 0.15,
    "c2GasFee": 0.15,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 10,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 10,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "3-12/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 3,
    "c2ID": 12,
    "c1Name": "zksync",
    "c2Name": "zkspace",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0.2,
    "c2GasFee": 0.2,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "3-13/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 3,
    "c2ID": 13,
    "c1Name": "zksync",
    "c2Name": "boba",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0.2,
    "c2GasFee": 1,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "3-14/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 3,
    "c2ID": 14,
    "c1Name": "zksync",
    "c2Name": "zksync2",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0018,
    "c2TradingFee": 0.0012,
    "c1GasFee": 0,
    "c2GasFee": 1,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 10,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "3-15/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 3,
    "c2ID": 15,
    "c1Name": "zksync",
    "c2Name": "bnbchain",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0.0005,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 10,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 10,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "3-16/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 3,
    "c2ID": 16,
    "c1Name": "zksync",
    "c2Name": "arbitrum_nova",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0005,
    "c1GasFee": 0,
    "c2GasFee": 6,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "3-17/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 3,
    "c2ID": 17,
    "c1Name": "zksync",
    "c2Name": "polygon_evm",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.001,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "3-19/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 3,
    "c2ID": 19,
    "c1Name": "zksync",
    "c2Name": "scroll",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0015,
    "c2TradingFee": 0.0015,
    "c1GasFee": 0,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "3-21/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 3,
    "c2ID": 21,
    "c1Name": "zksync",
    "c2Name": "base",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.001,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "3-23/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 3,
    "c2ID": 23,
    "c1Name": "zksync",
    "c2Name": "linea",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "3-24/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 3,
    "c2ID": 24,
    "c1Name": "zksync",
    "c2Name": "mantle",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0xdeaddeaddeaddeaddeaddeaddeaddeaddead1111",
    "precision": 18,
    "c1TradingFee": 0.0015,
    "c2TradingFee": 0.0015,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "3-25/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 3,
    "c2ID": 25,
    "c1Name": "zksync",
    "c2Name": "opbnb",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0xe7798f023fc62146e8aa1b36da45fb70855a77ea",
    "precision": 18,
    "c1TradingFee": 0.0011,
    "c2TradingFee": 0.0012,
    "c1GasFee": 0,
    "c2GasFee": 2,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "3-30/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 3,
    "c2ID": 30,
    "c1Name": "zksync",
    "c2Name": "zora",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.0015,
    "c1GasFee": 0,
    "c2GasFee": 10,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "3-31/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 3,
    "c2ID": 31,
    "c1Name": "zksync",
    "c2Name": "manta",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.001,
    "c1GasFee": 0,
    "c2GasFee": 1.5,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "3-36/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 3,
    "c2ID": 36,
    "c1Name": "zksync",
    "c2Name": "kroma",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 3,
    "c2MinPrice": 0,
    "c2MaxPrice": 0,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "3-38/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 3,
    "c2ID": 38,
    "c1Name": "zksync",
    "c2Name": "zkfair",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x4b21b980d0dc7d3c0c6175b0a412694f3a1c7c6b",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0.5,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "4-6/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 4,
    "c2ID": 6,
    "c1Name": "starknet",
    "c2Name": "polygon",
    "t1Address": "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
    "t2Address": "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
    "precision": 18,
    "c1TradingFee": 0.0013,
    "c2TradingFee": 0.0013,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "4-7/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 4,
    "c2ID": 7,
    "c1Name": "starknet",
    "c2Name": "optimism",
    "t1Address": "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0013,
    "c2TradingFee": 0.0013,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "4-8/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 4,
    "c2ID": 8,
    "c1Name": "starknet",
    "c2Name": "immutableX",
    "t1Address": "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0,
    "c1GasFee": 3.5,
    "c2GasFee": 0,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 3,
    "c2MinPrice": 0,
    "c2MaxPrice": 0,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "4-9/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 4,
    "c2ID": 9,
    "c1Name": "starknet",
    "c2Name": "loopring",
    "t1Address": "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0,
    "c1GasFee": 3.5,
    "c2GasFee": 0,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 3,
    "c2MinPrice": 0,
    "c2MaxPrice": 0,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "4-12/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 4,
    "c2ID": 12,
    "c1Name": "starknet",
    "c2Name": "zkspace",
    "t1Address": "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0,
    "c1GasFee": 3.5,
    "c2GasFee": 0,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 0.1,
    "c2MinPrice": 0,
    "c2MaxPrice": 0,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "4-13/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 4,
    "c2ID": 13,
    "c1Name": "starknet",
    "c2Name": "boba",
    "t1Address": "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0,
    "c1GasFee": 3.5,
    "c2GasFee": 0,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 0.1,
    "c2MinPrice": 0,
    "c2MaxPrice": 0,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "4-14/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 4,
    "c2ID": 14,
    "c1Name": "starknet",
    "c2Name": "zksync2",
    "t1Address": "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0014,
    "c2TradingFee": 0.0015,
    "c1GasFee": 0,
    "c2GasFee": 0.3,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 10,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "4-15/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 4,
    "c2ID": 15,
    "c1Name": "starknet",
    "c2Name": "bnbchain",
    "t1Address": "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
    "t2Address": "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
    "precision": 18,
    "c1TradingFee": 0.0013,
    "c2TradingFee": 0.0013,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 10,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "4-16/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 4,
    "c2ID": 16,
    "c1Name": "starknet",
    "c2Name": "arbitrum_nova",
    "t1Address": "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0013,
    "c2TradingFee": 0.0013,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "4-17/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 4,
    "c2ID": 17,
    "c1Name": "starknet",
    "c2Name": "polygon_evm",
    "t1Address": "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0013,
    "c2TradingFee": 0.0013,
    "c1GasFee": 0,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "4-19/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 4,
    "c2ID": 19,
    "c1Name": "starknet",
    "c2Name": "scroll",
    "t1Address": "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0014,
    "c2TradingFee": 0.0015,
    "c1GasFee": 0,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "4-21/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 4,
    "c2ID": 21,
    "c1Name": "starknet",
    "c2Name": "base",
    "t1Address": "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0013,
    "c2TradingFee": 0.0013,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "4-23/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 4,
    "c2ID": 23,
    "c1Name": "starknet",
    "c2Name": "linea",
    "t1Address": "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "4-24/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 4,
    "c2ID": 24,
    "c1Name": "starknet",
    "c2Name": "mantle",
    "t1Address": "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
    "t2Address": "0xdeaddeaddeaddeaddeaddeaddeaddeaddead1111",
    "precision": 18,
    "c1TradingFee": 0.0013,
    "c2TradingFee": 0.0013,
    "c1GasFee": 0,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "4-25/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 4,
    "c2ID": 25,
    "c1Name": "starknet",
    "c2Name": "opbnb",
    "t1Address": "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
    "t2Address": "0xe7798f023fc62146e8aa1b36da45fb70855a77ea",
    "precision": 18,
    "c1TradingFee": 0.0012,
    "c2TradingFee": 0.0014,
    "c1GasFee": 0.5,
    "c2GasFee": 2,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "4-30/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 4,
    "c2ID": 30,
    "c1Name": "starknet",
    "c2Name": "zora",
    "t1Address": "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0013,
    "c2TradingFee": 0.0013,
    "c1GasFee": 0,
    "c2GasFee": 1,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "4-31/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 4,
    "c2ID": 31,
    "c1Name": "starknet",
    "c2Name": "manta",
    "t1Address": "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0013,
    "c2TradingFee": 0.001,
    "c1GasFee": 0,
    "c2GasFee": 1.5,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "4-36/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 4,
    "c2ID": 36,
    "c1Name": "starknet",
    "c2Name": "kroma",
    "t1Address": "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 3,
    "c2MinPrice": 0,
    "c2MaxPrice": 0,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "4-38/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 4,
    "c2ID": 38,
    "c1Name": "starknet",
    "c2Name": "zkfair",
    "t1Address": "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
    "t2Address": "0x4b21b980d0dc7d3c0c6175b0a412694f3a1c7c6b",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0.5,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "6-7/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 6,
    "c2ID": 7,
    "c1Name": "polygon",
    "c2Name": "optimism",
    "t1Address": "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0013,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0.15,
    "c2GasFee": 0.1,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 10,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 10,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "6-8/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 6,
    "c2ID": 8,
    "c1Name": "polygon",
    "c2Name": "immutableX",
    "t1Address": "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0.2,
    "c2GasFee": 0.2,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "6-9/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 6,
    "c2ID": 9,
    "c1Name": "polygon",
    "c2Name": "loopring",
    "t1Address": "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0.15,
    "c2GasFee": 0.15,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 10,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 10,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "6-12/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 6,
    "c2ID": 12,
    "c1Name": "polygon",
    "c2Name": "zkspace",
    "t1Address": "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0.2,
    "c2GasFee": 0.2,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "6-13/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 6,
    "c2ID": 13,
    "c1Name": "polygon",
    "c2Name": "boba",
    "t1Address": "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0.2,
    "c2GasFee": 1,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "6-14/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 6,
    "c2ID": 14,
    "c1Name": "polygon",
    "c2Name": "zksync2",
    "t1Address": "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0016,
    "c2TradingFee": 0.0009,
    "c1GasFee": 0,
    "c2GasFee": 1,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 10,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "6-15/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 6,
    "c2ID": 15,
    "c1Name": "polygon",
    "c2Name": "bnbchain",
    "t1Address": "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
    "t2Address": "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 10,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 10,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "6-16/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 6,
    "c2ID": 16,
    "c1Name": "polygon",
    "c2Name": "arbitrum_nova",
    "t1Address": "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0,
    "c2GasFee": 6,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "6-17/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 6,
    "c2ID": 17,
    "c1Name": "polygon",
    "c2Name": "polygon_evm",
    "t1Address": "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "6-19/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 6,
    "c2ID": 19,
    "c1Name": "polygon",
    "c2Name": "scroll",
    "t1Address": "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0012,
    "c2TradingFee": 0.0013,
    "c1GasFee": 0,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "6-21/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 6,
    "c2ID": 21,
    "c1Name": "polygon",
    "c2Name": "base",
    "t1Address": "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.001,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "6-23/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 6,
    "c2ID": 23,
    "c1Name": "polygon",
    "c2Name": "linea",
    "t1Address": "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "6-24/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 6,
    "c2ID": 24,
    "c1Name": "polygon",
    "c2Name": "mantle",
    "t1Address": "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
    "t2Address": "0xdeaddeaddeaddeaddeaddeaddeaddeaddead1111",
    "precision": 18,
    "c1TradingFee": 0.0015,
    "c2TradingFee": 0.0015,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "6-25/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 6,
    "c2ID": 25,
    "c1Name": "polygon",
    "c2Name": "opbnb",
    "t1Address": "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
    "t2Address": "0xe7798f023fc62146e8aa1b36da45fb70855a77ea",
    "precision": 18,
    "c1TradingFee": 0.0011,
    "c2TradingFee": 0.0013,
    "c1GasFee": 0,
    "c2GasFee": 2,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "6-30/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 6,
    "c2ID": 30,
    "c1Name": "polygon",
    "c2Name": "zora",
    "t1Address": "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.0015,
    "c1GasFee": 0,
    "c2GasFee": 10,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "6-31/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 6,
    "c2ID": 31,
    "c1Name": "polygon",
    "c2Name": "manta",
    "t1Address": "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.001,
    "c1GasFee": 0,
    "c2GasFee": 1.5,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "6-36/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 6,
    "c2ID": 36,
    "c1Name": "polygon",
    "c2Name": "kroma",
    "t1Address": "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 3,
    "c2MinPrice": 0,
    "c2MaxPrice": 0,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "6-38/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 6,
    "c2ID": 38,
    "c1Name": "polygon",
    "c2Name": "zkfair",
    "t1Address": "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
    "t2Address": "0x4b21b980d0dc7d3c0c6175b0a412694f3a1c7c6b",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0.5,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "7-8/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 7,
    "c2ID": 8,
    "c1Name": "optimism",
    "c2Name": "immutableX",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0.0015,
    "c1GasFee": 0.1,
    "c2GasFee": 0.2,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "7-9/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 7,
    "c2ID": 9,
    "c1Name": "optimism",
    "c2Name": "loopring",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0.0016,
    "c1GasFee": 0.1,
    "c2GasFee": 0.15,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 10,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 10,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "7-12/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 7,
    "c2ID": 12,
    "c1Name": "optimism",
    "c2Name": "zkspace",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0.0015,
    "c1GasFee": 0.1,
    "c2GasFee": 0.2,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "7-13/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 7,
    "c2ID": 13,
    "c1Name": "optimism",
    "c2Name": "boba",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.0015,
    "c1GasFee": 0.1,
    "c2GasFee": 1,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "7-14/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 7,
    "c2ID": 14,
    "c1Name": "optimism",
    "c2Name": "zksync2",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0016,
    "c2TradingFee": 0.0017,
    "c1GasFee": 0,
    "c2GasFee": 1,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 10,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "7-15/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 7,
    "c2ID": 15,
    "c1Name": "optimism",
    "c2Name": "bnbchain",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0.0013,
    "c1GasFee": 0.1,
    "c2GasFee": 0,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 10,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 10,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "7-16/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 7,
    "c2ID": 16,
    "c1Name": "optimism",
    "c2Name": "arbitrum_nova",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.001,
    "c1GasFee": 0.1,
    "c2GasFee": 6,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "7-17/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 7,
    "c2ID": 17,
    "c1Name": "optimism",
    "c2Name": "polygon_evm",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.0018,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "7-19/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 7,
    "c2ID": 19,
    "c1Name": "optimism",
    "c2Name": "scroll",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0012,
    "c2TradingFee": 0.0013,
    "c1GasFee": 0,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "7-21/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 7,
    "c2ID": 21,
    "c1Name": "optimism",
    "c2Name": "base",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.001,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "7-23/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 7,
    "c2ID": 23,
    "c1Name": "optimism",
    "c2Name": "linea",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "7-24/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 7,
    "c2ID": 24,
    "c1Name": "optimism",
    "c2Name": "mantle",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0xdeaddeaddeaddeaddeaddeaddeaddeaddead1111",
    "precision": 18,
    "c1TradingFee": 0.0015,
    "c2TradingFee": 0.0015,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "7-25/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 7,
    "c2ID": 25,
    "c1Name": "optimism",
    "c2Name": "opbnb",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0xe7798f023fc62146e8aa1b36da45fb70855a77ea",
    "precision": 18,
    "c1TradingFee": 0.0011,
    "c2TradingFee": 0.0012,
    "c1GasFee": 0,
    "c2GasFee": 2,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "7-30/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 7,
    "c2ID": 30,
    "c1Name": "optimism",
    "c2Name": "zora",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.0015,
    "c1GasFee": 0,
    "c2GasFee": 10,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "7-31/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 7,
    "c2ID": 31,
    "c1Name": "optimism",
    "c2Name": "manta",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.001,
    "c1GasFee": 0,
    "c2GasFee": 1.5,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "7-36/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 7,
    "c2ID": 36,
    "c1Name": "optimism",
    "c2Name": "kroma",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 3,
    "c2MinPrice": 0,
    "c2MaxPrice": 0,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "7-38/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 7,
    "c2ID": 38,
    "c1Name": "optimism",
    "c2Name": "zkfair",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x4b21b980d0dc7d3c0c6175b0a412694f3a1c7c6b",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0.5,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "7-41/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 7,
    "c2ID": 41,
    "c1Name": "optimism",
    "c2Name": "zeta",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0xd97b1de3619ed2c6beb3860147e30ca8a7dc9891",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0005,
    "c1GasFee": 0,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 1,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 1,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "7-47/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 7,
    "c2ID": 47,
    "c1Name": "optimism",
    "c2Name": "mode",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0008,
    "c2TradingFee": 0.001,
    "c1GasFee": 0,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "8-9/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 8,
    "c2ID": 9,
    "c1Name": "immutableX",
    "c2Name": "loopring",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0.2,
    "c2GasFee": 0.2,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "8-12/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 8,
    "c2ID": 12,
    "c1Name": "immutableX",
    "c2Name": "zkspace",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0.0006,
    "c1GasFee": 0.2,
    "c2GasFee": 0.2,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "8-13/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 8,
    "c2ID": 13,
    "c1Name": "immutableX",
    "c2Name": "boba",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.0006,
    "c1GasFee": 0.2,
    "c2GasFee": 1,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "8-14/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 8,
    "c2ID": 14,
    "c1Name": "immutableX",
    "c2Name": "zksync2",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0018,
    "c2TradingFee": 0.0009,
    "c1GasFee": 0,
    "c2GasFee": 1,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 10,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "8-15/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 8,
    "c2ID": 15,
    "c1Name": "immutableX",
    "c2Name": "bnbchain",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0.0005,
    "c1GasFee": 0.2,
    "c2GasFee": 0,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "8-16/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 8,
    "c2ID": 16,
    "c1Name": "immutableX",
    "c2Name": "arbitrum_nova",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0005,
    "c1GasFee": 0,
    "c2GasFee": 6,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "8-17/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 8,
    "c2ID": 17,
    "c1Name": "immutableX",
    "c2Name": "polygon_evm",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.001,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "9-12/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 9,
    "c2ID": 12,
    "c1Name": "loopring",
    "c2Name": "zkspace",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0.0006,
    "c1GasFee": 0.2,
    "c2GasFee": 0.2,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "9-13/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 9,
    "c2ID": 13,
    "c1Name": "loopring",
    "c2Name": "boba",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.0006,
    "c1GasFee": 0.2,
    "c2GasFee": 1,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "9-14/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 9,
    "c2ID": 14,
    "c1Name": "loopring",
    "c2Name": "zksync2",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0018,
    "c2TradingFee": 0.0009,
    "c1GasFee": 0,
    "c2GasFee": 1,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 10,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "9-15/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 9,
    "c2ID": 15,
    "c1Name": "loopring",
    "c2Name": "bnbchain",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0.0006,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "9-16/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 9,
    "c2ID": 16,
    "c1Name": "loopring",
    "c2Name": "arbitrum_nova",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0005,
    "c1GasFee": 0,
    "c2GasFee": 6,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "9-17/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 9,
    "c2ID": 17,
    "c1Name": "loopring",
    "c2Name": "polygon_evm",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.001,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "12-13/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 12,
    "c2ID": 13,
    "c1Name": "zkspace",
    "c2Name": "boba",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0.2,
    "c2GasFee": 1,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "12-15/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 12,
    "c2ID": 15,
    "c1Name": "zkspace",
    "c2Name": "bnbchain",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0.0008,
    "c1GasFee": 1,
    "c2GasFee": 0,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "12-16/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 12,
    "c2ID": 16,
    "c1Name": "zkspace",
    "c2Name": "arbitrum_nova",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0008,
    "c1GasFee": 0,
    "c2GasFee": 6,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 1,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 1,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "13-15/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 13,
    "c2ID": 15,
    "c1Name": "boba",
    "c2Name": "bnbchain",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0.0008,
    "c1GasFee": 1,
    "c2GasFee": 0,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "13-16/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 13,
    "c2ID": 16,
    "c1Name": "boba",
    "c2Name": "arbitrum_nova",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0008,
    "c1GasFee": 0,
    "c2GasFee": 6,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 1,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 1,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "14-15/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 14,
    "c2ID": 15,
    "c1Name": "zksync2",
    "c2Name": "bnbchain",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
    "precision": 18,
    "c1TradingFee": 0.0013,
    "c2TradingFee": 0.0018,
    "c1GasFee": 1,
    "c2GasFee": 0,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 10,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "14-16/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 14,
    "c2ID": 16,
    "c1Name": "zksync2",
    "c2Name": "arbitrum_nova",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0008,
    "c2TradingFee": 0.0018,
    "c1GasFee": 1,
    "c2GasFee": 0,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 10,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "14-17/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 14,
    "c2ID": 17,
    "c1Name": "zksync2",
    "c2Name": "polygon_evm",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0013,
    "c2TradingFee": 0.0016,
    "c1GasFee": 1,
    "c2GasFee": 0,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "14-19/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 14,
    "c2ID": 19,
    "c1Name": "zksync2",
    "c2Name": "scroll",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0015,
    "c2TradingFee": 0.0015,
    "c1GasFee": 0,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "14-21/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 14,
    "c2ID": 21,
    "c1Name": "zksync2",
    "c2Name": "base",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.001,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "14-23/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 14,
    "c2ID": 23,
    "c1Name": "zksync2",
    "c2Name": "linea",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "14-24/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 14,
    "c2ID": 24,
    "c1Name": "zksync2",
    "c2Name": "mantle",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0xdeaddeaddeaddeaddeaddeaddeaddeaddead1111",
    "precision": 18,
    "c1TradingFee": 0.0015,
    "c2TradingFee": 0.0015,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "14-25/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 14,
    "c2ID": 25,
    "c1Name": "zksync2",
    "c2Name": "opbnb",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0xe7798f023fc62146e8aa1b36da45fb70855a77ea",
    "precision": 18,
    "c1TradingFee": 0.0012,
    "c2TradingFee": 0.0014,
    "c1GasFee": 0,
    "c2GasFee": 2,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "14-30/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 14,
    "c2ID": 30,
    "c1Name": "zksync2",
    "c2Name": "zora",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.0015,
    "c1GasFee": 0,
    "c2GasFee": 10,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "14-31/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 14,
    "c2ID": 31,
    "c1Name": "zksync2",
    "c2Name": "manta",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.001,
    "c1GasFee": 0,
    "c2GasFee": 1.5,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "14-36/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 14,
    "c2ID": 36,
    "c1Name": "zksync2",
    "c2Name": "kroma",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 3,
    "c2MinPrice": 0,
    "c2MaxPrice": 0,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "14-38/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 14,
    "c2ID": 38,
    "c1Name": "zksync2",
    "c2Name": "zkfair",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x4b21b980d0dc7d3c0c6175b0a412694f3a1c7c6b",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0.5,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "14-41/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 14,
    "c2ID": 41,
    "c1Name": "zksync2",
    "c2Name": "zeta",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0xd97b1de3619ed2c6beb3860147e30ca8a7dc9891",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0005,
    "c1GasFee": 0,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 1,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 1,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "14-47/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 14,
    "c2ID": 47,
    "c1Name": "zksync2",
    "c2Name": "mode",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0008,
    "c2TradingFee": 0.001,
    "c1GasFee": 0,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "15-16/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 15,
    "c2ID": 16,
    "c1Name": "bnbchain",
    "c2Name": "arbitrum_nova",
    "t1Address": "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0,
    "c2GasFee": 6,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "15-17/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 15,
    "c2ID": 17,
    "c1Name": "bnbchain",
    "c2Name": "polygon_evm",
    "t1Address": "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.0008,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "15-19/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 15,
    "c2ID": 19,
    "c1Name": "bnbchain",
    "c2Name": "scroll",
    "t1Address": "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0013,
    "c2TradingFee": 0.0013,
    "c1GasFee": 0,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "15-21/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 15,
    "c2ID": 21,
    "c1Name": "bnbchain",
    "c2Name": "base",
    "t1Address": "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.001,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "15-23/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 15,
    "c2ID": 23,
    "c1Name": "bnbchain",
    "c2Name": "linea",
    "t1Address": "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "15-24/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 15,
    "c2ID": 24,
    "c1Name": "bnbchain",
    "c2Name": "mantle",
    "t1Address": "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
    "t2Address": "0xdeaddeaddeaddeaddeaddeaddeaddeaddead1111",
    "precision": 18,
    "c1TradingFee": 0.0015,
    "c2TradingFee": 0.0015,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "15-25/BNB",
    "tName": "BNB",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 15,
    "c2ID": 25,
    "c1Name": "bnbchain",
    "c2Name": "opbnb",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0035,
    "c2TradingFee": 0.009,
    "c1GasFee": 0,
    "c2GasFee": 8,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 10,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "15-25/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 15,
    "c2ID": 25,
    "c1Name": "bnbchain",
    "c2Name": "opbnb",
    "t1Address": "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
    "t2Address": "0xe7798f023fc62146e8aa1b36da45fb70855a77ea",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0012,
    "c1GasFee": 0,
    "c2GasFee": 2,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "15-30/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 15,
    "c2ID": 30,
    "c1Name": "bnbchain",
    "c2Name": "zora",
    "t1Address": "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.0015,
    "c1GasFee": 0,
    "c2GasFee": 10,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "15-31/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 15,
    "c2ID": 31,
    "c1Name": "bnbchain",
    "c2Name": "manta",
    "t1Address": "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.001,
    "c1GasFee": 0,
    "c2GasFee": 1.5,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "15-36/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 15,
    "c2ID": 36,
    "c1Name": "bnbchain",
    "c2Name": "kroma",
    "t1Address": "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 3,
    "c2MinPrice": 0,
    "c2MaxPrice": 0,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "15-38/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 15,
    "c2ID": 38,
    "c1Name": "bnbchain",
    "c2Name": "zkfair",
    "t1Address": "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
    "t2Address": "0x4b21b980d0dc7d3c0c6175b0a412694f3a1c7c6b",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0.5,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "16-17/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 16,
    "c2ID": 17,
    "c1Name": "arbitrum_nova",
    "c2Name": "polygon_evm",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.0008,
    "c1GasFee": 0.3,
    "c2GasFee": 0,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "16-19/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 16,
    "c2ID": 19,
    "c1Name": "arbitrum_nova",
    "c2Name": "scroll",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0013,
    "c2TradingFee": 0.0013,
    "c1GasFee": 0,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "16-21/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 16,
    "c2ID": 21,
    "c1Name": "arbitrum_nova",
    "c2Name": "base",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.001,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "16-23/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 16,
    "c2ID": 23,
    "c1Name": "arbitrum_nova",
    "c2Name": "linea",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "16-24/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 16,
    "c2ID": 24,
    "c1Name": "arbitrum_nova",
    "c2Name": "mantle",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0xdeaddeaddeaddeaddeaddeaddeaddeaddead1111",
    "precision": 18,
    "c1TradingFee": 0.0015,
    "c2TradingFee": 0.0015,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "16-25/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 16,
    "c2ID": 25,
    "c1Name": "arbitrum_nova",
    "c2Name": "opbnb",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0xe7798f023fc62146e8aa1b36da45fb70855a77ea",
    "precision": 18,
    "c1TradingFee": 0.0011,
    "c2TradingFee": 0.0012,
    "c1GasFee": 0.5,
    "c2GasFee": 2,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "16-30/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 16,
    "c2ID": 30,
    "c1Name": "arbitrum_nova",
    "c2Name": "zora",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.0015,
    "c1GasFee": 0,
    "c2GasFee": 10,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "16-31/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 16,
    "c2ID": 31,
    "c1Name": "arbitrum_nova",
    "c2Name": "manta",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.001,
    "c1GasFee": 0,
    "c2GasFee": 1.5,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "16-36/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 16,
    "c2ID": 36,
    "c1Name": "arbitrum_nova",
    "c2Name": "kroma",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 3,
    "c2MinPrice": 0,
    "c2MaxPrice": 0,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "16-38/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 16,
    "c2ID": 38,
    "c1Name": "arbitrum_nova",
    "c2Name": "zkfair",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x4b21b980d0dc7d3c0c6175b0a412694f3a1c7c6b",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0.5,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "17-19/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 17,
    "c2ID": 19,
    "c1Name": "polygon_evm",
    "c2Name": "scroll",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0013,
    "c2TradingFee": 0.0013,
    "c1GasFee": 0,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "17-21/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 17,
    "c2ID": 21,
    "c1Name": "polygon_evm",
    "c2Name": "base",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.001,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "17-23/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 17,
    "c2ID": 23,
    "c1Name": "polygon_evm",
    "c2Name": "linea",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "17-24/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 17,
    "c2ID": 24,
    "c1Name": "polygon_evm",
    "c2Name": "mantle",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0xdeaddeaddeaddeaddeaddeaddeaddeaddead1111",
    "precision": 18,
    "c1TradingFee": 0.0015,
    "c2TradingFee": 0.0015,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "17-25/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 17,
    "c2ID": 25,
    "c1Name": "polygon_evm",
    "c2Name": "opbnb",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0xe7798f023fc62146e8aa1b36da45fb70855a77ea",
    "precision": 18,
    "c1TradingFee": 0.0011,
    "c2TradingFee": 0.0013,
    "c1GasFee": 0.5,
    "c2GasFee": 2,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "17-30/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 17,
    "c2ID": 30,
    "c1Name": "polygon_evm",
    "c2Name": "zora",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.0015,
    "c1GasFee": 0,
    "c2GasFee": 10,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "17-31/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 17,
    "c2ID": 31,
    "c1Name": "polygon_evm",
    "c2Name": "manta",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.001,
    "c1GasFee": 0,
    "c2GasFee": 1.5,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "17-36/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 17,
    "c2ID": 36,
    "c1Name": "polygon_evm",
    "c2Name": "kroma",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 3,
    "c2MinPrice": 0,
    "c2MaxPrice": 0,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "17-38/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 17,
    "c2ID": 38,
    "c1Name": "polygon_evm",
    "c2Name": "zkfair",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x4b21b980d0dc7d3c0c6175b0a412694f3a1c7c6b",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0.5,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "17-41/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 17,
    "c2ID": 41,
    "c1Name": "polygon_evm",
    "c2Name": "zeta",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0xd97b1de3619ed2c6beb3860147e30ca8a7dc9891",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0005,
    "c1GasFee": 0,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 1,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 1,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "17-47/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 17,
    "c2ID": 47,
    "c1Name": "polygon_evm",
    "c2Name": "mode",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0008,
    "c2TradingFee": 0.001,
    "c1GasFee": 0,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "19-21/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 19,
    "c2ID": 21,
    "c1Name": "scroll",
    "c2Name": "base",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0013,
    "c2TradingFee": 0.0013,
    "c1GasFee": 0.5,
    "c2GasFee": 0,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "19-23/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 19,
    "c2ID": 23,
    "c1Name": "scroll",
    "c2Name": "linea",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "19-24/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 19,
    "c2ID": 24,
    "c1Name": "scroll",
    "c2Name": "mantle",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0xdeaddeaddeaddeaddeaddeaddeaddeaddead1111",
    "precision": 18,
    "c1TradingFee": 0.0013,
    "c2TradingFee": 0.0013,
    "c1GasFee": 0.5,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "19-25/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 19,
    "c2ID": 25,
    "c1Name": "scroll",
    "c2Name": "opbnb",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0xe7798f023fc62146e8aa1b36da45fb70855a77ea",
    "precision": 18,
    "c1TradingFee": 0.0011,
    "c2TradingFee": 0.0013,
    "c1GasFee": 0.5,
    "c2GasFee": 2,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "19-30/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 19,
    "c2ID": 30,
    "c1Name": "scroll",
    "c2Name": "zora",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0013,
    "c2TradingFee": 0.0013,
    "c1GasFee": 0.5,
    "c2GasFee": 1,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "19-31/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 19,
    "c2ID": 31,
    "c1Name": "scroll",
    "c2Name": "manta",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0013,
    "c2TradingFee": 0.001,
    "c1GasFee": 0.5,
    "c2GasFee": 1.5,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "19-36/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 19,
    "c2ID": 36,
    "c1Name": "scroll",
    "c2Name": "kroma",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 3,
    "c2MinPrice": 0,
    "c2MaxPrice": 0,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "19-38/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 19,
    "c2ID": 38,
    "c1Name": "scroll",
    "c2Name": "zkfair",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x4b21b980d0dc7d3c0c6175b0a412694f3a1c7c6b",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0.5,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "19-41/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 19,
    "c2ID": 41,
    "c1Name": "scroll",
    "c2Name": "zeta",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0xd97b1de3619ed2c6beb3860147e30ca8a7dc9891",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0005,
    "c1GasFee": 0,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 1,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 1,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "19-47/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 19,
    "c2ID": 47,
    "c1Name": "scroll",
    "c2Name": "mode",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0008,
    "c2TradingFee": 0.001,
    "c1GasFee": 0,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "21-23/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 21,
    "c2ID": 23,
    "c1Name": "base",
    "c2Name": "linea",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 2,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "21-24/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 21,
    "c2ID": 24,
    "c1Name": "base",
    "c2Name": "mantle",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0xdeaddeaddeaddeaddeaddeaddeaddeaddead1111",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.001,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 2,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "21-25/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 21,
    "c2ID": 25,
    "c1Name": "base",
    "c2Name": "opbnb",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0xe7798f023fc62146e8aa1b36da45fb70855a77ea",
    "precision": 18,
    "c1TradingFee": 0.0011,
    "c2TradingFee": 0.0013,
    "c1GasFee": 0,
    "c2GasFee": 2,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "21-30/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 21,
    "c2ID": 30,
    "c1Name": "base",
    "c2Name": "zora",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.0015,
    "c1GasFee": 0,
    "c2GasFee": 10,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "21-31/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 21,
    "c2ID": 31,
    "c1Name": "base",
    "c2Name": "manta",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.001,
    "c1GasFee": 0,
    "c2GasFee": 1.5,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "21-36/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 21,
    "c2ID": 36,
    "c1Name": "base",
    "c2Name": "kroma",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 3,
    "c2MinPrice": 0,
    "c2MaxPrice": 0,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "21-38/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 21,
    "c2ID": 38,
    "c1Name": "base",
    "c2Name": "zkfair",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x4b21b980d0dc7d3c0c6175b0a412694f3a1c7c6b",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0.5,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "21-41/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 21,
    "c2ID": 41,
    "c1Name": "base",
    "c2Name": "zeta",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0xd97b1de3619ed2c6beb3860147e30ca8a7dc9891",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0005,
    "c1GasFee": 0,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 1,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 1,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "21-47/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 21,
    "c2ID": 47,
    "c1Name": "base",
    "c2Name": "mode",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0008,
    "c2TradingFee": 0.001,
    "c1GasFee": 0,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "23-24/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 23,
    "c2ID": 24,
    "c1Name": "linea",
    "c2Name": "mantle",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0xdeaddeaddeaddeaddeaddeaddeaddeaddead1111",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0.0005,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 2,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "23-25/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 23,
    "c2ID": 25,
    "c1Name": "linea",
    "c2Name": "opbnb",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0xe7798f023fc62146e8aa1b36da45fb70855a77ea",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0.0005,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 2,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "23-30/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 23,
    "c2ID": 30,
    "c1Name": "linea",
    "c2Name": "zora",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0.0005,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 2,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "23-31/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 23,
    "c2ID": 31,
    "c1Name": "linea",
    "c2Name": "manta",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0.001,
    "c1GasFee": 0,
    "c2GasFee": 1.5,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 2,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "23-36/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 23,
    "c2ID": 36,
    "c1Name": "linea",
    "c2Name": "kroma",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 3,
    "c2MinPrice": 0,
    "c2MaxPrice": 0,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "23-38/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 23,
    "c2ID": 38,
    "c1Name": "linea",
    "c2Name": "zkfair",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x4b21b980d0dc7d3c0c6175b0a412694f3a1c7c6b",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0.5,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "23-41/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 23,
    "c2ID": 41,
    "c1Name": "linea",
    "c2Name": "zeta",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0xd97b1de3619ed2c6beb3860147e30ca8a7dc9891",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0005,
    "c1GasFee": 0,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 1,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 1,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "23-47/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 23,
    "c2ID": 47,
    "c1Name": "linea",
    "c2Name": "mode",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0008,
    "c2TradingFee": 0.001,
    "c1GasFee": 0,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "24-25/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 24,
    "c2ID": 25,
    "c1Name": "mantle",
    "c2Name": "opbnb",
    "t1Address": "0xdeaddeaddeaddeaddeaddeaddeaddeaddead1111",
    "t2Address": "0xe7798f023fc62146e8aa1b36da45fb70855a77ea",
    "precision": 18,
    "c1TradingFee": 0.0011,
    "c2TradingFee": 0.0013,
    "c1GasFee": 0.5,
    "c2GasFee": 2,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "24-30/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 24,
    "c2ID": 30,
    "c1Name": "mantle",
    "c2Name": "zora",
    "t1Address": "0xdeaddeaddeaddeaddeaddeaddeaddeaddead1111",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.0015,
    "c1GasFee": 0,
    "c2GasFee": 10,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "24-31/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 24,
    "c2ID": 31,
    "c1Name": "mantle",
    "c2Name": "manta",
    "t1Address": "0xdeaddeaddeaddeaddeaddeaddeaddeaddead1111",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.001,
    "c1GasFee": 0,
    "c2GasFee": 1.5,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "24-36/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 24,
    "c2ID": 36,
    "c1Name": "mantle",
    "c2Name": "kroma",
    "t1Address": "0xdeaddeaddeaddeaddeaddeaddeaddeaddead1111",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 3,
    "c2MinPrice": 0,
    "c2MaxPrice": 0,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "24-38/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 24,
    "c2ID": 38,
    "c1Name": "mantle",
    "c2Name": "zkfair",
    "t1Address": "0xdeaddeaddeaddeaddeaddeaddeaddeaddead1111",
    "t2Address": "0x4b21b980d0dc7d3c0c6175b0a412694f3a1c7c6b",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0007,
    "c1GasFee": 0.5,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "25-30/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 25,
    "c2ID": 30,
    "c1Name": "opbnb",
    "c2Name": "zora",
    "t1Address": "0xe7798f023fc62146e8aa1b36da45fb70855a77ea",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0013,
    "c2TradingFee": 0.0011,
    "c1GasFee": 2,
    "c2GasFee": 1,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 2,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "25-31/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 25,
    "c2ID": 31,
    "c1Name": "opbnb",
    "c2Name": "manta",
    "t1Address": "0xe7798f023fc62146e8aa1b36da45fb70855a77ea",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0013,
    "c2TradingFee": 0.001,
    "c1GasFee": 0,
    "c2GasFee": 1.5,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 2,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "30-31/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 30,
    "c2ID": 31,
    "c1Name": "zora",
    "c2Name": "manta",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.001,
    "c1GasFee": 0,
    "c2GasFee": 1.5,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 2,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "30-36/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 30,
    "c2ID": 36,
    "c1Name": "zora",
    "c2Name": "kroma",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 3,
    "c2MinPrice": 0,
    "c2MaxPrice": 0,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "30-38/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 30,
    "c2ID": 38,
    "c1Name": "zora",
    "c2Name": "zkfair",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x4b21b980d0dc7d3c0c6175b0a412694f3a1c7c6b",
    "precision": 18,
    "c1TradingFee": 0.0005,
    "c2TradingFee": 0.0007,
    "c1GasFee": 1,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "31-36/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 31,
    "c2ID": 36,
    "c1Name": "manta",
    "c2Name": "kroma",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0,
    "c1GasFee": 0,
    "c2GasFee": 0,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 3,
    "c2MinPrice": 0,
    "c2MaxPrice": 0,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "31-38/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 31,
    "c2ID": 38,
    "c1Name": "manta",
    "c2Name": "zkfair",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0x4b21b980d0dc7d3c0c6175b0a412694f3a1c7c6b",
    "precision": 18,
    "c1TradingFee": 0.001,
    "c2TradingFee": 0.0007,
    "c1GasFee": 1.5,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 2,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
  {
    "id": "41-47/ETH",
    "tName": "ETH",
    "makerAddress": "0xe4edb277e41dc89ab076a1f049f4a3efa700bce8",
    "c1ID": 41,
    "c2ID": 47,
    "c1Name": "zeta",
    "c2Name": "mode",
    "t1Address": "0xd97b1de3619ed2c6beb3860147e30ca8a7dc9891",
    "t2Address": "0x0000000000000000000000000000000000000000",
    "precision": 18,
    "c1TradingFee": 0.0008,
    "c2TradingFee": 0.001,
    "c1GasFee": 0,
    "c2GasFee": 0.5,
    "c1MinPrice": 0.00005,
    "c1MaxPrice": 3,
    "c2MinPrice": 0.00005,
    "c2MaxPrice": 3,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  }
]);

initMakerList.push(...[
  {
    "id": "1-9/USDC",
    "tName": "USDC",
    "makerAddress": "0x41d3d33156ae7c62c094aae2995003ae63f587b3",
    "c1ID": 1,
    "c2ID": 9,
    "c1Name": "mainnet",
    "c2Name": "loopring",
    "t1Address": "0x0000000000000000000000000000000000000000",
    "t2Address": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    "precision": 18,
    "c1TradingFee": 0.0007,
    "c2TradingFee": 0.0058,
    "c1GasFee": 0.15,
    "c2GasFee": 0.3,
    "c1MinPrice": 0.001,
    "c1MaxPrice": 5,
    "c2MinPrice": 0.001,
    "c2MaxPrice": 5,
    "c1AvalibleDeposit": 1000,
    "c2AvalibleDeposit": 1000,
    "c1AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ],
    "c2AvalibleTimes": [
      {
        "startTime": 0,
        "endTime": 99999999999999
      }
    ]
  },
])

const list1 = cloneDeep(initMakerList).filter(row=> row.c2ID == 14 && row.makerAddress && row.makerAddress.toLowerCase() === '0x80c67432656d59144ceff962e8faf8926599bcf8');

const listE4e = cloneDeep(initMakerList).filter(row => row.makerAddress && row.makerAddress.toLowerCase() === '0x80c67432656d59144ceff962e8faf8926599bcf8').map(row => {
  row.makerAddress = '0xe4edb277e41dc89ab076a1f049f4a3efa700bce8';
  return row;
});

const push1List = cloneDeep(list1).map(row=> {
  row.makerAddress = '0xee73323912a4e3772b74ed0ca1595a152b0ef282';
  return row;
})
const push2List = cloneDeep(list1).map(row=> {
  row.makerAddress = '0x0a88bc5c32b684d467b43c06d9e0899efeaf59df';
  return row;
})

const allMakerList:any[] = [...initMakerList, ...listE4e, ...push1List, ...push2List]

const filterMakerList:any[] = [];

for (const data of allMakerList) {
  if (data?.makerAddress && !filterMakerList.find(item =>
    item.makerAddress.toLowerCase() === data.makerAddress.toLowerCase() &&
    (Number(item.c1ID) === Number(data.c1ID) && item.t1Address.toLowerCase() === data.t1Address.toLowerCase() &&
      Number(item.c2ID) === Number(data.c2ID) && item.t2Address.toLowerCase() === data.t2Address.toLowerCase()) ||
    (Number(item.c1ID) === Number(data.c2ID) && item.t1Address.toLowerCase() === data.t2Address.toLowerCase() &&
      Number(item.c2ID) === Number(data.c1ID) && item.t2Address.toLowerCase() === data.t1Address.toLowerCase())
  )) {
    data.makerAddress = data.makerAddress.toLowerCase();
    data.t1Address = data.t1Address.toLowerCase();
    data.t2Address = data.t2Address.toLowerCase();
    filterMakerList.push(data);
  }
}

export const makerList = filterMakerList;
