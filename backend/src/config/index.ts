import path from 'path'
import * as dotenv from 'dotenv'
dotenv.config({ path: path.resolve(__dirname, '..', '..', '..', '.env') })

import { ListenOptions } from 'net'
import * as logConfig from './log'
import makerConfig from './maker'
import * as ormConfig from './orm'

// cover private key
const omp = process.env.ORBITER_MAKER_PRIVATEKEY
if (omp) {
  makerConfig.privatekey = omp
}

const appConfig = {
  options: <ListenOptions>{
    port: process.env.APP_OPTIONS_PORT || 3002,
    host: process.env.APP_OPTIONS_HOST || '0.0.0.0',
  },
}

export { appConfig, ormConfig, logConfig, makerConfig }
