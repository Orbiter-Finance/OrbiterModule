import { sha3 } from 'web3-utils'
import AbiCoder from 'web3-eth-abi'
import BigNumber from 'bignumber.js'
export const DEFAULT_ABI = [
  {
    constant: true,
    inputs: [],
    name: 'name',
    outputs: [
      {
        name: '',
        type: 'string',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_spender',
        type: 'address',
      },
      {
        name: '_value',
        type: 'uint256',
      },
    ],
    name: 'approve',
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'totalSupply',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_from',
        type: 'address',
      },
      {
        name: '_to',
        type: 'address',
      },
      {
        name: '_value',
        type: 'uint256',
      },
    ],
    name: 'transferFrom',
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'decimals',
    outputs: [
      {
        name: '',
        type: 'uint8',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: '_owner',
        type: 'address',
      },
    ],
    name: 'balanceOf',
    outputs: [
      {
        name: 'balance',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'symbol',
    outputs: [
      {
        name: '',
        type: 'string',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_to',
        type: 'address',
      },
      {
        name: '_value',
        type: 'uint256',
      },
    ],
    name: 'transfer',
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: '_owner',
        type: 'address',
      },
      {
        name: '_spender',
        type: 'address',
      },
    ],
    name: 'allowance',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    payable: true,
    stateMutability: 'payable',
    type: 'fallback',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        name: 'spender',
        type: 'address',
      },
      {
        indexed: false,
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
        name: 'from',
        type: 'address',
      },
      {
        indexed: true,
        name: 'to',
        type: 'address',
      },
      {
        indexed: false,
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'Transfer',
    type: 'event',
  },
]
export function ABIToMapping(abi: Array<any>) {
  try {
    const abiMap: Map<string, any> = new Map()
    for (const abiItem of abi) {
      if (abiItem.name) {
        const signHex = sha3(
          `${abiItem.name}(${abiItem.inputs.map(ABIInputToString).join(',')})`
        )
        if (signHex) {
          abiMap.set(
            abiItem.type === 'event' ? signHex.slice(2) : signHex.slice(2, 10),
            abiItem
          )
        }
      }
    }
    return abiMap
  } catch (error) {
    throw new Error(`Disassembly ABI failed ${error.message}`)
  }
}
export function ABIInputToString<T extends { type: string; components?: any }>(
  input: T
) {
  if (input.type.includes('tuple')) {
    return '(' + input.components.map(this.inputItemToString).join(',') + ')'
  }
  return input.type
}
export function decodeMethod(input: string, abi: any = DEFAULT_ABI) {
  const abiItems = ABIToMapping(abi)
  const signId = input.slice(2, 10)
  const abiItem = abiItems.get(signId)
  if (!abiItem) {
    return null
  }
  const result: any = {
    name: abiItem.name,
    params: [],
  }
  const decodeResult: any = AbiCoder['decodeParameters'](
    abiItem.inputs,
    input.slice(10)
  )
  for (let index = 0; index < decodeResult.__length__; index++) {
    const element = decodeResult[index]
    let values: any = null
    const isUint = abiItem.inputs[index].type.includes('uint')
    const isInt = abiItem.inputs[index].type.includes('int')
    const isAddress = abiItem.inputs[index].type.includes('address')
    if (isUint || isInt) {
      if (Array.isArray(element)) {
        values = element.map((val) => new BigNumber(val).toString())
      } else {
        values = new BigNumber(element).toString()
      }
    }
    // Addresses returned by web3 are randomly cased so we need to standardize and lowercase all
    if (isAddress) {
      if (Array.isArray(element)) {
        values = element.map((el) => el.toLowerCase())
      } else {
        values = element.toLowerCase()
      }
    }
    result.params.push({
      name: abiItem.inputs[index].name,
      value: values,
      type: abiItem.inputs[index].type,
    })
  }
  return result
}
