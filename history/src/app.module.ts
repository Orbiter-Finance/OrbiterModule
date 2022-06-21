import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { TransactionModule } from './transaction/transaction.module';
import { GlobalModule } from './global/global.module';
import { getEnv, isLocal } from './shared/env';
import { MakerTransactionModule } from './maker-transaction/maker-transaction.module';

const localDb = {
  DB_HOST: 'localhost',
  DB_PORT: 3336,
  DB_USER: 'root',
  DB_PASS: '123456',
  DB_NAME: 'tradding_history',
}
const envs = (key) => !isLocal() ? getEnv(key) : localDb[key];

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: envs('DB_HOST'),
      port: envs('DB_PORT'),
      username: envs('DB_USER'),
      password: envs('DB_PASS'),
      database: envs('DB_NAME'),
      entities: [
        './**/**.entity{.ts,.js}',
      ],
      // synchronize: isLocal()
    }),
    TransactionModule,
    GlobalModule,
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
