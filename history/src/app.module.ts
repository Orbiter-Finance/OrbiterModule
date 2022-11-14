import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { TransactionModule } from './transaction/transaction.module';
import { getEnv, isLocal } from './shared/env';
import { MakerTransactionModule } from './maker-transaction/maker-transaction.module';
import * as dotenv from 'dotenv'
import * as path from 'path'

isLocal() && dotenv.config({ path: path.resolve(__dirname, '../../.env') })

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: getEnv('DB_HOST2'),
      port: getEnv('DB_PORT2'),
      username: getEnv('DB_USER2'),
      password: getEnv('DB_PASS2'),
      database: getEnv('DB_NAME2'),
      entities: [
        './**/**.entity{.ts,.js}',
      ],
      // synchronize: isLocal()
    }),
    TransactionModule,
    MakerTransactionModule
  ],
  controllers: [
    AppController
  ],
  providers: []
})
export class ApplicationModule {
  constructor(private readonly connection: Connection) {}
}
