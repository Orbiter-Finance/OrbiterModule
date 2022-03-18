import {
  keyPairFromData,
  KeyPairWithYCoordinate,
} from '@dydxprotocol/starkex-lib'
import { signTypedData, SignTypedDataVersion } from '@metamask/eth-sig-util'
import BigNumber from 'bignumber.js'
import {
  compileCalldata,
  Contract,
  ec,
  Provider,
  Signer,
  uint256,
} from 'starknet'
import { BigNumberish } from 'starknet/dist/utils/number'
import { getSelectorFromName } from 'starknet/dist/utils/stark'
import { makerConfig } from '../../config'
import starknetAccountContract from './account.json'
import erc20Abi from './erc20_abi.json'

const L1_SWAP_L2_CONTRACT_ADDRESS = {
  'mainnet-alpha': '',
  'georli-alpha':
    '0x021c6bbdabdfbf86997471f547d4aa5362787f18b76dad8d3e6b8f3d7471395a',
}

const L1_TO_L2_ADDRESSES = {
  '0x0043d60e87c5dd08c86c3123340705a1556c4719': {
    'mainnet-alpha': '',
    'georli-alpha':
      '0x2b31ce585a1f407cb3b414e2a71ee45c4430b4df36c8528ab42c0bcee97a887',
  },
}

const STARKNET_ACCOUNT_CACHE: {
  [key: string]: KeyPairWithYCoordinate & { starknetAddress: string }
} = {}

function stripHexPrefix(input: string) {
  if (input.indexOf('0x') === 0) {
    return input.substr(2)
  }
  return input
}

function getUint256CalldataFromBN(bn: BigNumberish) {
  return { type: 'struct', ...uint256.bnToUint256(bn) }
}

/**
 *
 * @param chainId
 * @returns
 */
export function getNetworkIdByChainId(chainId: number) {
  return chainId == 4 ? 1 : 5
}

/**
 *
 * @param l1Address ethAddress
 * @param networkId
 * @returns
 */
export async function getStarknetAccount(l1Address: string, networkId = 1) {
  if (!l1Address) {
    throw new Error('Sorry, miss l1 address!')
  }

  // Get cache
  if (STARKNET_ACCOUNT_CACHE[l1Address]) {
    return STARKNET_ACCOUNT_CACHE[l1Address]
  }

  const privateKey = makerConfig.privateKeys[l1Address]
  if (!privateKey) {
    throw new Error(`Sorry, can't find [${l1Address}] privateKey!`)
  }

  const msgParams = {
    types: {
      EIP712Domain: [
        { name: 'name', type: 'string' },
        { name: 'version', type: 'string' },
        { name: 'chainId', type: 'uint256' },
        { name: 'verifyingContract', type: 'address' },
      ],
      Message: [
        { name: 'action', type: 'string' },
        { name: 'onlySignOn', type: 'string' },
      ],
    },
    primaryType: 'Message' as const,
    domain: {
      name: 'Orbiter',
      version: '1',
      chainId: networkId,
      verifyingContract: '',
    },
    message: {
      action: 'Orbiter STARK Key',
    },
  }
  if (networkId == 1) {
    msgParams.message['onlySignOn'] =
      'https://app.orbiter.finance or https://orbiter.finance'
  }

  const data = signTypedData({
    privateKey: Buffer.from(privateKey, 'hex'),
    data: msgParams,
    version: SignTypedDataVersion.V3,
  })

  const keyPair = keyPairFromData(Buffer.from(stripHexPrefix(data), 'hex'))

  keyPair.publicKey = '0x' + keyPair.publicKey
  keyPair.privateKey = '0x' + keyPair.privateKey
  keyPair.publicKeyYCoordinate = '0x' + keyPair.publicKeyYCoordinate

  // Deploy account contract
  const provider = new Provider({
    network: networkId == 1 ? 'mainnet-alpha' : 'georli-alpha',
  })
  const deployTransaction = await provider.deployContract(
    <any>starknetAccountContract,
    compileCalldata({ signer: keyPair.publicKey, guardian: '0' }),
    keyPair.privateKey
  )

  if (
    deployTransaction.code !== 'TRANSACTION_RECEIVED' ||
    !deployTransaction.address
  ) {
    throw new Error('Deploy starknet account failed!')
  }

  const starknetAccount = {
    ...keyPair,
    starknetAddress: deployTransaction.address,
  }

  // Set cache
  STARKNET_ACCOUNT_CACHE[l1Address] = starknetAccount

  return starknetAccount
}

/**
 *
 * @param l1Address ethAddress
 * @param networkId
 * @returns
 */
export async function getStarknetSigner(l1Address: string, networkId = 1) {
  const starknetAccount = await getStarknetAccount(l1Address, networkId)

  const network = networkId == 1 ? 'mainnet-alpha' : 'georli-alpha'
  const provider = new Provider({ network })
  return new Signer(
    provider,
    starknetAccount.starknetAddress,
    ec.getKeyPair(starknetAccount.privateKey)
  )
}

/**
 *
 * @param l1Address ethAddress
 * @param networkId
 * @returns
 */
