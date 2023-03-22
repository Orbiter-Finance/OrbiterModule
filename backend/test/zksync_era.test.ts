import { makerConfig } from "../src/config";
import * as ethers from "ethers";
import * as zksync2 from "zksync-web3";
import Web3 from "web3";
import { getLoggerService } from "../src/util/logger";
import { isEmpty } from "orbiter-chaincore/src/utils/core";
import { isEthTokenAddress } from "../src/util";
import { Transaction as EthereumTx } from "ethereumjs-tx";
import Common from "ethereumjs-common";
import axios from "axios";

describe('maker', () => {
  it('test send', async () => {
    const res = await evm({
      makerAddress: '0x0043d60e87c5dd08c86c3123340705a1556c4719',
      toAddress: '0xA5F46D60F4F08F11a5495f8c1011537718e188Fe',
      toChain: 'zksync2_test',
      chainID: 280,
      tokenInfo: {
        symbol: 'ETH',
        decimals: 18
      },
      tokenAddress: '0x0000000000000000000000000000000000000000',
      amountToSend: (0.0001 * (10 ** 18)).toString(),
      result_nonce: 0,
      fromChainID: 5,
      lpMemo: '',
      ownerAddress: '',
    });
    console.log('res ====>>>>>', res);
  },30000)
})
const nonceDic = {}
async function t(value) {
  let {
    makerAddress,
    toAddress,
    chainID,
    tokenAddress,
    amountToSend,
    result_nonce,
  } = value
  const accessLogger = getLoggerService(chainID)
  let ethProvider
  let syncProvider
  if (chainID === 514) {
    const httpEndPoint = makerConfig['zksync2_test'].httpEndPoint
    ethProvider = ethers.getDefaultProvider('goerli')
    syncProvider = new zksync2.Provider(httpEndPoint)
  } else {
    const httpEndPoint = makerConfig['zksync2'].httpEndPoint //official httpEndpoint is not exists now
    ethProvider = ethers.getDefaultProvider('homestead')
    syncProvider = new zksync2.Provider(httpEndPoint)
  }
  const syncWallet = new zksync2.Wallet(
      makerConfig.privateKeys[makerAddress.toLowerCase()],
      syncProvider,
      ethProvider
  )
  let tokenBalanceWei = await syncWallet.getBalance(
      tokenAddress,
      'finalized'
  )
  if (!tokenBalanceWei) {
    accessLogger.error('zk2 Insufficient balance 0')
    return {
      code: 1,
      txid: 'ZK2 Insufficient balance 0',
    }
  }
  accessLogger.info('zk2_tokenBalance =', tokenBalanceWei.toString())
  if (BigInt(tokenBalanceWei.toString()) < BigInt(amountToSend)) {
    accessLogger.error('zk2 Insufficient balance')
    return {
      code: 1,
      txid: 'zk2 Insufficient balance',
    }
  }
  const has_result_nonce = result_nonce > 0
  if (!has_result_nonce) {
    let zk_nonce = await syncWallet.getNonce('committed')
    let zk_sql_nonce = nonceDic[makerAddress]?.[chainID]
    if (!zk_sql_nonce) {
      result_nonce = zk_nonce
    } else {
      if (zk_nonce > zk_sql_nonce) {
        result_nonce = zk_nonce
      } else {
        result_nonce = zk_sql_nonce + 1
      }
    }
    accessLogger.info('zk2_nonce =', zk_nonce)
    accessLogger.info('zk2_sql_nonce =', zk_sql_nonce)
    accessLogger.info('zk2 result_nonde =', result_nonce)
  }
  const params: any = {
    from: makerAddress,
    customData: {
      feeToken: '',
    },
    to: '',
    nonce: result_nonce,
    value: ethers.BigNumber.from(0).toHexString(),
    data: '0x',
  }
  const isMainCoin =
      tokenAddress.toLowerCase() ===
      '0x0000000000000000000000000000000000000000'
  if (isMainCoin) {
    params.value = ethers.BigNumber.from(amountToSend).toHexString()
    params.to = toAddress
    params.customData.feeToken =
        '0x0000000000000000000000000000000000000000'
  } else {
    const web3 = new Web3()
    const tokenContract = new web3.eth.Contract(
        <any>makerConfig.ABI,
        tokenAddress
    )
    params.data = tokenContract.methods
        .transfer(toAddress, web3.utils.toHex(amountToSend))
        .encodeABI()
    params.to = tokenAddress
    params.customData.feeToken = tokenAddress
  }
  params.gasPrice = await syncWallet.getGasPrice();
  console.log(params)
  params.gasLimit = await syncWallet.provider.estimateGas(params);
  const transfer = await syncWallet.sendTransaction(params)

  console.log('====>>>', transfer);
  return transfer;
}

