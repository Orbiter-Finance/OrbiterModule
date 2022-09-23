import { Module } from '@nestjs/common';
import { MakerTransactionService } from './maker-transaction.service';
import { MakerTransactionController } from './maker-transaction.controller';

@Module({
  controllers: [MakerTransactionController],
  providers: [MakerTransactionService]
})
export class MakerTransactionModule {}
