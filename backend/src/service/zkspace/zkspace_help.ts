import BigNumber from 'bignumber.js'
import { makerConfig } from '../../config'
import axios from 'axios'

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
          if (response.status === 200 && response.statusText == 'OK') {
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
  getZKSTransferGasFee: function (localChainID, account): Promise<Number> {
    let ethPrice = 1000
    return new Promise((resolve, reject) => {
      const url =
        (localChainID === 512
          ? makerConfig.zkspace_test.api.endPoint
          : makerConfig.zkspace.api.endPoint) +
        '/account/' +
        account +
        '/' +
        'fee'
      axios
        .get(url)
        .then(function (response) {
          if (response.status === 200 && response.statusText == 'OK') {
            var respData = response.data
            if (respData.success == true) {
              const gasFee = new BigNumber(respData.data.transfer).dividedBy(
                new BigNumber(ethPrice)
              )
              let gasFee_fix = gasFee.decimalPlaces(6, BigNumber.ROUND_UP)
              resolve(Number(gasFee_fix))
            } else {
              reject(respData.data)
            }
          } else {
            reject('getZKSTransferGasFee NetWorkError')
          }
        })
        .catch(function (error) {
          reject(error)
        })
    })
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
