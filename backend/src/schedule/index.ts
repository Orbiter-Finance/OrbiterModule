import { appConfig, makerConfig } from '../config'
import { sleep } from '../util'
import { accessLogger } from '../util/logger'
import { startMaker } from '../util/maker'
import { jobGetWealths, jobMakerNodeTodo, jobMakerPull } from './jobs'

export const startJobs = async () => {
  const scene = process.env.ORBITER_SCENE

  // get wealths
  jobGetWealths()

  // dashboard
  if (['dashboard', 'all', undefined, ''].indexOf(scene) !== -1) {
    jobMakerPull()
  }

  // maker
  if (['maker', 'all', undefined, ''].indexOf(scene) !== -1) {
    // wait makerConfig.privatekey
    let isWarn = true
    while (true) {
      if (makerConfig.privatekey) {
        accessLogger.info('startMaker: started')
        startMaker()
        jobMakerNodeTodo()
        break
      }

      // only first waiting
      if (isWarn) {
        accessLogger.warn(
          "startMaker: waiting set maker's private key!",
          `Please run [curl -i -X POST -H 'Content-type':'application/json' -d '{"privatekey":"your privatekey"}' http://${appConfig.options.host}:${appConfig.options.port}/maker/privatekey] set it`
        )
        isWarn = false
      }

      await sleep(1000)
    }
  }
}
