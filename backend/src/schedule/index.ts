import { appConfig, makerConfig } from '../config'
import { sleep } from '../util'
import { accessLogger } from '../util/logger'
import { getMakerList, startMaker } from '../util/maker'
import {
  jobCacheCoinbase,
  jobGetWealths,
  jobMakerNodeTodo,
  jobMakerPull,
} from './jobs'

async function waittingStartMaker() {
  const makerList = await getMakerList()
  if (makerList.length === 0) {
    accessLogger.warn('none maker list')
    return
  }

  // wait makerConfig.privateKeys
  const startedIndexs: number[] = []
  let isPrivateKeysChanged = true
  while (startedIndexs.length < makerList.length) {
    const missPrivateKeyMakerAddresses: string[] = []

    for (let index = 0; index < makerList.length; index++) {
      const item = makerList[index]
      const makerAddress = item.makerAddress

      if (
        makerConfig.privateKeys[makerAddress] &&
        startedIndexs.indexOf(index) === -1
      ) {
        startMaker(item)
        jobMakerNodeTodo(item.makerAddress)

        startedIndexs.push(index)
        isPrivateKeysChanged = true
        continue
      }

      if (startedIndexs.indexOf(index) === -1) {
        missPrivateKeyMakerAddresses.push(makerAddress)
      }
    }

    // Only first waiting or privateKeys changed
    if (isPrivateKeysChanged && missPrivateKeyMakerAddresses.length > 0) {
      const curlBody = {}
      for (const item of missPrivateKeyMakerAddresses) {
        curlBody[item] = "This maker's private key"
      }

      accessLogger.warn(
        `Miss private keys!`,
        `Please run [curl -i -X POST -H 'Content-type':'application/json' -d '${JSON.stringify(
          curlBody
        )}' http://${appConfig.options.host}:${
          appConfig.options.port
        }/maker/privatekeys] set it`
      )

      isPrivateKeysChanged = false
    }

    await sleep(1000)
  }
}

export const startJobs = async () => {
  const scene = process.env.ORBITER_SCENE

  // cache coinbase
  jobCacheCoinbase()

  // get wealths
  jobGetWealths()

  // dashboard
  if (['dashboard', 'all', undefined, ''].indexOf(scene) !== -1) {
    jobMakerPull()
  }

  // maker
  if (['maker', 'all', undefined, ''].indexOf(scene) !== -1) {
    waittingStartMaker()
  }
}
