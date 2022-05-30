const mainnetChains = require('../../chains.json')
const testnetChains = require('../../testnet.json');
const chains = [...mainnetChains, ...testnetChains];
import { IChainConfig } from '../types/chain'

export function getAllChains(): IChainConfig[] {
  return chains as IChainConfig[]
}

export function getChain(chainId: string): IChainConfig {
  const chain = chains.find((x) => x.chainId === chainId)
  if (!chain || typeof chain === 'undefined') {
    throw new Error(`No chain found matching chainId: ${chainId}`)
  }
  return chain as IChainConfig
}
export function getChainByInternalId(
  internalId: IChainConfig['internalId']
): IChainConfig {
  const chain = getChainByKeyValue('internalId', internalId)
  return chain
}

export function getChainByChainId(
  chainId: IChainConfig['chainId']
): IChainConfig {
  const chain = getChain(chainId)
  return chain
}

export function getChainByKeyValue(
  key: keyof IChainConfig,
  value: any
): IChainConfig {
  const allChains = getAllChains()

  let chain: IChainConfig | undefined
  const matches = allChains.filter((chain) => chain[key] === value)

  if (matches && matches.length) {
    chain = matches[0]
  }

  if (typeof chain === 'undefined') {
    throw new Error(`No chain found matching ${key}: ${value}`)
  }

  return chain
}

export function getChainByNetworkId(
  networkId: IChainConfig['networkId']
): IChainConfig {
  const chain = getChainByKeyValue('networkId', networkId)
  return chain
}

export function convertNetworkIdToChainId(
  networkId: IChainConfig['networkId']
): string {
  const chain = getChainByNetworkId(networkId)
  return chain.chainId
}

export function convertChainIdToNetworkId(
  chainId: IChainConfig['chainId']
): string {
  const chain = getChain(chainId)
  return chain.networkId
}
