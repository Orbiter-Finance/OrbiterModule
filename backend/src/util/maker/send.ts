import { ERC20TokenType, ETHTokenType } from '@imtbl/imx-sdk'
import {
  ChainId,
  ConnectorNames,
  ExchangeAPI,
  generateKeyPair,
  GlobalAPI,
  UserAPI,
} from '@loopring-web/loopring-sdk'
import axios from 'axios'
import BigNumber from 'bignumber.js'
import Common from 'ethereumjs-common'
import { Transaction as EthereumTx } from 'ethereumjs-tx'
import * as ethers from 'ethers'
import * as zksync2 from 'zksync-web3'
import Web3 from 'web3'
import * as zksync from 'zksync'
import { isEthTokenAddress, sleep } from '..'
import { DydxHelper } from '../../service/dydx/dydx_helper'
import { IMXHelper } from '../../service/immutablex/imx_helper'
import zkspace_help from '../../service/zkspace/zkspace_help'
import { sign_musig } from 'zksync-crypto'
import { getMarket } from '../../service/maker';
import { SendQueue } from './send_queue'
import { StarknetHelp } from '../../service/starknet/helper'
import { equals, isEmpty } from 'orbiter-chaincore/src/utils/core'
import { accessLogger, errorLogger, getLoggerService } from '../logger'
import { chains } from 'orbiter-chaincore'
import { doSms } from '../../sms/smsSchinese'
import { chainQueue, IMarket, transfers } from './new_maker';
import { consulConfig } from "../../config/consul_store";
const PrivateKeyProvider = require('truffle-privatekey-provider')

const nonceDic = {}
const getCurrentGasPrices = async (toChain: string, maxGwei = 165) => {
  if (toChain === 'mainnet' && !consulConfig.maker[toChain].gasPrice) {
    try {
      const httpEndPoint = consulConfig.maker[toChain].api.endPoint
      const apiKey = consulConfig.maker[toChain].gasKey
        ? consulConfig.maker[toChain].gasKey
        : consulConfig.maker[toChain].api.key
      const url =
        httpEndPoint + '?module=gastracker&action=gasoracle&apikey=' + apiKey
      const response = await axios.get(url)
      if (response.data.status == 1 && response.data.message === 'OK') {
        let prices = {
          low: Number(response.data.result.SafeGasPrice) + 5,
          medium: Number(response.data.result.ProposeGasPrice) + 5,
          high: Number(response.data.result.FastGasPrice) + 5,
        }
        let gwei = prices['medium']
        // Limit max gwei
        if (gwei > maxGwei) {
          gwei = maxGwei
        }
        accessLogger.info(`main_gasPrice =${gwei}`)
        return Web3.utils.toHex(Web3.utils.toWei(gwei + '', 'gwei'))
      } else {
        accessLogger.info(`main_gasPriceError = ${response}`)
        maxGwei = 80
        return Web3.utils.toHex(Web3.utils.toWei(maxGwei + '', 'gwei'))
      }
    } catch (error) {
      maxGwei = 80
      return Web3.utils.toHex(Web3.utils.toWei(maxGwei + '', 'gwei'))
    }
  } else {
    try {
      const response = await axios.post(consulConfig.maker[toChain].httpEndPoint, {
        jsonrpc: '2.0',
        method: 'eth_gasPrice',
        params: [],
        id: 0,
      })

      if (response.status !== 200 || response.statusText !== 'OK') {
        throw 'Eth_gasPrice response failed!'
      }

      let gasPrice = response.data.result

      // polygon gas price x2
      if (toChain == 'polygon' || toChain == 'polygon_test') {
        if (parseInt(response.data.result, 16) < 100000000000) {
          gasPrice = Web3.utils.toHex(200000000000)
        } else {
          gasPrice = Web3.utils.toHex(parseInt(gasPrice, 16) * 2)
        }
      }
      // polygon zk_evm  gasPrice * 1.5
      if (toChain == 'polygon_evm') {
        gasPrice = Web3.utils.toHex((parseInt(gasPrice, 16) * 1.2).toFixed())
      }

      if (toChain == 'rinkeby') {
        gasPrice = Web3.utils.toHex(20000000000)
        // gasPrice = Web3.utils.toHex(parseInt(gasPrice, 16) * 1.5)
      }
      if (toChain == 'bnbchain') {
        if (parseInt(response.data.result, 16) <= 5000000000) {
          gasPrice = Web3.utils.toHex(5500000000)
        } else {
          gasPrice = Web3.utils.toHex((parseInt(gasPrice, 16) * 1.1).toFixed())
        }
      }
      if (toChain == 'arbitrum') {
        gasPrice = Web3.utils.toHex((parseInt(gasPrice, 16) * 1.1).toFixed());
        accessLogger.info(`${toChain} = ArbGasPrice = ${parseInt(gasPrice, 16)}`)
      }
      return gasPrice
    } catch (error) {
      getLoggerService(toChain).info(`gasPrice error ${error.message}`)
      if (toChain == "polygon" || toChain == "polygon_test") {
        return Web3.utils.toHex(200000000000);
      }
      return Web3.utils.toHex(
        Web3.utils.toWei(consulConfig.maker[toChain].gasPrice + '', 'gwei')
      )
    }
  }
}

