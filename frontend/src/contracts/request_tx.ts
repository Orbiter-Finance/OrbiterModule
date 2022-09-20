import Web3 from 'web3'
import { defaultRpc } from './index'

/**
 * @param {String} accounts address
 * @param {Object} contractAddr address
 * @param {Object} params data {name: "", value: 0, inputs:[{}...], arguments: [...]}
 */
export const contractMethod = async (accounts, contractAddr, params) => {
    const web3 = await new Web3(defaultRpc as any);
    const data = web3.eth.abi.encodeFunctionCall({
        name: params.name,
        type: "function",
        inputs: params.inputs,
    }, params.arguments);
    const nonce =  await web3.eth.getTransactionCount(accounts)
    const gasPrice = await web3.eth.getGasPrice()
    const value = params.value ? params.value : 0
    let gasLimit = 0
    await web3.eth.estimateGas({
        nonce,
        from: accounts, 
        to: contractAddr, 
        gasPrice: web3.utils.numberToHex(gasPrice),
        value: web3.utils.toHex(value),
        data,
    }).then(res => {
        gasLimit = res
    }).catch(err => {
        throw new Error(err)
    })

    
    return new Promise((resolve, reject) => {

        const callback = (status, hax = null) => {
            if (status === true) {
                resolve({
                    code: 200,
                    hax
                })
            } else if (status === false) {
                reject({
                    code: 111,
                    message: 'Failed transactions'
                })
            } else if (status == "refuse") {
                reject({
                    code: 110,
                    message: 'Deal Rejection'
                })
            } else if (status == "timeout") {
                reject({
                    code: 112,
                    message: 'Transaction Timeout'
                })
            } else if (status == "fail") {
                reject({
                    code: 113,
                    message: 'Failed transactions'
                })
            }
        }
        const param = [{
            nonce: web3.utils.toHex(nonce),
            gasPrice: web3.utils.toHex(gasPrice),
            gas: web3.utils.toHex(gasLimit),
            from: accounts,
            to: contractAddr,
            value: web3.utils.toHex(value),
            data
        }]
        const ethereum = (window as any).ethereum
        if (!ethereum) {
            reject({
                code: 114,
                message: 'Please install metamask wallet first!'
            })
            throw new Error('Please install metamask wallet first!')
        } else {
            ethereum.request({method: 'eth_sendTransaction', params: param}).then(txHash => {
                if (txHash) {
                    let number_takeGain = 1
                    const timer_takeGain = setInterval(() => {
                        number_takeGain++
                        web3.eth.getTransactionReceipt(txHash).then(function (res) {
                            if (res === null) {
                                callback(res)
                            } else if (res.status) {
                                callback(res.status, txHash)
                                clearInterval(timer_takeGain);
                            } else {
                                callback(res.status, txHash)
                                clearInterval(timer_takeGain);
                            }
                        });
                        if (number_takeGain > 10) {
                            callback("timeout")
                            clearInterval(timer_takeGain);
                            number_takeGain = 1;
                        }
                    }, 2000)
                }
            }).catch(err => {
                callback('refuse', err)
            })
        }
    })
}

