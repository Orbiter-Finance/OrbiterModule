import { sha3 } from 'web3-utils'
import AbiCoder from 'web3-eth-abi'
import BigNumber from 'bignumber.js'
export const IERC20_ABI = require('../abi/IERC20.json');
export const ZKSYNC2_ABI = require('../abi/IERC20.json');
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
export function decodeMethod(input: string, abi: any = IERC20_ABI) {
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
