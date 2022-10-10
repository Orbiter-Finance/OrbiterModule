import Web3 from 'web3'
import { contractMethod } from './request_tx'
import { linkNetwork } from './metamask'
import { $env } from '@/env'
import { metamaskChains } from '@/configs/chains'

export const defaultRpc = () => {
    const chainid = process.env.VUE_APP_MAKER_CHAIN_ID
    return $env.localProvider[chainid as string];
}
export const defaultChainInfo = () => {
    const chainid = process.env.VUE_APP_MAKER_CHAIN_ID
    const chainsItem = metamaskChains.chainList.filter(item => item.chainId == Number(chainid as string))
    console.log("chainsItem ==>", chainsItem)
    return {
        chainid: chainsItem[0].chainId,
        name: chainsItem[0].name,
        symbol: chainsItem[0].nativeCurrency.symbol,
        decimals: chainsItem[0].nativeCurrency.decimals,
        rpcUrls: $env.localProvider[chainid as string],
        blockExplorerUrls: chainsItem[0].blockExplorerUrls
    }
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
    const web3 = await new Web3(defaultRpc());
    const contractObj = new web3.eth.Contract(contract_addr[name].abi, addr === '' ? contract_addr[name].addr : addr)
    return contractObj
}

export { contractMethod, linkNetwork }

