import { makerConfig, ormConfig } from "../src/config";
import * as ethers from "ethers";
import * as zksync2 from "zksync-web3";
import Web3 from "web3";
import { accessLogger, getLoggerService } from "../src/util/logger";
import { isEmpty } from "orbiter-chaincore/src/utils/core";
import { isEthTokenAddress } from "../src/util";
import { Transaction as EthereumTx } from "ethereumjs-tx";
import Common from "ethereumjs-common";
import axios from "axios";
import { StarknetHelp } from "../src/service/starknet/helper";
import { chainQueue, subscribeNewTransaction } from "../src/util/maker/new_maker";
import { ChainFactory } from "orbiter-chaincore/src/watch/chainFactory";
import { chains } from "orbiter-chaincore";
import { Core } from "../src/util/core";
import { createConnection, Repository } from "typeorm";
import BigNumber from "bignumber.js";
import { MessageQueue } from "../src/util/messageQueue";
import { sendConsumer } from "../src/util/maker/send";
import { sendTxConsumeHandle } from "../src/util/maker";
import { MakerNode } from "../src/model/maker_node";
chains.fill(require("./chain.json"));
const watchGorli = ChainFactory.createWatchChainByIntranetId("5");
const watchAr = ChainFactory.createWatchChainByIntranetId("22");
const watchOp = ChainFactory.createWatchChainByIntranetId("77");
const watchStarknet = ChainFactory.createWatchChainByIntranetId("44");
// const watch = ChainFactory.createWatchChainByIntranetId("44");
// const watch = ChainFactory.createWatchChainByIntranetId("44");

