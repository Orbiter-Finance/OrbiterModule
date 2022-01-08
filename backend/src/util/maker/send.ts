import axios from 'axios'
import Common from 'ethereumjs-common'
import { Transaction as EthereumTx } from 'ethereumjs-tx'
import * as ethers from 'ethers'
import Web3 from 'web3'
import * as zksync from 'zksync'
import { isEthTokenAddress } from '..'
import { makerConfig } from '../../config'
import { accessLogger, errorLogger } from '../logger'

let nonceDic = {}

const getCurrentGasPrices = async (
  toChain: string,
  ethgasAPITarget = 'low'
) => {
  if (toChain === 'mainnet' && !makerConfig[toChain].gasPrice) {
    try {
      let response = await axios.get(
        'https://ethgasstation.info/json/ethgasAPI.json'
      )
      let prices = {
        low: response.data.safeLow / 10,
        medium: response.data.average / 10,
        high: response.data.fast / 10,
      }
      return Web3.utils.toHex(
        Web3.utils.toWei(prices[ethgasAPITarget].toString(), 'gwei')
      )
    } catch (error) {
      return Web3.utils.toHex(Web3.utils.toWei('500', 'gwei')) // 50
    }
  } else {
    try {
      let response = await axios.post(makerConfig[toChain].httpEndPoint, {
        jsonrpc: '2.0',
        method: 'eth_gasPrice',
        params: [],
        id: 0,
      })
      if (response.status === 200 && response.statusText === 'OK') {
        accessLogger.info('gasPrice =', response.data.result)
        return response.data.result
      }
      return Web3.utils.toHex(
        Web3.utils.toWei(makerConfig[toChain].gasPrice.toString(), 'gwei')
      )
    } catch (error) {
      return Web3.utils.toHex(
        Web3.utils.toWei(makerConfig[toChain].gasPrice.toString(), 'gwei')
      )
    }
  }
}

/**
 * This is the process that will run when you execute the program.
 */
