import { Module } from '@nestjs/common';
import { TransactionRelInoutService } from './transaction-rel-inout.service';
import { TransactionRelInoutController } from './transaction-rel-inout.controller';

@Module({
  controllers: [TransactionRelInoutController],
  providers: [TransactionRelInoutService]
})
export class TransactionRelInoutModule {}
