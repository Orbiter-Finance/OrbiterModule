import erc20Abi from './erc20_abi.json'
import obSourceAbi from './ob_source_abi.json'
import { Account, Contract, ec, number, Provider, uint256 } from 'starknet'
import { Uint256 } from 'starknet/dist/utils/uint256'
import BigNumber from 'bignumber.js'
import { BigNumberish } from 'starknet/dist/utils/number'

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
  chainId: number
) {
  if (!starknetAddress || !contractAddress) {
    return 0
  }
  const provider = getProviderByChainId(chainId)

  const tokenContract = new Contract(<any>erc20Abi, contractAddress, provider)
  const balanceSender: Uint256 = (
    await tokenContract.balanceOf(starknetAddress)
  ).balance
  return new BigNumber(balanceSender.low.toString() || 0).toNumber()
}

/**
 *
 * @param chainId
 * @returns
 */
export function getProviderByChainId(chainId: number) {
  const network = chainId == 4 ? 'mainnet-alpha' : 'georli-alpha'
  return new Provider({ network: <any>network })
}
function getUint256CalldataFromBN(bn: BigNumberish) {
  return { type: 'struct' as const, ...uint256.bnToUint256(String(bn)) }
}
export async function sendEthTransaction(
  network: 'mainnet-alpha' | 'goerli-alpha',
  privateKey: string,
  params: {
    from: string
    tokenAddress: string
    to: string
    amount: string
  }
) {
  return new Promise(async (resolve, reject) => {
    const provider = new Provider({ network: <any>network })
    const userSender = new Account(
      provider,
      params.from,
      ec.getKeyPair(privateKey)
    )
    const ethContract = new Contract(
      <any>erc20Abi,
      params.tokenAddress,
      userSender
    )
    const balanceSender: Uint256 = (
      await ethContract.balanceOf(userSender.address)
    ).balance
    // console.warn(
    //   'balanceSender.balance: ',
    //   Number(balanceSender.low) / 10 ** 18 + ''
    // )
    const toAmount = number.toBN(params.amount)
    if (toAmount.gt(number.toBN(balanceSender.low))) {
      throw new Error(
        `${userSender.address} Insufficient funds ${balanceSender.low}/${toAmount}`
      )
    }

    const transferResp = await ethContract.transfer(
      params.to,
      getUint256CalldataFromBN(toAmount)
    )
    if (transferResp.code != 'TRANSACTION_RECEIVED') {
      return reject(`Starknet transfer failed ${transferResp.code}`)
    }
    console.warn(
      'Waitting transfer transaction:',
      transferResp.transaction_hash
    )

    return resolve({
      hash: transferResp.transaction_hash,
      done: () => provider.waitForTransaction(transferResp.transaction_hash),
    })
  })
}
// export async function sendErc20Transaction(
//   network: 'mainnet-alpha' | 'goerli-alpha',
//   privateKey: string,
//   params: {
//     from: string
//     tokenAddress: string
//     to: string
//     amount: string
//   },
//   receiveContractAddress: string,
//   ext: string
// ) {
//   console.log(params, '=====params')
//   const provider = new Provider({ network: <any>network })
//   const userSender = new Account(
//     provider,
//     params.from,
//     ec.getKeyPair(privateKey)
//   )
//   const ethContract = new Contract(
//     <any>erc20Abi,
//     params.tokenAddress,
//     userSender
//   )
//   const obSourceContract = new Contract(
//     <any>obSourceAbi,
//     receiveContractAddress,
//     userSender
//   )
//   console.log(userSender, '===userSender')
//   const balanceSender: Uint256 = (
//     await ethContract.balanceOf(userSender.address)
//   ).balance
//   console.warn(
//     'balanceSender.balance: ',
//     Number(balanceSender.low) / 10 ** 18 + ''
//   )
//   const toAmount = number.toBN(params.amount)
//   // const toAmount = number.toBN(10 ** 14)
//   if (toAmount.gt(number.toBN(balanceSender.low))) {
//     throw new Error(
//       `${userSender.address} Insufficient funds ${balanceSender.low}/${toAmount}`
//     )
//   }
//   // Approve
//   const approveResp = await ethContract.approve(
//     receiveContractAddress,
//     getUint256CalldataFromBN(toAmount)
//   )
//   console.warn('Waitting approve transaction:', approveResp.transaction_hash)
//   await provider.waitForTransaction(approveResp.transaction_hash)
//   console.warn('Aapprove end:', approveResp.transaction_hash)
//   const transferResp = await obSourceContract.transferERC20(
//     params.tokenAddress,
//     params.to,
//     getUint256CalldataFromBN(toAmount),
//     ext
//   )
//   console.log(transferResp, '========transferResp')
//   if (transferResp.code != 'TRANSACTION_RECEIVED') {
//     throw new Error(`Starknet transfer failed ${transferResp.code}`)
//   }
//   console.warn('Waitting transfer transaction:', transferResp.transaction_hash)
//   await provider.waitForTransaction(transferResp.transaction_hash)
//   console.warn('Transfer end:', transferResp.transaction_hash)
// }
// export async function sendErc20Transaction(
//   network: 'mainnet-alpha' | 'goerli-alpha',
//   privateKey: string,
//   params: {
//     sender: string
//     tokenContract: string,
//     receive: string
//   },
//   forwardContract: string
// ) {
//   const provider = new Provider({ network })
//   const userSender = new Account(
//     provider,
//     params.sender,
//     ec.getKeyPair(privateKey)
//   )
//   const ethContract = new Contract(
//     <any>erc20Abi,
//     params.tokenContract,
//     userSender
//   )
//   const obSourceContract = new Contract(
//     <any>obSourceAbi,
//     forwardContract,
//     userSender
//   )

//   const balanceSender: Uint256 = (
//     await ethContract.balanceOf(userSender.address)
//   ).balance
//   console.warn('balanceSender.balance: ', balanceSender.low + '')
//   const balanceRecipient: Uint256 = (
//     await ethContract.balanceOf(params.receive)
//   ).balance
//   console.warn('balanceRecipient.balance: ', balanceRecipient.low + '')
//   const amount = number.toBN(10 ** 14)

//   // Approve
//   const approveResp = await ethContract.approve(
//     forwardContract,
//     getUint256CalldataFromBN(amount)
//   )
//   console.warn('Waitting approve transaction:', approveResp.transaction_hash)
//   await provider.waitForTransaction(approveResp.transaction_hash)
//   console.warn('Aapprove end:', approveResp.transaction_hash)

//   const ext = '0x8A3214F28946A797088944396c476f014F88Dd37'
//   const transferResp = await obSourceContract.transferERC20(
//     params.tokenContract,
//     params.receive,
//     getUint256CalldataFromBN(amount),
//     ext
//   )
//   console.warn('Waitting transfer transaction:', transferResp.transaction_hash)
//   await provider.waitForTransaction(transferResp.transaction_hash)
//   console.warn('Transfer end:', transferResp.transaction_hash)
// }
