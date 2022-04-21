import BigNumber from 'bignumber.js'
import { makerConfig } from '../../config'
import axios from 'axios'
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

  getZKSTransferGasFee: async function (localChainID, account): Promise<Number> {
    //get usd to eth rat
    const usdRates: any = await getExchangeRates()
    let ethPrice = usdRates && usdRates["ETH"] ? 1 / usdRates["ETH"] : 1000

    //get gasfee width eth
    const url = `${localChainID === 512
      ? makerConfig.zkspace_test.api.endPoint
      : makerConfig.zkspace.api.endPoint}/account/${account}/fee`
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
          console.warn('response =', response)
          if (response.status === 200 && response.statusText === 'OK') {
            var respData = response.data
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