export async function saveMappingL1AndL2(l1Address: string, networkId = 1) {
  if (!l1Address) {
    throw new Error('Sorry, miss l1 address!')
  }

  const network = networkId == 1 ? 'mainnet-alpha' : 'georli-alpha'
  const contractAddress = L1_SWAP_L2_CONTRACT_ADDRESS[network]

  const starknetSigner = await getStarknetSigner(l1Address, networkId)

  const resp = await starknetSigner.invokeFunction(
    contractAddress,
    getSelectorFromName('save_address'),
    compileCalldata({ l1: l1Address })
  )

  if (resp.code != 'TRANSACTION_RECEIVED') {
    throw new Error('MappingL1AndL2 failed!')
  }

  return resp.transaction_hash
}

/**
 *
 * @param l1Address ethAddress
 * @param networkId
 * @returns
 */
export async function getL2AddressByL1(l1Address: string, networkId = 1) {
  if (!l1Address) {
    throw new Error('Sorry, miss l1 address!')
  }
  l1Address = l1Address.toLowerCase()

  const network = networkId == 1 ? 'mainnet-alpha' : 'georli-alpha'

  // When l1 address on L1_TO_L2_ADDRESSES, get it
  if (L1_TO_L2_ADDRESSES[l1Address]?.[network]) {
    return L1_TO_L2_ADDRESSES[l1Address][network]
  }

  const provider = new Provider({ network })
  const contractAddress = L1_SWAP_L2_CONTRACT_ADDRESS[network]

  const resp = await provider.callContract({
    contract_address: contractAddress,
    entry_point_selector: getSelectorFromName('get_l2_address'),
    calldata: compileCalldata({ l1: l1Address }),
  })

  let starknetAddress = resp?.result?.[0]
  if (starknetAddress == '0x0') {
    starknetAddress = ''
  }

  return starknetAddress
}

/**
 *
 * @param l2Address starknetAddress
 * @param networkId
 * @returns
 */
export async function getL1AddressByL2(l2Address: string, networkId = 1) {
  if (!l2Address) {
    throw new Error('Sorry, miss l2 address!')
  }

  const network = networkId == 1 ? 'mainnet-alpha' : 'georli-alpha'

  const provider = new Provider({ network })
  const contractAddress = L1_SWAP_L2_CONTRACT_ADDRESS[network]

  const resp = await provider.callContract({
    contract_address: contractAddress,
    entry_point_selector: getSelectorFromName('get_l1_address'),
    calldata: compileCalldata({ l2: l2Address }),
  })

  let l1Address = resp?.result?.[0]
  if (l1Address == '0x0') {
    l1Address = ''
  }

  return l1Address
}

/**
 *
 * @param starknetAddress
 * @param networkId
 * @returns
 */
export async function getAccountNonce(starknetAddress: string, networkId = 1) {
  if (!starknetAddress) {
    return 0
  }
  const network = networkId == 1 ? 'mainnet-alpha' : 'georli-alpha'
  const provider = new Provider({ network })

  const resp = await provider.callContract({
    contract_address: starknetAddress,
    entry_point_selector: getSelectorFromName('get_nonce'),
  })

  if (typeof resp.result?.[0] === 'undefined') {
    return 0
  }

  return parseInt(resp.result?.[0], 16)
}

/**
 *
 * @param starknetAddress
 * @param contractAddress
 * @param networkId
 * @returns
 */
export async function getErc20Balance(
  starknetAddress: string,
  contractAddress: string,
  networkId = 1
) {
  if (!starknetAddress || !contractAddress) {
    return 0
  }
  const network = networkId == 1 ? 'mainnet-alpha' : 'georli-alpha'
  const provider = new Provider({ network })

  const tokenContract = new Contract(<any>erc20Abi, contractAddress, provider)
  const resp = await tokenContract.call('balanceOf', {
    user: starknetAddress,
  })
  if (!resp || !resp.balance || !resp.balance['low']) {
    return 0
  }

  return new BigNumber(resp.balance['low']).toNumber()
}

/**
 *
 * @param l1Address ethAddress
 * @param contractAddress
 * @param networkId
 * @returns
 */
export async function getErc20BalanceByL1(
  l1Address: string,
  contractAddress: string,
  networkId = 1
) {
  const starknetAddress = await getL2AddressByL1(l1Address, networkId)

  return await getErc20Balance(starknetAddress, contractAddress, networkId)
}

/**
 *
 * @param l1Address ethAddress
 * @param contractAddress
 * @param receiverStarknetAddress
 * @param amount
 * @param networkId
 * @returns
 */
export async function sendTransaction(
  l1Address: string,
  contractAddress: string,
  receiverStarknetAddress: string,
  amount: number,
  networkId = 1
) {
  if (!contractAddress || !receiverStarknetAddress) {
    throw new Error('Sorry, Miss params!')
  }
  if (amount <= 0) {
    throw new Error('Sorry, amount is less than 0!')
  }

  const starknetSigner = await getStarknetSigner(l1Address, networkId)
  const resp = await starknetSigner.invokeFunction(
    contractAddress,
    getSelectorFromName('transfer'),
    compileCalldata({
      receiver: receiverStarknetAddress,
      amount: <any>getUint256CalldataFromBN(String(amount)),
    })
  )
  if (resp.code != 'TRANSACTION_RECEIVED') {
    throw new Error('Starknet sendTransaction failed!')
  }

  return resp.transaction_hash
}

/**
 *
 * @param chainId
 * @returns
 */
export function getProviderByChainId(chainId: number) {
  const networkId = getNetworkIdByChainId(chainId)
  const network = networkId == 1 ? 'mainnet-alpha' : 'georli-alpha'
  return new Provider({ network })
}