async function evm(value) {
  let {
    makerAddress,
    toAddress,
    toChain,
    chainID,
    tokenInfo,
    tokenAddress,
    amountToSend,
    result_nonce,
    // fromChainID,
    // lpMemo,
    // ownerAddress,
  } = value
  const accessLogger = getLoggerService(chainID)
  let web3Net = ''
  if (makerConfig[toChain]) {
    web3Net =
        makerConfig[toChain].httpEndPointInfura ||
        makerConfig[toChain].httpEndPoint
    accessLogger.info(`RPC from makerConfig ${toChain}`)
  } else {
    //
    accessLogger.info(`RPC from ChainCore ${toChain}`)
  }
  if (isEmpty(web3Net)) {
    accessLogger.error(`RPC not obtained ToChain ${toChain}`)
    return
  }
  const web3 = new Web3(web3Net)
  web3.eth.defaultAccount = makerAddress

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
    accessLogger.error('tokenBalanceWeiError =', error)
  }

  if (!tokenBalanceWei) {
    accessLogger.error(`${toChain}->!tokenBalanceWei Insufficient balance`)
    // return {
    //   code: 1,
    //   txid: `${toChain}->!tokenBalanceWei Insufficient balance`,
    // }
  }
  accessLogger.info('tokenBalanceWei =', tokenBalanceWei)
  if (tokenBalanceWei && BigInt(tokenBalanceWei) < BigInt(amountToSend)) {
    accessLogger.error(
        `${toChain}->tokenBalanceWei<amountToSend Insufficient balance`
    )
    return {
      code: 1,
      txid: `${toChain}->tokenBalanceWei<amountToSend Insufficient balance`,
    }
  }


  if (result_nonce == 0) {
    let nonce = 0
    try {
      nonce = await web3.eth.getTransactionCount(
          <any>web3.eth.defaultAccount,
          'pending'
      )
    } catch (err) {
      return {
        code: 1,
        txid: 'GetTransactionCount failed: ' + err.message,
      }
    }

    /**
     * With every new transaction you send using a specific wallet address,
     * you need to increase a nonce which is tied to the sender wallet.
     */
    let sql_nonce = nonceDic[makerAddress]?.[chainID]
    accessLogger.info(
        `read nonce  sql_nonce:${sql_nonce}, nonce:${nonce}, result_nonce:${result_nonce}`
    )
    accessLogger.info('read nonceDic', JSON.stringify(nonceDic))
    if (!sql_nonce) {
      result_nonce = nonce
    } else {
      if (nonce > sql_nonce) {
        result_nonce = nonce
      } else {
        result_nonce = sql_nonce + 1
      }
    }

    if (!nonceDic[makerAddress]) {
      nonceDic[makerAddress] = {}
    }
    nonceDic[makerAddress][chainID] = result_nonce
    accessLogger.info('nonce =', nonce)
    accessLogger.info('sql_nonce =', sql_nonce)
    accessLogger.info('result_nonde =', result_nonce)
  }

  /**
   * Fetch the current transaction gas prices from https://ethgasstation.info/
   */
  let maxPrice = 230
  if (isEthTokenAddress(tokenAddress)) {
    if (chainID == 1 || chainID == 5) {
      maxPrice = 300;
    }
  }
  if (tokenInfo && tokenInfo.symbol === 'USDC') {
    if (chainID == 1 || chainID == 5) {
      maxPrice = 170;
    }
  }
  if (tokenInfo && tokenInfo.symbol === 'USDT') {
    if (chainID == 1 || chainID == 5) {
      maxPrice = 170;
    }
  }
  if (tokenInfo && tokenInfo.symbol === 'DAI') {
    if (chainID == 1 || chainID == 5) {
      maxPrice = 170;
    }
  }

  const response = await axios.post(makerConfig[toChain].httpEndPoint, {
    jsonrpc: '2.0',
    method: 'eth_gasPrice',
    params: [],
    id: 0,
  })

  if (response.status !== 200 || response.statusText !== 'OK') {
    throw 'Eth_gasPrice response failed!'
  }

  let gasPrices = response.data.result
  let gasLimit = 100000
  if (
      toChain === 'metis' ||
      toChain === 'metis_test' ||
      toChain === 'boba_test' ||
      toChain === 'boba'
  ) {
    gasLimit = 1000000
  }
  if (chainID == 16 || chainID == 516) {
    gasLimit = 250000;
  }

  if (toChain === 'arbitrum_test' || toChain === 'arbitrum' || toChain === 'zksync2_test' || toChain === 'zksync2') {
    try {
      if (isEthTokenAddress(tokenAddress)) {
        gasLimit = await web3.eth.estimateGas({
          from: makerAddress,
          to: toAddress,
          value: web3.utils.toHex(amountToSend),
        })
      } else {
        gasLimit = await tokenContract.methods
            .transfer(toAddress, web3.utils.toHex(amountToSend))
            .estimateGas({
              from: makerAddress,
            })
      }
      gasLimit = Math.ceil(web3.utils.hexToNumber(gasLimit) * 1.5)
    } catch (error) {
      gasLimit = 1000000
    }
    accessLogger.info('arGasLimit =', gasLimit)
  }

  /**
   * Build a new transaction object and sign it locally.
   */

  const details: any = {
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
    details['value'] = '0x0'
    details['data'] = tokenContract.methods
        .transfer(toAddress, web3.utils.toHex(amountToSend))
        .encodeABI()
  }


  let transaction: EthereumTx
  if (makerConfig[toChain]?.customChainId) {
    const networkId = makerConfig[toChain]?.customChainId
    const customCommon = Common.forCustomChain(
        'mainnet',
        {
          name: toChain,
          networkId,
          chainId: networkId,
        },
        'petersburg'
    )
    transaction = new EthereumTx(details, { common: customCommon })
  } else {
    transaction = new EthereumTx(details, { chain: toChain })
  }
  const k = makerConfig.privateKeys[makerAddress.toLowerCase()];

  console.log('privateKeys',k)
  /**
   * This is where the transaction is authorized on your behalf.
   * The private key is what unlocks your wallet.
   */
  transaction.sign(
      Buffer.from(makerConfig.privateKeys[makerAddress.toLowerCase()], 'hex')
  )
  accessLogger.info('send transaction =', JSON.stringify(details))
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

  return new Promise((resolve) => {
    web3.eth
        .sendSignedTransaction('0x' + serializedTransaction.toString('hex'))
        .on('transactionHash', async (hash) => {
          resolve({
            code: 0,
            txid: hash,
          })
        })
        .on('receipt', (tx: any) => {
          accessLogger.info('send transaction receipt=', JSON.stringify(tx))
        })
        .on('error', (err: any) => {
          nonceDic[makerAddress][chainID] = result_nonce - 1;
          resolve({
            code: 1,
            txid: err,
            error: err,
            result_nonce,
          })
        })
  })
}
