import { defaultChainInfo } from './'
import utils  from 'web3'
import { ElNotification } from 'element-plus'

export const linkNetwork = async () => {
    const ethereum = (window as any).ethereum
    if (!ethereum) {
        return false
    }
    const chainInfo = defaultChainInfo()
    if (ethereum.networkVersion != utils.utils.toHex(chainInfo.chainid + '')) {
        try {
            await ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: utils.utils.toHex(chainInfo.chainid + '') }],
            });
            return true
        } catch (switchError) {
            if (switchError.code === 4902) {
                const result = await ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [
                        {
                            chainId: utils.utils.toHex(chainInfo.chainid + ''),
                            chainName: chainInfo.name,
                            nativeCurrency: {
                                name: chainInfo.symbol,
                                symbol: chainInfo.symbol,
                                decimals: chainInfo.decimals
                            },
                            rpcUrls: [chainInfo.rpcUrls],
                            blockExplorerUrls: [chainInfo.blockExplorerUrls]
                        }
                    ]
                }).catch(err => {
                    ElNotification({
                        title: 'Error',
                        message: `${err.message}`,
                        type: 'error',
                    })
                    return false
                })
                return result;
            } else {
                return false
            }
        }
    } else {
        return true
    }
}