import Koa from 'koa'
import koaBodyparser from 'koa-bodyparser'
import cors from 'koa2-cors'
import NodeCache from 'node-cache'
import { exit } from 'process'
import 'reflect-metadata'
import { createConnection } from 'typeorm'
import { appConfig, ormConfig } from './config'
import controller from './controller'
import middlewareGlobal from './middleware/global'
import { startJobs } from './schedule'
import { sleep } from './util'
import { Core } from './util/core'
import { accessLogger, errorLogger } from './util/logger'
import { getCurrentGasPrices } from './util/maker/send'

const a =async () => {
  console.warn('xxxxx')

  const rst = await getCurrentGasPrices('mainnet')
  console.warn({rst});
}
a();

const main = async () => {
  try {
    const koa = new Koa()

    // initialize mysql connect, waiting for mysql server started
    accessLogger.info('Connecting to the database...')
    const reconnectTotal = 18
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
// main()
