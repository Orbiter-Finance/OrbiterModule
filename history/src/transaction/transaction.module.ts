import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';

@Module({
  controllers: [TransactionController],
  providers: [TransactionService]
})
export class TransactionModule {}
