import path from 'path'
import { ConnectionOptions } from 'typeorm'

const isDevelopment = process.env.NODE_ENV == 'development'

export const options: ConnectionOptions = {
  type: 'mysql',
  host: process.env.DB_HOST || '127.0.0.1',
  port: Number(process.env.DB_PORT) || 3309,
  username: process.env.DB_USER || 'zxy',
  password: process.env.DB_PASS || '123456',
  database: process.env.DB_NAME || 'orbiter',
  synchronize: isDevelopment,
  logging: false,

  // type: 'mysql',
  // host: '127.0.0.1',
  // port:  3306,
  // username: 'zxy',
  // password: '996330142',
  // database: 'Orbiter',
  // synchronize: isDevelopment,
  // logging: false,
  extra: {
  },

  entities: [path.resolve(__dirname, '..', 'model', '**', '*.{ts,js}')],
  migrations: [
    //   'src/migration/**/*.ts'
  ],
  subscribers: [
    //   'src/subscriber/**/*.ts'
  ],
}

