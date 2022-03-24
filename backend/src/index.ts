import cluster from 'cluster'
import Koa from 'koa'
import koaBodyparser from 'koa-bodyparser'
import cors from 'koa2-cors'
import NodeCache from 'node-cache'
import 'reflect-metadata'
import semver from 'semver'
import { createConnection } from 'typeorm'
import { appConfig, ormConfig } from './config'
import controller from './controller'
import middlewareGlobal from './middleware/global'
import { startJobs } from './schedule'
import { sleep } from './util'
import { Core } from './util/core'
import { accessLogger, errorLogger } from './util/logger'

const startKoa = () => {
  const koa = new Koa()

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
      `process: ${process.pid}. This koa server is running at ${appConfig.options.host}:${appConfig.options.port}`
    )
  })
}

const main = async () => {
  try {
    // initialize mysql connect, waiting for mysql server started
    accessLogger.info(`process: ${process.pid}. Connecting to the database...`)
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
        accessLogger.warn(
          `process: ${process.pid}. Connect to database failed: ${index}`
        )

        if (index == reconnectTotal) {
          throw err
        }

        // sleep 1.5s
        await sleep(1500)
      }
    }

    const clusterIsPrimary = () => {
      if (semver.gte(process.version, 'v16.0.0')) {
        return cluster.isPrimary
      }
      return cluster.isMaster
    }

    if (clusterIsPrimary()) {
      // StarkKoa in master only
      startKoa()

      // Manage child process
      let childProcessId: number | undefined
      cluster.on('exit', (worker, code, signal) => {
        // Refork
        if (worker.process.pid == childProcessId) {
          accessLogger.info(
            `Child process exited, code: ${code}, signal: ${signal}, refork it!`
          )
          cluster.fork()
        }
      })
      cluster.on('fork', (worker) => {
        childProcessId = worker.process.pid
      })
      cluster.fork()
    } else {
      // StartJobs in child process
      startJobs()
    }
  } catch (error) {
    accessLogger.info(error)
  }
}
main()
