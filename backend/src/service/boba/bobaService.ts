import Web3 from 'web3'
export default class BobaService {
  private jsonrpc: Web3
  constructor() {
    if (typeof this.jsonrpc !== 'undefined') {
      console.log('init1')
      this.jsonrpc = new Web3(this.jsonrpc.currentProvider)
    } else {
      console.log('ini2')
      // set the provider you want from Web3providers
      // web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/96354c760fd44132816dada905a7fbcf'))
      // web3 = new Web3(new Web3.providers.HttpProvider('http://120.78.213.3:9999'))
      // web3 = new Web3(new Web3.providers.HttpProvider('https://ethje115qd1174d.swtc.top'))
      this.jsonrpc = new Web3('wss://wss.rinkeby.boba.network')
    }
  }
  public watchWeb3Event() {
    // 获取最新快
    const subscription = this.jsonrpc.eth.subscribe(
      'logs',
      {
        address: '0x123456..',
        topics: ['0x12345...'],
      },
      function (error, result) {
        if (!error) console.log(result)
      }
    )
    let i = 0
    setInterval(async () => {
      try {
        const block = await this.jsonrpc.eth.getBlockNumber()
        i++
        console.log('block---', block, '=====index = ', i)
      } catch (e) {
        console.error('异常：', e.message)
        //TODO handle the exception
      }
    }, 2000)
  }
  public async getTransactionByAddress() {}
}
