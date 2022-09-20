import Web3 from 'web3'
import { contractMethod } from './request_tx'

export const defaultRpc = process.env.VUE_APP_CHAIN_RPC
export const defaultChainInfo = {
    chainid: process.env.VUE_APP_CHAIN_ID,
    name: process.env.VUE_APP_CHAIN_NAME,
    symbol: process.env.VUE_APP_CHAIN_SYMBOL,
    decimals: process.env.VUE_APP_CHAIN_DECIMALS,
    rpcUrls: process.env.VUE_APP_CHAIN_RPC,
    blockExplorerUrls: process.env.VUE_APP_CHAIN_BLOCK
}
export const contract_addr = {
    ORMakerDeposit: {
        abi: require('./abis/ORMakerDeposit.json')
    },
    ORMakerV1Factory: {
        addr: process.env.VUE_APP_CONTRACT_ORMAKER_V1FACTORY,
        abi: require('./abis/ORMakerV1Factory.json')
    },
    ORManager: {
        addr: process.env.VUE_APP_CONTRACT_OR_MANAGER,
        abi: require('./abis/ORManager.json')
    },
    ORProtocalV1: {
        abi: require('./abis/ORProtocalV1.json')
    }
}

export const contract_obj = async (name, addr = '') => {
    const web3 = await new Web3(defaultRpc as any);
    const contractObj = new web3.eth.Contract(contract_addr[name].abi, addr === '' ? contract_addr[name].addr : addr)
    return contractObj
}

export { contractMethod }

