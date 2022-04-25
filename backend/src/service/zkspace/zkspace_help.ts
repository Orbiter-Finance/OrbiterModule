import BigNumber from 'bignumber.js'
import { makerConfig } from '../../config'
import axios from 'axios'
import * as ethers from 'ethers'
import { sleep } from "../../util"
import { private_key_to_pubkey_hash } from 'zksync-crypto'
import { getExchangeRates } from '../coinbase'

export default {
  getZKSBalance: function (req): Promise<any> {
    return new Promise((resolve, reject) => {
      const url =
        (req.localChainID === 512
          ? makerConfig.zkspace_test.api.endPoint
          : makerConfig.zkspace.api.endPoint) +
        '/account/' +
        req.account +
        '/' +
        'balances'
      axios
        .get(url)
        .then(function (response) {
          if (response.status === 200) {
            var respData = response.data
            if (respData.success == true) {
              resolve(respData.data.balances.tokens)
            } else {
              reject(respData.data)
            }
          } else {
            reject('getZKSBalance NetWorkError')
          }
        })
        .catch(function (error) {
          reject(error)
        })
    })
  },

  getZKSTransferGasFee: async function (
    localChainID,
    account
  ): Promise<Number> {
    //get usd to eth rat
    const usdRates: any = await getExchangeRates()
    let ethPrice = usdRates && usdRates['ETH'] ? 1 / usdRates['ETH'] : 1000

    //get gasfee width eth
    const url = `${localChainID === 512
        ? makerConfig.zkspace_test.api.endPoint
        : makerConfig.zkspace.api.endPoint
      }/account/${account}/fee`
    const response = await axios.get(url)
    if (response.status === 200 && response.statusText == 'OK') {
      var respData = response.data
      if (respData.success == true) {
        const gasFee = new BigNumber(respData.data.transfer).dividedBy(
          new BigNumber(ethPrice)
        )
        let gasFee_fix = gasFee.decimalPlaces(6, BigNumber.ROUND_UP)
        return Number(gasFee_fix)
      } else {
        throw new Error(respData.data)
      }
    } else {
      throw new Error('getZKSTransferGasFee NetWorkError')
    }
  },
  async getFristResult(fromChainID, txHash) {
    // return new Promise((resolve, reject) => {
    await sleep(300)
    // setTimeout(async () => {
    const firstResult = await this.getZKSpaceTransactionData(
      fromChainID,
      txHash
    )
    if (
      firstResult.success &&
      !firstResult.data.fail_reason &&
      !firstResult.data.success &&
      !firstResult.data.amount
    ) {
      //tip todo
      await sleep(300)
      await this.getFristResult(fromChainID, txHash)
    } else if (
      firstResult.success &&
      !firstResult.data.fail_reason &&
      firstResult.data.success &&
      firstResult.data.amount
    ) {
      return firstResult
    } else {
      throw new Error('zks sendResult is error, do not care')
    }
    //   }, 300)
    // })
  },
  async getNormalAccountInfo(wallet, privateKey, fromChainID, walletAccount) {
    try {
      const accountInfo = await this.getZKSAccountInfo(
        fromChainID,
        walletAccount
      )
      if (
        accountInfo.pub_key_hash ==
        'sync:0000000000000000000000000000000000000000'
      ) {
        const new_pub_key_hash = await this.registerAccount(
          wallet,
          accountInfo,
          privateKey,
          fromChainID,
          walletAccount
        )
        accountInfo.pub_key_hash = new_pub_key_hash
        accountInfo.nonce = accountInfo.nonce + 1
      }
      return accountInfo
    } catch (error) {
      throw new Error(`getAccountInfo error ${error.message}`)
    }
  },
  async registerAccount(
    wallet,
    accountInfo,
    privateKey,
    fromChainID,
    walletAccount
  ) {
    try {
      const pubKeyHash = ethers.utils
        .hexlify(private_key_to_pubkey_hash(privateKey))
        .substr(2)

      const hexlifiedAccountId = this.toHex(accountInfo.id, 4)

      const hexlifiedNonce = this.toHex(accountInfo.nonce, 4)

      // Don't move here any way and don't format it anyway!!!
      let resgiterMsg = `Register ZKSwap pubkey:

${pubKeyHash}
nonce: ${hexlifiedNonce}
account id: ${hexlifiedAccountId}

Only sign this message for a trusted client!`
      const registerSignature = await wallet.signMessage(resgiterMsg)
      let tx = {
        account: walletAccount,
        accountId: accountInfo.id,
        ethSignature: registerSignature,
        newPkHash: `sync:` + pubKeyHash,
        nonce: 0,
        type: 'ChangePubKey',
      }
      const url = `${fromChainID == 512
          ? makerConfig.zkspace_test.api.endPoint
          : makerConfig.zkspace.api.endPoint
        }/tx`
      let transferResult: any = await axios.post(
        url,
        {
          signature: null,
          fastProcessing: null,
          extraParams: null,
          tx: {
            account: walletAccount,
            accountId: accountInfo.id,
            ethSignature: registerSignature,
            newPkHash: `sync:` + pubKeyHash,
            nonce: 0,
            type: 'ChangePubKey',
          },
        },
        {
          headers: {
            'zk-account': walletAccount,
          },
        }
      )
      if (transferResult.status == 200 && transferResult.data.success) {
        return transferResult.data
      } else {
        throw new Error('registerAccount fail')
      }
    } catch (error) {
      throw new Error(`registerAccount error ${error.message}`)
    }
  },
  toHex(num, length) {
    var charArray = ['a', 'b', 'c', 'd', 'e', 'f']
    let strArr = Array(length * 2).fill('0')
    var i = length * 2 - 1
    while (num > 15) {
      var yushu = num % 16
      if (yushu >= 10) {
        let index = yushu % 10
        strArr[i--] = charArray[index]
      } else {
        strArr[i--] = yushu.toString()
      }
      num = Math.floor(num / 16)
    }

    if (num != 0) {
      if (num >= 10) {
        let index = num % 10
        strArr[i--] = charArray[index]
      } else {
        strArr[i--] = num.toString()
      }
    }
    strArr.unshift('0x')
    var hex = strArr.join('')
    return hex
  },
  getZKSAccountInfo: function (localChainID, account): Promise<any> {
    return new Promise((resolve, reject) => {
      const url =
        (localChainID === 512
          ? makerConfig.zkspace_test.api.endPoint
          : makerConfig.zkspace.api.endPoint) +
        '/account/' +
        account +
        '/' +
        'info'
      axios
        .get(url)
        .then(function (response) {
          if (response.status === 200 && response.statusText == 'OK') {
            var respData = response.data
            if (respData.success == true) {
              resolve(respData.data)
            } else {
              reject(respData.data)
            }
          } else {
            reject('GetZKSAccountInfo NetWorkError')
          }
        })
        .catch(function (error) {
          reject(error)
        })
    })
  },
  getZKSpaceTransactionData: async function (localChainID, txHash) {
    return new Promise((resolve, reject) => {
      if (localChainID !== 12 && localChainID !== 512) {
        reject({
          errorCode: 1,
          errMsg: 'getZKTransactionDataError_wrongChainID',
        })
      }
      const url =
        (localChainID === 512
          ? makerConfig.zkspace_test.api.endPoint
          : makerConfig.zkspace.api.endPoint) +
        '/tx/' +
        txHash
      axios
        .get(url)
        .then(function (response) {
          if (response.status === 200 && response.statusText === 'OK') {
            var respData = response.data
            console.warn('zks respData =', respData)
            if (respData.success === true) {
              resolve(respData)
            } else {
              reject(respData)
            }
          } else {
            reject('NetWorkError')
          }
        })
        .catch(function (error) {
          reject(error)
        })
    })
  },
}
