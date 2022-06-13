import { Account, Contract, ec, number, Provider, uint256 } from 'starknet'
import l2_abi_erc20 from './erc20_abi.json'
import ob_source_abi from './ob_source_abi.json'
import { Uint256 } from 'starknet/dist/utils/uint256'
import { BigNumberish } from 'starknet/dist/utils/number'
function getUint256CalldataFromBN(bn: BigNumberish) {
  return { type: 'struct' as const, ...uint256.bnToUint256(String(bn)) }
}
export async function sendStarknetTx(
  network: string,
  privateKey: string,
  params: {
    from: string
    tokenAddress: string
    to: string
    amount: string
  },
  receiveContractAddress: string,
  ext: string
) {
  const provider = new Provider({ network: <any>network })
  const userSender = new Account(
    provider,
    params.from,
    ec.getKeyPair(privateKey)
  )
  //   const contractAddress =
  // '0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7'
  const ethContract = new Contract(
    <any>l2_abi_erc20,
    params.tokenAddress,
    userSender
  )
  const obSourceContract = new Contract(
    <any>ob_source_abi,
    receiveContractAddress,
    userSender
  )
  console.log(userSender, '===userSender')
  const balanceSender: Uint256 = (
    await ethContract.balanceOf(userSender.address)
  ).balance
  console.warn(
    'balanceSender.balance: ',
    Number(balanceSender.low) / 10 ** 18 + ''
  )

  const toAmount = number.toBN(Number(params.amount) * 10 ** 18)
  // Approve
  const approveResp = await ethContract.approve(
    receiveContractAddress,
    uint256.bnToUint256(String(toAmount))
    // getUint256CalldataFromBN(toAmount)
  )
  console.warn('Waitting approve transaction:', approveResp.transaction_hash)
  await provider.waitForTransaction(approveResp.transaction_hash)
  console.warn('Aapprove end:', approveResp.transaction_hash)
  const transferResp = await obSourceContract.transferERC20(
    params.tokenAddress,
    params.to,
    getUint256CalldataFromBN(toAmount),
    ext
  )
  console.warn('Waitting transfer transaction:', transferResp.transaction_hash)
  await provider.waitForTransaction(transferResp.transaction_hash)
  console.warn('Transfer end:', transferResp.transaction_hash)
}