describe('transfer', () => {
  it('subscribe transfer', async () => {
    Core.db = await createConnection(ormConfig.options)
    const chainIdList = [5, 22, 44];
    for (const insideChainId of chainIdList) {
      if (!chainQueue[insideChainId]) {
        chainQueue[insideChainId] = new MessageQueue(`chain:${insideChainId}`, sendConsumer);
        chainQueue[insideChainId].consumeQueue(async (error, result) => {
          if (error) {
            accessLogger.error(`An error occurred while consuming messages`, error);
            return;
          }
          await sendTxConsumeHandle(result);
          return true;
        });
      }
    }
    // const tx: any = await watchGorli.chain.convertTxToEntity(
    //     "0x1c9d7d281eb1e112d70453e4f2fc1c24dcc063a4acc2d2461b8ba01a6a70aca2",
    // );
    // console.log(tx)
    // const tx2: any = await watchGorli.chain.convertTxToEntity(
    //     "0xd5aa1bbe4a8a1ffc0dbddc6e5e4f7ce04a2951542ed07e8fba39e983dcab8e14",
    // );
    const hashList = [
      "0x5c5fd1bc7d91a1853fcc3bd5057fde0b3ac8116ce6884fb88c80411bfa756ba9",
      "0x223b1b8ac29a2a74a4328d157b736ca13339e6ba7e868865a5e21506c52e2e7e",
      "0x3ac8a7a3e962b399c2b341b245332067c90446b7940774d5ddc1ea8a554b060d"];
    const txList: any[] = [];
    for (const hash of hashList) {
      const tx: any = await watchGorli.chain.convertTxToEntity(
          hash,
      );
      txList.push(tx);
    }


    // const list: any[] = [
    //   {
    //     "chainId": "5",
    //     "hash": "0x8c095356330aa498938330ad175b7d740c39e5d9aef8ba0bdba1537c628a6b12",
    //     "nonce": 383,
    //     "blockHash": "0x3e6bab810affdd8864a94a553da5739463124b24284908c69cd6cbb0edf86a03",
    //     "blockNumber": 8815392,
    //     "transactionIndex": 37,
    //     "from": "0x8cd23453623055da8f41f3528154ffcb21d496c2",
    //     "to": "0x0043d60e87c5dd08c86c3123340705a1556c4719",
    //     "value": "6000000000009044",
    //     "symbol": "ETH",
    //     "gasPrice": 104083856772,
    //     "gas": 34964,
    //     "input": "0x297235110000000000000000000000000043d60e87c5dd08c86c3123340705a1556c4719000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000210302379d9a1a1fd2c85d66457c7bc6bfd28215732cde1ba0f9a8f7a30e10bb848900000000000000000000000000000000000000000000000000000000000000",
    //     "status": 1,
    //     "tokenAddress": "0x0000000000000000000000000000000000000000",
    //     "timestamp": 1681269348,
    //     "fee": "3639187968176208",
    //     "feeToken": "ETH",
    //     "extra": {
    //       "accessList": [],
    //       "blockHash": "0x3e6bab810affdd8864a94a553da5739463124b24284908c69cd6cbb0edf86a03",
    //       "blockNumber": 8815392,
    //       "chainId": "0x5",
    //       "from": "0x8cd23453623055DA8f41f3528154ffCb21D496c2",
    //       "gas": "39948",
    //       "maxFeePerGas": "136450530244",
    //       "maxPriorityFeePerGas": "1500000000",
    //       "r": "0xd0ef3256eb971b0f1a9cadefb492e1f10d0c035bbfe9945b9d2228dc991728be",
    //       "s": "0x236b3e7c8a1f581b57d3ce7450512a7e9cdeec4a0badb1dacd170527db2a7ec6",
    //       "to": "0xD9D74a29307cc6Fc8BF424ee4217f1A587FBc8Dc",
    //       "transactionIndex": 37,
    //       "type": 2,
    //       "v": "0x0",
    //       "ext": "0x0302379d9a1a1fd2c85d66457c7bc6bfd28215732cde1ba0f9a8f7a30e10bb8489"
    //     },
    //     "source": "rpc",
    //     "confirmations": 814,
    //     "receipt": {
    //       "blockHash": "0x3e6bab810affdd8864a94a553da5739463124b24284908c69cd6cbb0edf86a03",
    //       "blockNumber": 8815392,
    //       "contractAddress": null,
    //       "cumulativeGasUsed": 3128173,
    //       "effectiveGasPrice": 104083856772,
    //       "from": "0x8cd23453623055da8f41f3528154ffcb21d496c2",
    //       "gasUsed": 34964,
    //       "logs": [],
    //       "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
    //       "status": true,
    //       "to": "0xd9d74a29307cc6fc8bf424ee4217f1a587fbc8dc",
    //       "transactionHash": "0x8c095356330aa498938330ad175b7d740c39e5d9aef8ba0bdba1537c628a6b12",
    //       "transactionIndex": 37,
    //       "type": "0x2"
    //     }
    //   },
    //   {
    //     "chainId": "5",
    //     "hash": "0xd5aa1bbe4a8a1ffc0dbddc6e5e4f7ce04a2951542ed07e8fba39e983dcab8e14",
    //     "nonce": 384,
    //     "blockHash": "0x55bafb48007540c0a00256ff377da462eae8ee59495415a73a151a82ae0e67e3",
    //     "blockNumber": 8815399,
    //     "transactionIndex": 53,
    //     "from": "0x8cd23453623055da8f41f3528154ffcb21d496c2",
    //     "to": "0x0043d60e87c5dd08c86c3123340705a1556c4719",
    //     "value": "6000000000009044",
    //     "symbol": "ETH",
    //     "gasPrice": 83862377731,
    //     "gas": 34964,
    //     "input": "0x297235110000000000000000000000000043d60e87c5dd08c86c3123340705a1556c4719000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000210302379d9a1a1fd2c85d66457c7bc6bfd28215732cde1ba0f9a8f7a30e10bb848900000000000000000000000000000000000000000000000000000000000000",
    //     "status": 1,
    //     "tokenAddress": "0x0000000000000000000000000000000000000000",
    //     "timestamp": 1681269456,
    //     "fee": "2932164174986684",
    //     "feeToken": "ETH",
    //     "extra": {
    //       "accessList": [],
    //       "blockHash": "0x55bafb48007540c0a00256ff377da462eae8ee59495415a73a151a82ae0e67e3",
    //       "blockNumber": 8815399,
    //       "chainId": "0x5",
    //       "from": "0x8cd23453623055DA8f41f3528154ffCb21D496c2",
    //       "gas": "39948",
    //       "maxFeePerGas": "119852434675",
    //       "maxPriorityFeePerGas": "1500000000",
    //       "r": "0xf5b73bb25e95724d90571b0ef21525217eebe448842f645fa6693b1270d604a5",
    //       "s": "0x1d3f43a922a781dfbca96296781f0040d3c893f2ac6aefdb23854c69f12f4479",
    //       "to": "0xD9D74a29307cc6Fc8BF424ee4217f1A587FBc8Dc",
    //       "transactionIndex": 53,
    //       "type": 2,
    //       "v": "0x0",
    //       "ext": "0x0302379d9a1a1fd2c85d66457c7bc6bfd28215732cde1ba0f9a8f7a30e10bb8489"
    //     },
    //     "source": "rpc",
    //     "confirmations": 807,
    //     "receipt": {
    //       "blockHash": "0x55bafb48007540c0a00256ff377da462eae8ee59495415a73a151a82ae0e67e3",
    //       "blockNumber": 8815399,
    //       "contractAddress": null,
    //       "cumulativeGasUsed": 8809577,
    //       "effectiveGasPrice": 83862377731,
    //       "from": "0x8cd23453623055da8f41f3528154ffcb21d496c2",
    //       "gasUsed": 34964,
    //       "logs": [],
    //       "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
    //       "status": true,
    //       "to": "0xd9d74a29307cc6fc8bf424ee4217f1a587fbc8dc",
    //       "transactionHash": "0xd5aa1bbe4a8a1ffc0dbddc6e5e4f7ce04a2951542ed07e8fba39e983dcab8e14",
    //       "transactionIndex": 53,
    //       "type": "0x2"
    //     }
    //   },
    //   {
    //     "chainId": "5",
    //     "hash": "0x1c9d7d281eb1e112d70453e4f2fc1c24dcc063a4acc2d2461b8ba01a6a70aca2",
    //     "nonce": 991,
    //     "blockHash": "0x03575560a05efa5e251230803e3048ac3aaf1d85a544afaec22b1ffbe061f756",
    //     "blockNumber": 8816381,
    //     "transactionIndex": 105,
    //     "from": "0xde9dcb0eac4dae8407b8a4867054b77dd315bfe0",
    //     "to": "0x0043d60e87c5dd08c86c3123340705a1556c4719",
    //     "value": "6000000000009044",
    //     "symbol": "ETH",
    //     "gasPrice": 307435945585,
    //     "gas": 34812,
    //     "input": "0x297235110000000000000000000000000043d60e87c5dd08c86c3123340705a1556c47190000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000002003e88cfe577661da14db31d05cd8fdc09f189700525161c817b7d5711d3484f5",
    //     "status": 1,
    //     "tokenAddress": "0x0000000000000000000000000000000000000000",
    //     "timestamp": 1681284084,
    //     "fee": "10702460137705020",
    //     "feeToken": "ETH",
    //     "extra": {
    //       "accessList": [],
    //       "blockHash": "0x03575560a05efa5e251230803e3048ac3aaf1d85a544afaec22b1ffbe061f756",
    //       "blockNumber": 8816381,
    //       "chainId": "0x5",
    //       "from": "0xde9dcb0Eac4DaE8407b8A4867054b77dd315Bfe0",
    //       "gas": "39796",
    //       "maxFeePerGas": "451180636574",
    //       "maxPriorityFeePerGas": "1500000000",
    //       "r": "0x95a0ad0c089ef9f383fce59757d336bf85f7c14e80f2a7f62d2abd6248905029",
    //       "s": "0x27bb0ac5b1f760129316f35bd14987e1bb68b25d17f839cda982107489c047e3",
    //       "to": "0xD9D74a29307cc6Fc8BF424ee4217f1A587FBc8Dc",
    //       "transactionIndex": 105,
    //       "type": 2,
    //       "v": "0x1",
    //       "ext": "0x03e88cfe577661da14db31d05cd8fdc09f189700525161c817b7d5711d3484f5"
    //     },
    //     "source": "rpc",
    //     "confirmations": 7,
    //     "receipt": {
    //       "blockHash": "0x03575560a05efa5e251230803e3048ac3aaf1d85a544afaec22b1ffbe061f756",
    //       "blockNumber": 8816381,
    //       "contractAddress": null,
    //       "cumulativeGasUsed": 10275978,
    //       "effectiveGasPrice": 307435945585,
    //       "from": "0xde9dcb0eac4dae8407b8a4867054b77dd315bfe0",
    //       "gasUsed": 34812,
    //       "logs": [],
    //       "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
    //       "status": true,
    //       "to": "0xd9d74a29307cc6fc8bf424ee4217f1a587fbc8dc",
    //       "transactionHash": "0x1c9d7d281eb1e112d70453e4f2fc1c24dcc063a4acc2d2461b8ba01a6a70aca2",
    //       "transactionIndex": 105,
    //       "type": "0x2"
    //     }
    //   }
    // ];
    // for (const data of list) {
    //   data.value = new BigNumber(data.value);
    // }
    await subscribeNewTransaction(txList);
  }, 180000)
  it('starknet transfer', async () => {
    // const tokenAddress = "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7";
    // const recipient = '0x02379d9a1A1FD2C85D66457c7bC6bfD28215732Cde1ba0F9a8f7A30E10bB8489';
    // const starknetHelp = new StarknetHelp("georli-alpha", "0x6a83b80242e72fc371cb63352c5094c5ea993f9e5f322e00f54533d39b80b2e", "0x050e5ba067562e87b47d87542159e16a627e85b00de331a53b471cee1a4e5a4f");
    const starknetHelp = new StarknetHelp("georli-alpha", "1384030132976819129566536341837576539302965912622674768433445465624252567329", "0x02379d9a1A1FD2C85D66457c7bC6bfD28215732Cde1ba0F9a8f7A30E10bB8489");

    // console.log("getAvailableNonce---", await starknetHelp.getAvailableNonce(), await starknetHelp.getNetworkNonce());
    // const { nonce } = await starknetHelp.takeOutNonce();
    const nonce = 2;
    const paramsList: any[] = [];
    for (let i = 0; i < 500; i++) {
      // paramsList.push({
      //   tokenAddress: "0x03e85bfbb8e2a42b7bead9e88e9a1b19dbccf661471061807292120462396ec9",
      //   recipient: "0x02379d9a1A1FD2C85D66457c7bC6bfD28215732Cde1ba0F9a8f7A30E10bB8489",
      //   amount: (0.0000001 * 10 ** 18).toFixed(),
      // });
      paramsList.push({
        tokenAddress: "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
        recipient: "0x00e88CFe577661Da14DB31d05cD8FDc09f189700525161c817B7d5711D3484F5",
        amount: (0.0000001 * 10 ** 18).toFixed(),
      });
    }
    const result = await starknetHelp.signMutiTransfer(paramsList, nonce);
    console.log('result', result);
  }, 3000000)
  it('test send', async () => {
    const res = await evm({
      makerAddress: '0x0043d60e87c5dd08c86c3123340705a1556c4719',
      toAddress: '0xA5F46D60F4F08F11a5495f8c1011537718e188Fe',
      toChain: 'zksync2_test',
      chainID: 280,
      tokenInfo: {
        symbol: 'ETH',
        decimals: 18
      },
      tokenAddress: '0x0000000000000000000000000000000000000000',
      amountToSend: (0.0001 * (10 ** 18)).toString(),
      result_nonce: 0,
      fromChainID: 5,
      lpMemo: '',
      ownerAddress: '',
    });
    console.log('res ====>>>>>', res);
  },30000)
})
const nonceDic = {}
async function t(value) {
  let {
    makerAddress,
    toAddress,
    chainID,
    tokenAddress,
    amountToSend,
    result_nonce,
  } = value
  const accessLogger = getLoggerService(chainID)
  let ethProvider
  let syncProvider
  if (chainID === 514) {
    const httpEndPoint = makerConfig['zksync2_test'].httpEndPoint
    ethProvider = ethers.getDefaultProvider('goerli')
    syncProvider = new zksync2.Provider(httpEndPoint)
  } else {
    const httpEndPoint = makerConfig['zksync2'].httpEndPoint //official httpEndpoint is not exists now
    ethProvider = ethers.getDefaultProvider('homestead')
    syncProvider = new zksync2.Provider(httpEndPoint)
  }
  const syncWallet = new zksync2.Wallet(
      makerConfig.privateKeys[makerAddress.toLowerCase()],
      syncProvider,
      ethProvider
  )
  let tokenBalanceWei = await syncWallet.getBalance(
      tokenAddress,
      'finalized'
  )
  if (!tokenBalanceWei) {
    accessLogger.error('zk2 Insufficient balance 0')
    return {
      code: 1,
      txid: 'ZK2 Insufficient balance 0',
    }
  }
  accessLogger.info('zk2_tokenBalance =', tokenBalanceWei.toString())
  if (BigInt(tokenBalanceWei.toString()) < BigInt(amountToSend)) {
    accessLogger.error('zk2 Insufficient balance')
    return {
      code: 1,
      txid: 'zk2 Insufficient balance',
    }
  }
  const has_result_nonce = result_nonce > 0
  if (!has_result_nonce) {
    let zk_nonce = await syncWallet.getNonce('committed')
    let zk_sql_nonce = nonceDic[makerAddress]?.[chainID]
    if (!zk_sql_nonce) {
      result_nonce = zk_nonce
    } else {
      if (zk_nonce > zk_sql_nonce) {
        result_nonce = zk_nonce
      } else {
        result_nonce = zk_sql_nonce + 1
      }
    }
    accessLogger.info('zk2_nonce =', zk_nonce)
    accessLogger.info('zk2_sql_nonce =', zk_sql_nonce)
    accessLogger.info('zk2 result_nonde =', result_nonce)
  }
  const params: any = {
    from: makerAddress,
    customData: {
      feeToken: '',
    },
    to: '',
    nonce: result_nonce,
    value: ethers.BigNumber.from(0).toHexString(),
    data: '0x',
  }
  const isMainCoin =
      tokenAddress.toLowerCase() ===
      '0x0000000000000000000000000000000000000000'
  if (isMainCoin) {
    params.value = ethers.BigNumber.from(amountToSend).toHexString()
    params.to = toAddress
    params.customData.feeToken =
        '0x0000000000000000000000000000000000000000'
  } else {
    const web3 = new Web3()
    const tokenContract = new web3.eth.Contract(
        <any>makerConfig.ABI,
        tokenAddress
    )
    params.data = tokenContract.methods
        .transfer(toAddress, web3.utils.toHex(amountToSend))
        .encodeABI()
    params.to = tokenAddress
    params.customData.feeToken = tokenAddress
  }
  params.gasPrice = await syncWallet.getGasPrice();
  console.log(params)
  params.gasLimit = await syncWallet.provider.estimateGas(params);
  const transfer = await syncWallet.sendTransaction(params)

  console.log('====>>>', transfer);
  return transfer;
}

