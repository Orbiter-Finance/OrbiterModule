import Web3 from 'web3'
import { defaultRpc, contract_obj } from './index'

/**
 * @param {String} accounts address
 * @param {Object} params data {name: "", value: 0, contractName: '', contractName: '' , arguments: [...]}
 */
export const contractMethod = async (accounts, params) => {
    const web3 = await new Web3(defaultRpc());
    const contract = await contract_obj(params.contractName, params.contractAddr)
    const nonce =  await web3.eth.getTransactionCount(accounts)
    const gasPrice = await web3.eth.getGasPrice()
    const value = params.value ? params.value : 0
    const parameters = params.arguments.length === 0 ? null : params.arguments
    const data = parameters == null ? await contract.methods[params.name]().encodeABI() : await contract.methods[params.name](...parameters).encodeABI()
    console.log('data abi ==>', data)
    let gasLimit = parameters == null ? await contract.methods[params.name]().estimateGas({from: accounts, to: params.contractAddr,gasPrice: web3.utils.toHex(gasPrice), value: web3.utils.toHex(value)}) : await contract.methods[params.name](...parameters).estimateGas({from: accounts, to: params.contractAddr, gasPrice: web3.utils.toHex(gasPrice), value: web3.utils.toHex(value)})
    if (gasLimit < 210000) {
        gasLimit = 210000
    } else {
        gasLimit = parseInt(gasLimit * 1.3 + '')
    }
    console.log("gaslimit ==>", gasLimit)

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
            to: params.contractAddr,
            value: web3.utils.toHex(value),
            data
        }]
        console.log('param ==>', param)
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
                        if (number_takeGain > 20) {
                            callback("timeout")
                            clearInterval(timer_takeGain);
                            number_takeGain = 1;
                        }
                    }, 3000)
                }
            }).catch(err => {
                callback('refuse', err)
            })
        }
    })
}

