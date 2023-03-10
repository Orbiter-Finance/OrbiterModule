import Web3 from 'web3'
import { provider } from 'web3-core'

async function installWeb3() {
  const _window = window as any
  let web3Provider: provider

  // @ts-ingore
  if (_window.ethereum) {
    try {
      web3Provider = _window.ethereum
      await _window.ethereum.enable()
    } catch (error) {
      //   showMessage('User denied account access', 'error')
      return
    }
  } else if (typeof _window.web3 !== 'undefined') {
    // old MetaMask Legacy dapp browsers...
    web3Provider = _window.web3.currentProvider
  } else {
    // showMessage('not install metamask', 'error')
    return
  }
  return new Web3(web3Provider)
}

let networkId = 0
export function setNetworkId(n: number) {
  networkId = n
}
export function getNetworkId(): number {
  return networkId
}

export default async function getWeb3() {
  const web3 = await installWeb3()
  if (!web3) {
    return
  }

  setNetworkId(await web3.eth.net.getId())

  const _window = window as any
  _window.ethereum.autoRefreshOnNetworkChange = false
  _window.ethereum.on('chainChanged', (chainId) => {
    console.log('networkChanged = ' + chainId)
    console.log('networkChanged = ' + parseInt(chainId, 16).toString())
  })
  _window.ethereum.on('accountsChanged', (accounts) => {
    console.log('updateCoinbase = ' + accounts)
  })
}