async function evm(value) {
  let {
    makerAddress,
    toAddress,
    toChain,
    chainID,
    tokenInfo,
    tokenAddress,
    amountToSend,
    result_nonce,
    // fromChainID,
    // lpMemo,
    // ownerAddress,
  } = value
  const accessLogger = getLoggerService(chainID)
  let web3Net = ''
  if (makerConfig[toChain]) {
    web3Net =
        makerConfig[toChain].httpEndPointInfura ||
        makerConfig[toChain].httpEndPoint
    accessLogger.info(`RPC from makerConfig ${toChain}`)
  } else {
    //
    accessLogger.info(`RPC from ChainCore ${toChain}`)
  }
  if (isEmpty(web3Net)) {
    accessLogger.error(`RPC not obtained ToChain ${toChain}`)
    return
  }
  const web3 = new Web3(web3Net)
  web3.eth.defaultAccount = makerAddress

  let tokenContract: any

  let tokenBalanceWei = 0
  try {
    if (isEthTokenAddress(tokenAddress)) {
      tokenBalanceWei =
          Number(await web3.eth.getBalance(<any>web3.eth.defaultAccount)) || 0
    } else {
      tokenContract = new web3.eth.Contract(<any>makerConfig.ABI, tokenAddress)
      tokenBalanceWei = await tokenContract.methods
          .balanceOf(web3.eth.defaultAccount)
          .call({
            from: web3.eth.defaultAccount,
          })
    }
  } catch (error) {
    accessLogger.error('tokenBalanceWeiError =', error)
  }

  if (!tokenBalanceWei) {
    accessLogger.error(`${toChain}->!tokenBalanceWei Insufficient balance`)
    // return {
    //   code: 1,
    //   txid: `${toChain}->!tokenBalanceWei Insufficient balance`,
    // }
  }
  accessLogger.info('tokenBalanceWei =', tokenBalanceWei)
  if (tokenBalanceWei && BigInt(tokenBalanceWei) < BigInt(amountToSend)) {
    accessLogger.error(
        `${toChain}->tokenBalanceWei<amountToSend Insufficient balance`
    )
    return {
      code: 1,
      txid: `${toChain}->tokenBalanceWei<amountToSend Insufficient balance`,
    }
  }


  if (result_nonce == 0) {
    let nonce = 0
    try {
      nonce = await web3.eth.getTransactionCount(
          <any>web3.eth.defaultAccount,
          'pending'
      )
    } catch (err) {
      return {
        code: 1,
        txid: 'GetTransactionCount failed: ' + err.message,
      }
    }

    /**
     * With every new transaction you send using a specific wallet address,
     * you need to increase a nonce which is tied to the sender wallet.
     */
    let sql_nonce = nonceDic[makerAddress]?.[chainID]
    accessLogger.info(
        `read nonce  sql_nonce:${sql_nonce}, nonce:${nonce}, result_nonce:${result_nonce}`
    )
    accessLogger.info('read nonceDic', JSON.stringify(nonceDic))
    if (!sql_nonce) {
      result_nonce = nonce
    } else {
      if (nonce > sql_nonce) {
        result_nonce = nonce
      } else {
        result_nonce = sql_nonce + 1
      }
    }

    if (!nonceDic[makerAddress]) {
      nonceDic[makerAddress] = {}
    }
    nonceDic[makerAddress][chainID] = result_nonce
    accessLogger.info('nonce =', nonce)
    accessLogger.info('sql_nonce =', sql_nonce)
    accessLogger.info('result_nonde =', result_nonce)
  }

  /**
   * Fetch the current transaction gas prices from https://ethgasstation.info/
   */
  let maxPrice = 230
  if (isEthTokenAddress(tokenAddress)) {
    if (chainID == 1 || chainID == 5) {
      maxPrice = 300;
    }
  }
  if (tokenInfo && tokenInfo.symbol === 'USDC') {
    if (chainID == 1 || chainID == 5) {
      maxPrice = 170;
    }
  }
  if (tokenInfo && tokenInfo.symbol === 'USDT') {
    if (chainID == 1 || chainID == 5) {
      maxPrice = 170;
    }
  }
  if (tokenInfo && tokenInfo.symbol === 'DAI') {
    if (chainID == 1 || chainID == 5) {
      maxPrice = 170;
    }
  }

  const response = await axios.post(makerConfig[toChain].httpEndPoint, {
    jsonrpc: '2.0',
    method: 'eth_gasPrice',
    params: [],
    id: 0,
  })

  if (response.status !== 200 || response.statusText !== 'OK') {
    throw 'Eth_gasPrice response failed!'
  }

  let gasPrices = response.data.result
  let gasLimit = 100000
  if (
      toChain === 'metis' ||
      toChain === 'metis_test' ||
      toChain === 'boba_test' ||
      toChain === 'boba'
  ) {
    gasLimit = 1000000
  }
  if (chainID == 16 || chainID == 516) {
    gasLimit = 250000;
  }

  if (toChain === 'arbitrum_test' || toChain === 'arbitrum' || toChain === 'zksync2_test' || toChain === 'zksync2') {
    try {
      if (isEthTokenAddress(tokenAddress)) {
        gasLimit = await web3.eth.estimateGas({
          from: makerAddress,
          to: toAddress,
          value: web3.utils.toHex(amountToSend),
        })
      } else {
        gasLimit = await tokenContract.methods
            .transfer(toAddress, web3.utils.toHex(amountToSend))
            .estimateGas({
              from: makerAddress,
            })
      }
      gasLimit = Math.ceil(web3.utils.hexToNumber(gasLimit) * 1.5)
    } catch (error) {
      gasLimit = 1000000
    }
    accessLogger.info('arGasLimit =', gasLimit)
  }

  /**
   * Build a new transaction object and sign it locally.
   */

  const details: any = {
    gas: web3.utils.toHex(gasLimit),
    gasPrice: gasPrices, // converts the gwei price to wei
    nonce: result_nonce,
    chainId: chainID, // mainnet: 1, rinkeby: 4
  }
  if (isEthTokenAddress(tokenAddress)) {
    details['to'] = toAddress
    details['value'] = web3.utils.toHex(amountToSend)
  } else {
    details['to'] = tokenAddress
    details['value'] = '0x0'
    details['data'] = tokenContract.methods
        .transfer(toAddress, web3.utils.toHex(amountToSend))
        .encodeABI()
  }


  let transaction: EthereumTx
  if (makerConfig[toChain]?.customChainId) {
    const networkId = makerConfig[toChain]?.customChainId
    const customCommon = Common.forCustomChain(
        'mainnet',
        {
          name: toChain,
          networkId,
          chainId: networkId,
        },
        'petersburg'
    )
    transaction = new EthereumTx(details, { common: customCommon })
  } else {
    transaction = new EthereumTx(details, { chain: toChain })
  }
  const k = makerConfig.privateKeys[makerAddress.toLowerCase()];

  console.log('privateKeys',k)
  /**
   * This is where the transaction is authorized on your behalf.
   * The private key is what unlocks your wallet.
   */
  transaction.sign(
      Buffer.from(makerConfig.privateKeys[makerAddress.toLowerCase()], 'hex')
  )
  accessLogger.info('send transaction =', JSON.stringify(details))
  /**
   * Now, we'll compress the transaction info down into a transportable object.
   */
  const serializedTransaction = transaction.serialize()

  /**
   * Note that the Web3 library is able to automatically determine the "from" address based on your private key.
   */
  // const addr = transaction.from.toString('hex')
  // log(`Based on your private key, your wallet address is ${addr}`)
  /**
   * We're ready! Submit the raw transaction details to the provider configured above.
   */

  return new Promise((resolve) => {
    web3.eth
        .sendSignedTransaction('0x' + serializedTransaction.toString('hex'))
        .on('transactionHash', async (hash) => {
          resolve({
            code: 0,
            txid: hash,
          })
        })
        .on('receipt', (tx: any) => {
          accessLogger.info('send transaction receipt=', JSON.stringify(tx))
        })
        .on('error', (err: any) => {
          nonceDic[makerAddress][chainID] = result_nonce - 1;
          resolve({
            code: 1,
            txid: err,
            error: err,
            result_nonce,
          })
        })
  })
}
