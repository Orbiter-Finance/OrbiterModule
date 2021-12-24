import Koa from 'koa'
import koaBodyparser from 'koa-bodyparser'
import cors from 'koa2-cors'
import NodeCache from 'node-cache'
import 'reflect-metadata'
import { createConnection } from 'typeorm'
import { appConfig, ormConfig } from './config'
import controller from './controller'
import middlewareGlobal from './middleware/global'
import { startJobs } from './schedule'
import { getAmountFlag } from './service/maker'
import { sleep } from './util'
import { Core } from './util/core'
import { accessLogger, errorLogger } from './util/logger'

const main = async () => {
  // const syncProvider = await zksync.getDefaultProvider('rinkeby')
  // const syncProvider2 = await zksync.getDefaultProvider('rinkeby')
  // // console.log(syncProvider)
  // const rst = await syncProvider.getTxReceipt(
  //   '0x66f6675f8b9fb82ff302e4fada4d28bb215bf8c427899ddb6c54b106d70b1eb6'
  // )
  // console.log({ rst })
  // console.log(dayjs('2021-12-10T07:18:45.481945Z').format('YYYY-MM-DD HH:mm:ss'))

  // const amount = '2109005'
  // const m = amount.match(/0+([1-9]+$)/)
  // console.log(Number(amount) / 9000)
  // console.log({ m })

  // const d = (997 % 10000) % 9000
  // const d1 = (Number('') % 10000) % 9000
  // console.log({ d1 })

  // const makerAddress = '0x0043d60e87c5dd08C86C3123340705a1556C4719'
  // const httpEndPoint =
  //   'https://eth-rinkeby.alchemyapi.io/v2/lQgWSDmhGqRBNcqQdb6y75D4fNE2zgrs'

  // // // console.log({ history })
  // // const receipt = await createAlchemyWeb3(
  // //   httpEndPoint
  // // ).eth.getTransactionReceipt(
  // //   '0x8c5f0b8d255e5d18fab19efcd3a7aa10b07e069da87d14a5636b5bc9e75bfeee'
  // // )
  // // console.log(JSON.stringify(receipt))

  // const logs = await createAlchemyWeb3(httpEndPoint).eth.getPastLogs({
  //   fromBlock: 'lat',
  //   toBlock: '0x7e98e3',
  //   address: '0xeb8f08a975ab53e34d8a0330e0d34de942c95926',
  // })
  // console.log({ logs })
  // const timeStamp = 1639192461
  // const dFormat = dayjs(timeStamp * 1000).format('YYYY-MM-DD HH:mm:ss')
  // console.log({ dFormat })

  // // try {
  //   setTimeout(async () => {
  //     return new Promise((resolve, reject) => {
  //       reject()
  //     })
  //   }, 1000)
  // // } catch (error) {
  // //   console.log(error)
  // // }

  // setInterval(() => {
  //   console.log('tick', new Date())
  // }, 1000)

  // const f = dayjs(new Date('2021-12-12T13:20:44.076Z')).format(
  //   'YYYY-MM-DD HH:mm:ss'
  // )
  // console.log({ f })

  // const df = dateFormatNormal(1638460800000)
  // console.log({ df })

  // sleep(2000)
  // console.log('sleep: ' + new Date())
  // throw new Error('xxx')

  // const web3 = createAlchemyWeb3(makerConfig.rinkeby.httpEndPoint)
  // const meta = await web3.alchemy.getTokenMetadata(
  //   '0xeb8f08a975ab53e34d8a0330e0d34de942c95926'
  // )
  // const balance = await web3.alchemy.getTokenBalances(
  //   '0x0043d60e87c5dd08C86C3123340705a1556C4719',
  //   ['0xeb8f08a975ab53e34d8a0330e0d34de942c95926']
  // )
  // console.log(JSON.stringify({ meta, balance }))

  // const web3_1 = createAlchemyWeb3(makerConfig.arbitrum_test.httpEndPoint)
  // const meta1 = await web3_1.alchemy.getTokenMetadata(
  //   '0x6079Dd4565cb1852D6c4190DB7af6C8A69f73Eae'
  // )
  // const balance1 = await web3_1.alchemy.getTokenBalances(
  //   '0x0043d60e87c5dd08C86C3123340705a1556C4719',
  //   ['0x6079Dd4565cb1852D6c4190DB7af6C8A69f73Eae']
  // )
  // const allowance1 = await web3_1.alchemy.getTokenAllowance({
  //   contract: '0x6079Dd4565cb1852D6c4190DB7af6C8A69f73Eae',
  //   owner: '0x0043d60e87c5dd08C86C3123340705a1556C4719',
  //   spender: '0x6bb0366423a6f0f6c16715278483dd9321ed5f66',
  // })
  // console.log(JSON.stringify({ meta1, balance1, allowance1 }))
  // const bignum = new BigNumber(291009719)
  // const bignum2 = bignum.dividedBy(10 ** Number('6'))
  // console.log({ bignum, bignum2: bignum2.toString() })

  // const date = new Date('2021-12-17 7:25:08')
  // console.log({ date })

  try {
    const koa = new Koa()

    // initialize mysql connect, waiting for mysql server started
    accessLogger.info('Connecting to the database...')
    const reconnectTotal = 5
    for (let index = 1; index <= reconnectTotal; index++) {
      try {
        // db bind
        Core.db = await createConnection(ormConfig.options)

        // memoryCache bind
        Core.memoryCache = new NodeCache()

        // Break if connected
        break
      } catch (err) {
        accessLogger.warn('Connect to database failed: ' + index)

        if (index == reconnectTotal) {
          throw err
        }

        // sleep 1.5s
        await sleep(1500)
      }
    }

    // onerror
    koa.on('error', (err: Error) => {
      errorLogger.error(err.stack || err.message)
    })

    // middleware global
    koa.use(middlewareGlobal())

    // koa2-cors
    koa.use(
      cors({
        origin: '*',
        exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
        maxAge: 5,
        credentials: true,
        allowMethods: ['GET', 'POST', 'DELETE'],
        allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
      })
    )

    // koa-bodyparser
    koa.use(koaBodyparser())

    // controller
    koa.use(controller())

    // start
    koa.listen(appConfig.options, () => {
      accessLogger.info(
        `This koa server is running at ${appConfig.options.host}:${appConfig.options.port}`
      )
    })

    // startJobs
    startJobs()
  } catch (error) {
    console.log(error)
  }
}
main()