// SendQueue
const sendQueue = new SendQueue()
export async function sendConsumer(value: any) {
  let {
    makerAddress,
    toAddress,
    toChain,
    chainID,
    tokenInfo,
    tokenAddress,
    amountToSend,
    result_nonce,
    fromChainID,
    lpMemo,
    ownerAddress,
    transactionID
  } = value;
  const accessLogger = getLoggerService(chainID)
  const chainTransferMap = transfers.get(String(fromChainID))
  if (
    chainTransferMap?.has(transactionID)
  ) {
     accessLogger.error(
      `sendConsumer ${transactionID} transfer exists!`
    )
    return {
      code: 1,
      error:`sendConsumer ${transactionID} transfer exists!`,
      result_nonce,
      params: value
    }
  }
  chainTransferMap?.set(transactionID, 'ok');
  accessLogger.info(`[${transactionID}] consume tx ${JSON.stringify(value)}`)
  // zk || zk_test
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
        syncProvider = await zksync.Provider.newHttpProvider(
          'https://goerli-api.zksync.io/jsrpc'
        )
      }
      const ethWallet = new ethers.Wallet(
          consulConfig.maker.privateKeys[makerAddress.toLowerCase()]
      ).connect(ethProvider)
      const syncWallet = await zksync.Wallet.fromEthSigner(
        ethWallet,
        syncProvider
      )
      let tokenBalanceWei = await syncWallet.getBalance(
        isEthTokenAddress(tokenAddress) ? 'ETH' : tokenAddress,
        'committed'
      )
      if (!tokenBalanceWei) {
        accessLogger.error('zk Insufficient balance 0')
        return {
          code: 1,
          txid: 'ZK Insufficient balance 0',
          params: value
        }
      }
      accessLogger.info(`zk_tokenBalance = ${tokenBalanceWei.toString()}`)
      if (BigInt(tokenBalanceWei.toString()) < BigInt(amountToSend)) {
        accessLogger.error('zk Insufficient balance')
        return {
          code: 1,
          txid: 'zk Insufficient balance',
          params: value
        }
      }

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
        accessLogger.info(`zk_nonce =${zk_nonce}`)
        accessLogger.info(`zk_sql_nonce = ${zk_sql_nonce}`)
        accessLogger.info(`result_nonde = ${result_nonce}`)
      }

      // let zk_fee: string | undefined
      // if (isEthTokenAddress(tokenAddress)) {
      //   let zk_totalFee = (
      //     await (<zksync.Provider>syncProvider).getTransactionFee(
      //       'Transfer',
      //       toAddress,
      //       tokenAddress
      //     )
      //   ).totalFee
      //   zk_totalFee = zk_totalFee.add(30000000000000)

      //   zk_fee = zksync.closestPackableTransactionFee(zk_totalFee) + ''
      // }

      const transfer = await syncWallet.syncTransfer({
        to: toAddress,
        token: tokenAddress,
        nonce: result_nonce,
        amount,
      })

      if (!has_result_nonce) {
        if (!nonceDic[makerAddress]) {
          nonceDic[makerAddress] = {}
        }

        nonceDic[makerAddress][chainID] = result_nonce
      }

      return new Promise((resolve, reject) => {
        if (transfer.txHash) {
          resolve({
            code: 0,
            txid: transfer.txHash,
            zkProvider: syncProvider,
            chainID: chainID,
            zkNonce: result_nonce,
            params: value
          })
        } else {
          resolve({
            code: 1,
            error: 'zk transfer error',
            result_nonce,
            params: value
          })
        }
      })
    } catch (error) {
      return {
        code: 1,
        txid: error,
        result_nonce,
        params: value
      }
    }
    return
  }
  // starknet || starknet_test
  if (chainID == 4 || chainID == 44) {
      const privateKey = consulConfig.maker.privateKeys[makerAddress.toLowerCase()];
      const network = equals(chainID, 44) ? 'goerli-alpha' : 'mainnet-alpha';
    const starknet = new StarknetHelp(<any>network, privateKey, makerAddress);
    const queueList = await starknet.getTask();
    if (queueList.find(item => item.params?.transactionID === transactionID)) {
      accessLogger.info(`TransactionID was exist: ${transactionID}`);
      return {
        code: 1,
        error: `starknet transfer error: TransactionID was exist ${transactionID}`,
        params: value
      };
    } else {
      const queue = {
        createTime: new Date().valueOf(),
        params: value,
        signParam: {
          recipient: toAddress,
          tokenAddress,
          amount: String(amountToSend)
        }
      };
      queueList.push(queue);
      await starknet.pushTask([queue]);
    }
    accessLogger.info(`result_nonde = ${result_nonce}`);
    accessLogger.info(`starknet_queue_count = ${queueList.length}`);
    return {
      code: 2,
      params: value
    }
  }

  // immutablex || immutablex_test
  if (chainID == 8 || chainID == 88) {
    try {
      const imxHelper = new IMXHelper(chainID)
      const imxClient = await imxHelper.getImmutableXClient(makerAddress)

      // Warnning: The nonce value of immutablex currently has no substantial effect
      const has_result_nonce = result_nonce > 0
      if (!has_result_nonce) {
        const imx_nonce = 0
        let imx_sql_nonce = nonceDic[makerAddress]?.[chainID]
        if (!imx_sql_nonce) {
          result_nonce = imx_nonce
        } else {
          if (imx_nonce > imx_sql_nonce) {
            result_nonce = imx_nonce
          } else {
            result_nonce = imx_sql_nonce + 1
          }
        }
        accessLogger.info(`imx_nonce = ${imx_nonce}`)
        accessLogger.info(`imx_sql_nonce = ${imx_sql_nonce}`)
        accessLogger.info(`result_nonde = ${result_nonce}`)
      }
      let imxTokenInfo: any = {
        type: ETHTokenType.ETH,
        data: {
          decimals: 18,
        },
      }
      if (!isEthTokenAddress(tokenAddress)) {
        const market: IMarket | undefined = await getMarket(
          makerAddress,
          tokenAddress,
          fromChainID,
          chainID
        )
        if (!market) {
          return {
            code: 1,
            error: `can't find market makerAddress: ${makerAddress}, tokenAddress: ${tokenAddress}, fromChainID: ${fromChainID}, chainID: ${chainID}`,
            result_nonce,
            params: value
          }
        }
        imxTokenInfo = {
          type: ERC20TokenType.ERC20,
          data: {
            symbol: market.toChain.symbol,
            decimals: market.toChain.decimals,
            tokenAddress: tokenAddress,
          },
        }
      }
      const imxResult = await imxClient.transfer({
        sender: makerAddress,
        token: imxTokenInfo,
        quantity: amountToSend,
        receiver: toAddress,
      })
      const imxHash = imxResult.transfer_id
      if (!has_result_nonce) {
        if (!nonceDic[makerAddress]) {
          nonceDic[makerAddress] = {}
        }
        nonceDic[makerAddress][chainID] = result_nonce
      }

      if (imxHash) {
        return {
          code: 0,
          txid: imxHash,
          chainID: chainID,
          imxNonce: result_nonce,
          params: value
        }
      } else {
        return {
          code: 1,
          error: 'immutablex transfer error',
          result_nonce,
          params: value
        }
      }
    } catch (error) {
      return {
        code: 1,
        txid: 'immutablex transfer error: ' + error.message,
        result_nonce,
        params: value
      }
    }
  }

  if (chainID == 9 || chainID == 99) {
    const provider = new PrivateKeyProvider(
        consulConfig.maker.privateKeys[makerAddress.toLowerCase()],
      chainID == 9
        ? consulConfig.maker['mainnet'].httpEndPoint
        : 'https://eth-goerli.alchemyapi.io/v2/fXI4wf4tOxNXZynELm9FIC_LXDuMGEfc'
    )
    try {
      let netWorkID = chainID == 9 ? 1 : 5
      const exchangeApi = new ExchangeAPI({ chainId: netWorkID })
      const userApi = new UserAPI({ chainId: netWorkID })
      let GetAccountRequest = {
        owner: makerAddress,
      }
      let accountInfo
      let AccountResult = await exchangeApi.getAccount(GetAccountRequest)
      if (AccountResult.accInfo && AccountResult.raw_data) {
        accountInfo = AccountResult.accInfo
      } else {
        throw Error('account unlocked')
      }
      const { exchangeInfo } = await exchangeApi.getExchangeInfo()
      const localWeb3 = new Web3(provider)
      let options = {
        web3: localWeb3,
        address: accountInfo.owner,
        keySeed:
          accountInfo.keySeed && accountInfo.keySeed !== ''
            ? accountInfo.keySeed
            : GlobalAPI.KEY_MESSAGE.replace(
              '${exchangeAddress}',
              exchangeInfo.exchangeAddress
            ).replace('${nonce}', (accountInfo.nonce - 1).toString()),
        walletType: ConnectorNames.Unknown,
        chainId: chainID == 99 ? ChainId.GOERLI : ChainId.MAINNET,
      }
      const eddsaKey = await generateKeyPair(options)
      let GetUserApiKeyRequest = {
        accountId: accountInfo.accountId,
      }
      const { apiKey } = await userApi.getUserApiKey(
        GetUserApiKeyRequest,
        eddsaKey.sk
      )
      if (!apiKey) {
        throw Error('Get Loopring ApiKey Error')
      }
      // step 3 get storageId
      const GetNextStorageIdRequest = {
        accountId: accountInfo.accountId,
        sellTokenId: tokenInfo.id,
      }
      const storageId = await userApi.getNextStorageId(
        GetNextStorageIdRequest,
        apiKey
      )
      const has_result_nonce = result_nonce > 0
      if (!has_result_nonce) {
        let lp_nonce = storageId.offchainId
        let lp_sql_nonce = nonceDic[makerAddress]?.[chainID]
        if (!lp_sql_nonce) {
          result_nonce = lp_nonce
        } else {
          if (lp_nonce > lp_sql_nonce) {
            result_nonce = lp_nonce
          } else {
            result_nonce = lp_sql_nonce + 2
          }
        }
        accessLogger.info(`lp_nonce = ${lp_nonce}`)
        accessLogger.info(`lp_sql_nonce = ${lp_sql_nonce}`)
        accessLogger.info(`result_nonce = ${result_nonce}`)
      }
      const ts = Math.round(new Date().getTime() / 1000) + 30 * 86400
      // step 4 transfer
      const OriginTransferRequestV3 = {
        exchange: exchangeInfo.exchangeAddress,
        payerAddr: makerAddress,
        payerId: accountInfo.accountId,
        payeeAddr: toAddress,
        payeeId: 0,
        storageId: result_nonce,
        token: {
          tokenId: tokenInfo.id,
          volume: amountToSend + '',
        },
        maxFee: {
          tokenId: 0,
          volume: '940000000000000',
        },
        validUntil: ts,
        memo: lpMemo,
      }
      const transactionResult = await userApi.submitInternalTransfer({
        request: <any>OriginTransferRequestV3,
        web3: <any>localWeb3,
        chainId: chainID == 99 ? ChainId.GOERLI : ChainId.MAINNET,
        walletType: ConnectorNames.Unknown,
        eddsaKey: eddsaKey.sk,
        apiKey: apiKey,
        isHWAddr: false,
      })
      if (!has_result_nonce) {
        if (!nonceDic[makerAddress]) {
          nonceDic[makerAddress] = {}
        }
        nonceDic[makerAddress][chainID] = result_nonce
      }
      return new Promise((resolve, reject) => {
        if (transactionResult['hash']) {
          resolve({
            code: 0,
            txid: transactionResult['hash'],
            makerAddress: makerAddress,
            lpNonce: result_nonce,
            params: value
          })
        } else {
          resolve({
            code: 1,
            error: 'loopring transfer error',
            result_nonce,
            params: value
          })
        }
      })
    } catch (error) {
      return {
        code: 1,
        txid: 'loopring transfer error: ' + error.message,
        result_nonce,
        params: value
      }
    } finally {
      // Stop web3-provider-engine. Prevent data from being pulled all the time
      provider.engine.stop()
    }
    return
  }

  // dydx || dydx_test
  if (chainID == 11 || chainID == 511) {
    try {
      const dydxWeb3 = new Web3()
      dydxWeb3.eth.accounts.wallet.add(
          consulConfig.maker.privateKeys[makerAddress.toLowerCase()]
      )
      const dydxHelper = new DydxHelper(chainID, dydxWeb3)
      const dydxClient = await dydxHelper.getDydxClient(
        makerAddress,
        true,
        true
      )
      const dydxAccount = await dydxHelper.getAccount(makerAddress)

      // Warnning: The nonce value of dydx currently has no substantial effect
      const has_result_nonce = result_nonce > 0
      if (!has_result_nonce) {
        const dydx_nonce = 0
        let dydx_sql_nonce = nonceDic[makerAddress]?.[chainID]
        if (!dydx_sql_nonce) {
          result_nonce = dydx_nonce
        } else {
          if (dydx_nonce > dydx_sql_nonce) {
            result_nonce = dydx_nonce
          } else {
            result_nonce = dydx_sql_nonce + 1
          }
        }
        accessLogger.info(`dydx_nonce = ${dydx_nonce}`)
        accessLogger.info(`dydx_sql_nonce = ${dydx_sql_nonce}`)
        accessLogger.info(`result_nonde = ${result_nonce}`)
      }

      const dydxToInfo = dydxHelper.splitStarkKeyPositionId(toAddress)

      if (!dydxToInfo.starkKey || !dydxToInfo.positionId) {
        throw new Error(
          `dYdX can't split starkKey positionId from toAddress: ${toAddress}`
        )
      }

      const params = {
        clientId: dydxHelper.generateClientId(ownerAddress),
        amount: new BigNumber(amountToSend).dividedBy(10 ** 6).toString(), // Only usdc now!
        expiration: new Date(
          new Date().getTime() + 86400000 * 30
        ).toISOString(),
        receiverAccountId: dydxHelper.getAccountId(ownerAddress),
        receiverPublicKey: dydxToInfo.starkKey,
        receiverPositionId: String(dydxToInfo.positionId),
      }
      const dydxResult = await dydxClient.private.createTransfer(
        params,
        dydxAccount.positionId
      )

      const dydxHash = dydxResult.transfer.id
      if (!has_result_nonce) {
        if (!nonceDic[makerAddress]) {
          nonceDic[makerAddress] = {}
        }
        nonceDic[makerAddress][chainID] = result_nonce
      }

      if (dydxHash) {
        return {
          code: 0,
          txid: dydxHash,
          chainID: chainID,
          dydxNonce: result_nonce,
          params: value
        }
      } else {
        return {
          code: 1,
          error: 'dYdX transfer error',
          result_nonce,
          params: value
        }
      }
      return
    } catch (error) {
      return {
        code: 1,
        txid: 'dYdX transfer error: ' + error.message,
        result_nonce,
        params: value
      }
    }
  }

  // zkspace || zkspace_test
  if (chainID == 12 || chainID == 512) {
    try {
      const wallet = new ethers.Wallet(
          consulConfig.maker.privateKeys[makerAddress.toLowerCase()]
      )
      const msg =
        'Access ZKSwap account.\n\nOnly sign this message for a trusted client!'
      const signature = await wallet.signMessage(msg)
      const seed = ethers.utils.arrayify(signature)
      const privateKey = await zksync.crypto.privateKeyFromSeed(seed)
      let balanceInfo = await zkspace_help.getZKSBalance({
        account: makerAddress,
        localChainID: chainID,
      })
      if (
        !balanceInfo ||
        !balanceInfo.length ||
        balanceInfo.findIndex((item) => item.id == tokenInfo.id) == -1
      ) {
        accessLogger.error('zks Insufficient balance 0')
        return {
          code: 1,
          txid: 'ZKS Insufficient balance 0',
          params: value
        }
      }
      let defaultIndex = balanceInfo.findIndex(
        (item) => item.id == tokenInfo.id
      )
      const tokenBalanceWei =
        balanceInfo[defaultIndex].amount * 10 ** tokenInfo.decimals
      if (!tokenBalanceWei) {
        accessLogger.error('zks Insufficient balance 00')
        return {
          code: 1,
          txid: 'ZKS Insufficient balance 00',
          params: value
        }
      }
      accessLogger.info(`zks_tokenBalance = ${tokenBalanceWei.toString()}`)
      if (BigInt(tokenBalanceWei.toString()) < BigInt(amountToSend)) {
        accessLogger.error('zks Insufficient balance')
        return {
          code: 1,
          txid: 'ZKS Insufficient balance',
          params: value
        }
      }

      const transferValue =
        zksync.utils.closestPackableTransactionAmount(amountToSend)

      //here has changed a lager from old
      let accountInfo = await zkspace_help.getNormalAccountInfo(
        wallet,
        privateKey,
        chainID,
        makerAddress
      )

      const tokenId = tokenInfo.id
      const feeTokenId = 0
      const zksNetworkID =
        chainID === 512
          ? consulConfig.maker.zkspace_test.api.chainID
          : consulConfig.maker.zkspace.api.chainID
      let fee = await zkspace_help.getZKSTransferGasFee(chainID, makerAddress)
      const transferFee = zksync.utils.closestPackableTransactionFee(
        ethers.utils.parseUnits(fee.toString(), 18)
      )
      //note:old was changed  here

      let sql_nonce = nonceDic[makerAddress]?.[chainID]
      if (!sql_nonce) {
        result_nonce = accountInfo.nonce
      } else {
        if (accountInfo.nonce > sql_nonce) {
          result_nonce = accountInfo.nonce
        } else {
          result_nonce = sql_nonce + 1
        }
      }

      if (!nonceDic[makerAddress]) {
        nonceDic[makerAddress] = {}
      }
      nonceDic[makerAddress][chainID] = result_nonce
      accessLogger.info(`zks_nonce = ${accountInfo.nonce}`)
      accessLogger.info(`zks_sql_nonce = ${sql_nonce}`)
      accessLogger.info(`zks_result_nonce = ${result_nonce}`)

      const msgBytes = ethers.utils.concat([
        '0x05',
        zksync.utils.numberToBytesBE(accountInfo.id, 4),
        makerAddress,
        toAddress,
        zksync.utils.numberToBytesBE(tokenId, 2),
        zksync.utils.packAmountChecked(transferValue),
        zksync.utils.numberToBytesBE(feeTokenId, 1),
        zksync.utils.packFeeChecked(transferFee),
        zksync.utils.numberToBytesBE(zksNetworkID, 1),
        zksync.utils.numberToBytesBE(result_nonce, 4),
      ])
      const signaturePacked = sign_musig(privateKey, msgBytes)
      const pubKey = ethers.utils
        .hexlify(signaturePacked.slice(0, 32))
        .substr(2)
      const l2Signature = ethers.utils
        .hexlify(signaturePacked.slice(32))
        .substr(2)
      const tx = {
        accountId: accountInfo.id,
        to: toAddress,
        tokenSymbol: tokenInfo.symbol,
        tokenAmount: ethers.utils.formatUnits(
          transferValue,
          tokenInfo.decimals
        ),
        feeSymbol: 'ETH',
        fee: fee.toString(),
        zksNetworkID,
        nonce: result_nonce,
      }
      const l2Msg =
        `Transfer ${tx.tokenAmount} ${tx.tokenSymbol}\n` +
        `To: ${tx.to.toLowerCase()}\n` +
        `Chain Id: ${tx.zksNetworkID}\n` +
        `Nonce: ${tx.nonce}\n` +
        `Fee: ${tx.fee} ${tx.feeSymbol}\n` +
        `Account Id: ${tx.accountId}`
      const ethSignature = await wallet.signMessage(l2Msg)
      const txParams = {
        type: 'Transfer',
        accountId: accountInfo.id,
        from: makerAddress,
        to: toAddress,
        token: tokenId,
        amount: transferValue.toString(),
        feeToken: feeTokenId,
        fee: transferFee.toString(),
        chainId: zksNetworkID,
        nonce: result_nonce,
        signature: {
          pubKey: pubKey,
          signature: l2Signature,
        },
      }
      const req = {
        signature: {
          type: 'EthereumSignature',
          signature: ethSignature,
        },
        fastProcessing: false,
        tx: txParams,
      }
      let transferResult = await axios.post(
        (chainID === 512
          ? consulConfig.maker.zkspace_test.api.endPoint
          : consulConfig.maker.zkspace.api.endPoint) + '/tx',
        {
          signature: req.signature,
          fastProcessing: req.fastProcessing,
          tx: req.tx,
        }
      )
      const txHash = transferResult.data.data.replace('sync-tx:', '0x')
      await zkspace_help.getFristTransferResult(chainID, txHash)
      nonceDic[makerAddress][chainID] = result_nonce
      return {
        code: 0,
        txid: transferResult?.data?.data,
        chainID: chainID,
        zksNonce: result_nonce,
        params: value
      }
    } catch (error) {
      return {
        code: 1,
        txid: 'zkspace transfer error: ' + error.message,
        result_nonce,
        params: value
      }
    }
  }
  let web3Net = ''
  if (consulConfig.maker[toChain]) {
    web3Net =
        consulConfig.maker[toChain].httpEndPointInfura ||
        consulConfig.maker[toChain].httpEndPoint
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
      tokenContract = new web3.eth.Contract(<any>consulConfig.maker.ABI, tokenAddress)
      tokenBalanceWei = await tokenContract.methods
        .balanceOf(web3.eth.defaultAccount)
        .call({
          from: web3.eth.defaultAccount,
        })
    }
  } catch (error) {
    accessLogger.error(`tokenBalanceWeiError = ${error}`)
  }

  if (!tokenBalanceWei) {
    accessLogger.error(`${toChain}->!tokenBalanceWei Insufficient balance`)
    // return {
    //   code: 1,
    //   txid: `${toChain}->!tokenBalanceWei Insufficient balance`,
    // }
  }
  accessLogger.info(`tokenBalanceWei =${tokenBalanceWei}`)
  if (tokenBalanceWei && BigInt(tokenBalanceWei) < BigInt(amountToSend)) {
    accessLogger.error(
      `${toChain}->tokenBalanceWei<amountToSend Insufficient balance`
    )
    return {
      code: 1,
      txid: `${toChain}->tokenBalanceWei<amountToSend Insufficient balance`,
      params: value
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
        params: value
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
    accessLogger.info(`read nonceDic:${JSON.stringify(nonceDic)}`)
    if (!sql_nonce) {
      result_nonce = nonce
    } else {
      if (nonce > sql_nonce) {
        result_nonce = nonce
      } else {
        result_nonce = sql_nonce + 1
      }
    }

    // zkera
    // if (chainID == 14 || chainID == 514) {
    //   try {
    //     const actNonce = await web3.eth.getTransactionCount(
    //         <any>web3.eth.defaultAccount
    //     );
    //     accessLogger.info('zkera pending_nonce =', nonce);
    //     accessLogger.info('zkera act_nonce =', actNonce);
    //     accessLogger.info('zkera sql_nonce =', sql_nonce);
    //     accessLogger.info('zkera result_nonce =', result_nonce);
    //     if (result_nonce - actNonce > 19) {
    //       accessLogger.info(`zkera result_nonce - actNonce > 19, retry after 10 seconds.`);
    //       // await sleep(30000);
    //       // return await sendConsumer({ ...value, result_nonce: 0 });
    //     }
    //   } catch (err) {
    //     return {
    //       code: 1,
    //       txid: 'zkera getTransactionCount failed: ' + err.message,
    //       params: value
    //     };
    //   }
    // }

    if (!nonceDic[makerAddress]) {
      nonceDic[makerAddress] = {}
    }
    nonceDic[makerAddress][chainID] = result_nonce
    accessLogger.info(`nonce = ${nonce}`)
    accessLogger.info(`sql_nonce = ${sql_nonce}`)
    accessLogger.info(`result_nonde = ${result_nonce}`)
  }

  /**
   * Fetch the current transaction gas prices from https://ethgasstation.info/
   */
  let maxPrice = 230
  if (isEthTokenAddress(tokenAddress)) {
    if (chainID == 1 || chainID == 5) {
      maxPrice = 260;
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
  const gasPrices = await getCurrentGasPrices(
    toChain,
    // isEthTokenAddress(tokenAddress) ? maxPrice : undefined
    maxPrice
  )
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
  if (toChain === 'arbitrum_test' || toChain === 'arbitrum') {
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
      gasLimit = Math.ceil(Number(gasLimit) * 1.5)
    } catch (error) {
      gasLimit = 1000000
    }
    accessLogger.info(`arGasLimit = ${gasLimit}`)
  }
  if (toChain === 'zksync2_test' || toChain === 'zksync2') {
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
    } catch (error) {
      gasLimit = 1000000
    }
    accessLogger.info(`arGasLimit = ${gasLimit}`)
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
  if ([1, 5,7,77].includes(chainID)) {
   try {
      // eip 1559 send
      const networkId = consulConfig.maker[toChain]?.customChainId
      details['chainId'] = networkId;
      const config = chains.getChainInfo(Number(chainID));
      if (config && config.rpc.length <= 0) {
        throw new Error('Missing RPC configuration')
      }
      const httpsProvider = new ethers.providers.JsonRpcProvider(web3Net)
      // let feeData = await httpsProvider.getFeeData();
      // if (feeData) {
      delete details['gasPrice']
      delete details['gas']

      if ([1, 5].includes(chainID)) {
        let maxPriorityFeePerGas = 1000000000
        try {
          if (config && config.rpc.length > 0 && web3Net.includes('alchemyapi')) {
            const alchemyMaxPriorityFeePerGas = await httpsProvider.send("eth_maxPriorityFeePerGas", []);
            if (Number(alchemyMaxPriorityFeePerGas) > maxPriorityFeePerGas) {
              maxPriorityFeePerGas = alchemyMaxPriorityFeePerGas
            }
          }
        } catch (error) {
          accessLogger.error(`eth_maxPriorityFeePerGas error ${error.message}`)
        }
        details['maxPriorityFeePerGas'] = web3.utils.toHex(maxPriorityFeePerGas)
        details['maxFeePerGas'] = web3.utils.toHex(maxPrice * 10 ** 9)
      }

      if ([7, 77].includes(chainID)) {
        const opGasPrice = await httpsProvider.getGasPrice();
        details['maxPriorityFeePerGas'] = opGasPrice.toHexString();
        details['maxFeePerGas'] = opGasPrice.mul(5).toHexString();

        if (config && config.rpc.length > 0 && web3Net.includes('alchemyapi')) {
          try {
            const feeData = await httpsProvider.getFeeData();
            details['maxPriorityFeePerGas'] = feeData.maxPriorityFeePerGas?.mul(2).toHexString();
          } catch (error) {
            accessLogger.error(`eth_maxPriorityFeePerGas error ${error.message}`)
          }
        }
      }

      details['gasLimit'] = web3.utils.toHex(gasLimit)
      details['type'] = 2
      const wallet = new ethers.Wallet(
        Buffer.from(consulConfig.maker.privateKeys[makerAddress.toLowerCase()], 'hex')
      )
      const signedTx = await wallet.signTransaction(details)
      const resp = await httpsProvider.sendTransaction(signedTx)
      return {
        code: 0,
        txid: resp.hash,
        params: value
      }
      // }
    } catch (err) {
      nonceDic[makerAddress][chainID] = result_nonce - 1
      return {
        code: 1,
        txid: err,
        result_nonce,
        params: value
      }
    }
  }
  let transaction: EthereumTx
  if (consulConfig.maker[toChain]?.customChainId) {
    const networkId = consulConfig.maker[toChain]?.customChainId
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

  /**
   * This is where the transaction is authorized on your behalf.
   * The private key is what unlocks your wallet.
   */
  transaction.sign(
    Buffer.from(consulConfig.maker.privateKeys[makerAddress.toLowerCase()], 'hex')
  )
  accessLogger.info(`send transaction = ${JSON.stringify(details)}`)
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
          params: value
        })
      })
      .on('receipt', (tx: any) => {
        accessLogger.info(`send transaction receipt= ${JSON.stringify(tx)}`)
      })
      .on('error', async (err: any) => {
        const result = {
          code: 1,
          txid: err,
          error: err,
          result_nonce,
          params: value,
          sms: true
        }
        nonceDic[makerAddress][chainID] = result_nonce - 1;
        accessLogger.error(`${chainID}-${transactionID} sendSignedTransaction error rollback nonce: ${nonceDic[makerAddress][chainID]}, errmsg: ${err.message}`);
        if (chainID == 14 || chainID == 514) {
          const msg = typeof err === "object" ? (err?.message ? err.message : JSON.stringify(err)) : err;
          if (msg.indexOf('nonce too high. allowed nonce range') !== -1) {
            accessLogger.info('zkera nonce too high. allowed nonce range, wait for 30s');
            result.sms =false;
            await sleep(15000);
            // remove exist cache
            chainTransferMap?.delete(transactionID);
            //
            chainQueue[Number(chainID)].enqueue(transactionID, value).catch(error => {
              errorLogger.warn(`retry enqueue error: ${error}`);
            });
          }
        }
        resolve(result)
      })
  })
}

