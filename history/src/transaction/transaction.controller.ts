import {Get, Post, Body, Put, Delete, Query, Param, Controller} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import {
  ApiResponse,
  ApiOperation, ApiTags,
} from '@nestjs/swagger';

@ApiTags('transactions')
@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @ApiOperation({ summary: 'Get transaction' })
  @ApiResponse({ status: 200, description: 'Return all transactions.'})
  @Get()
  async findAllHistory(@Query() query): Promise<any> {
    return await this.transactionService.findAll(query);
  }
}
