import path from 'path'
import { ConnectionOptions } from 'typeorm'

const isDevelopment = process.env.NODE_ENV == 'development'

export const options: ConnectionOptions = {
  type: 'mysql',
  host: process.env.DB_HOST || '127.0.0.1',
  port: Number(process.env.DB_PORT) || 3737,
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '123456',
  database: process.env.DB_NAME || 'orbiter',
  synchronize: isDevelopment,
  logging: false,
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