async function send(
  toAddress,
  toChain,
  chainID,
  tokenID, // 3 33 use
  tokenAddress,
  amountToSend,
  result_nonce = 0
): Promise<any> {
  if (chainID === 3 || chainID === 33) {
    try {
      let ethProvider
      let syncProvider
      if (chainID === 3) {
        ethProvider = ethers.providers.getDefaultProvider('mainnet')
        syncProvider = await zksync.getDefaultProvider('mainnet')
      }
      if (chainID === 33) {
        ethProvider = ethers.providers.getDefaultProvider('rinkeby')
        syncProvider = await zksync.getDefaultProvider('rinkeby')
      }
      const ethWallet = new ethers.Wallet(makerConfig.privatekey).connect(
        ethProvider
      )
      const syncWallet = await zksync.Wallet.fromEthSigner(
        ethWallet,
        syncProvider
      )

      if (!(await syncWallet.isSigningKeySet())) {
        if ((await syncWallet.getAccountId()) == undefined) {
          throw new Error('Unknown account')
        }
        // As any other kind of transaction, `ChangePubKey` transaction requires fee.
        // User doesn't have (but can) to specify the fee amount. If omitted, library will query zkSync node for
        // the lowest possible amount.
        const changePubkey = await syncWallet.setSigningKey({
          feeToken: 'ETH',
          ethAuthType: 'ECDSA',
        })
        // Wait until the tx is committed
        await changePubkey.awaitReceipt()
      }
      const amount = zksync.utils.closestPackableTransactionAmount(amountToSend)

      const has_result_nonce = result_nonce > 0
      if (!has_result_nonce) {
        let zk_nonce = await syncWallet.getNonce('committed')
        let zk_sql_nonce = nonceDic[chainID]
        if (!zk_sql_nonce) {
          result_nonce = zk_nonce
        } else {
          if (zk_nonce > zk_sql_nonce) {
            result_nonce = zk_nonce
          } else {
            result_nonce = zk_sql_nonce + 1
          }
        }
        accessLogger.info('zk_nonce =', zk_nonce)
        accessLogger.info('zk_sql_nonce =', zk_sql_nonce)
        accessLogger.info('result_nonde =', result_nonce)
      }

      const transfer = await syncWallet.syncTransfer({
        to: toAddress,
        token: tokenAddress,
        nonce: result_nonce,
        amount,
      })
      if (!has_result_nonce) {
        nonceDic[chainID] = result_nonce
      }

      return new Promise((resolve, reject) => {
        if (transfer.txHash) {
          resolve({
            code: 0,
            txid: transfer.txHash,
            zkProvider: syncProvider,
            chainID: chainID,
            zkNonce: result_nonce,
          })
        } else {
          resolve({
            code: 1,
            error: 'zk transfer error',
            result_nonce,
          })
        }
      })
    } catch (error) {
      return {
        code: 1,
        txid: error,
        result_nonce,
      }
    }
    return
  }
  const web3Net = makerConfig[toChain].httpEndPoint
  const web3 = new Web3(web3Net)
  web3.eth.defaultAccount = makerConfig.makerAddress

  let tokenContract: any

  let tokenBalanceWei = 0
  try {
    if (isEthTokenAddress(tokenAddress)) {
      tokenBalanceWei =
        Number(await web3.eth.getBalance(<any>web3.eth.defaultAccount)) || 0
    } else {
      tokenContract = new web3.eth.Contract(<any>makerConfig.ABI, tokenAddress)
      tokenBalanceWei = await tokenContract.methods
        .balanceOf(web3.eth.defaultAccount)
        .call({
          from: web3.eth.defaultAccount,
        })
    }
  } catch (error) {
    errorLogger.error('tokenBalanceWeiError =', error)
  }

  if (!tokenBalanceWei) {
    errorLogger.error('Insufficient balance')
    return {
      code: 1,
      txid: 'Insufficient balance',
    }
  }
  accessLogger.info('tokenBalance =', tokenBalanceWei)
  if (BigInt(tokenBalanceWei) < BigInt(amountToSend)) {
    errorLogger.error('Insufficient balance')
    return {
      code: 1,
      txid: 'Insufficient balance',
    }
  }

  if (result_nonce == 0) {
    let nonce = await web3.eth.getTransactionCount(
      <any>web3.eth.defaultAccount,
      'pending'
    )
    /**
     * With every new transaction you send using a specific wallet address,
     * you need to increase a nonce which is tied to the sender wallet.
     */
    let sql_nonce = nonceDic[chainID]
    if (!sql_nonce) {
      result_nonce = nonce
    } else {
      if (nonce > sql_nonce) {
        result_nonce = nonce
      } else {
        result_nonce = sql_nonce + 1
      }
    }
    nonceDic[chainID] = result_nonce
    accessLogger.info('nonce =', nonce)
    accessLogger.info('sql_nonce =', sql_nonce)
    accessLogger.info('result_nonde =', result_nonce)
  }

  /**
   * Fetch the current transaction gas prices from https://ethgasstation.info/
   */
  let gasPrices = await getCurrentGasPrices(
    toChain,
    isEthTokenAddress(tokenAddress) ? 'medium' : 'low'
  )

  let gasLimit = 100000
  if (toChain === 'arbitrum_test' || toChain === 'arbitrum') {
    gasLimit = 1000000
  }

  /**
   * Build a new transaction object and sign it locally.
   */
  const details = {
    gas: web3.utils.toHex(gasLimit),
    gasPrice: gasPrices, // converts the gwei price to wei
    nonce: result_nonce,
    chainId: chainID, // mainnet: 1, rinkeby: 4
  }
  if (isEthTokenAddress(tokenAddress)) {
    details['to'] = toAddress
    details['value'] = web3.utils.toHex(amountToSend)
  } else {
    details['to'] = tokenAddress
    details['value'] = 0x0
    details['data'] = tokenContract.methods
      .transfer(toAddress, web3.utils.toHex(amountToSend))
      .encodeABI()
  }

  let result_chain = toChain
  let useCommon = false
  let transaction
  if (toChain === 'arbitrum_test') {
    result_chain = 421611
    useCommon = true
  }
  if (toChain === 'arbitrum') {
    result_chain = 42161
    useCommon = true
  }
  if (useCommon) {
    const customCommon = Common.forCustomChain(
      'mainnet',
      {
        name: 'toChain',
        networkId: result_chain,
        chainId: result_chain,
      },
      'petersburg'
    )
    transaction = new EthereumTx(details, { common: customCommon })
  } else {
    transaction = new EthereumTx(details, { chain: result_chain })
  }

  /**
   * This is where the transaction is authorized on your behalf.
   * The private key is what unlocks your wallet.
   */
  transaction.sign(Buffer.from(makerConfig.privatekey, 'hex'))

  /**
   * Now, we'll compress the transaction info down into a transportable object.
   */
  const serializedTransaction = transaction.serialize()

  /**
   * Note that the Web3 library is able to automatically determine the "from" address based on your private key.
   */
  // const addr = transaction.from.toString('hex')
  // log(`Based on your private key, your wallet address is ${addr}`)
  /**
   * We're ready! Submit the raw transaction details to the provider configured above.
   */
  return new Promise((resolve, reject) => {
    web3.eth
      .sendSignedTransaction('0x' + serializedTransaction.toString('hex'))
      .on('transactionHash', async (hash) => {
        resolve({
          code: 0,
          txid: hash,
        })
      })
      .on('error', (err) => {
        resolve({
          code: 1,
          txid: err,
          result_nonce,
        })
      })
  })
}

export default send