/**
 * This is the process that will run when you execute the program.
 * @param makerAddress
 * @param toAddress
 * @param toChain
 * @param chainID
 * @param tokenID
 * @param tokenAddress
 * @param amountToSend
 * @param result_nonce
 * @param fromChainID
 * @param lpMemo
 * @param ownerAddress // When cross address transfer will ownerAddress != toAddress, else ownerAddress == toAddress
 * @returns
 */
async function send(
  makerAddress: string,
  toAddress,
  toChain,
  chainID,
  tokenInfo, // 12 512 use
  tokenAddress,
  amountToSend,
  result_nonce = 0,
  fromChainID,
  lpMemo,
  ownerAddress = ''
): Promise<any> {
  sendQueue.registerConsumer(chainID, sendConsumer)
  return new Promise((resolve, reject) => {
    const value = {
      makerAddress,
      toAddress,
      toChain,
      chainID,
      tokenInfo,
      tokenAddress,
      amountToSend,
      result_nonce,
      fromChainID,
      lpMemo,
      ownerAddress,
    }
    const accessLogger = getLoggerService(chainID)
    sendQueue.produce(chainID, {
      value,
      callback: (error, result) => {
        if (error) {
          accessLogger.error(`sendQueue exec produce error:${error.message}`)
          reject(error)
        } else {
          resolve(result)
        }
      },
    })
  })
}

export default send
