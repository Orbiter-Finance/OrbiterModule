import {Get, Post, Body, Put, Delete, Query, Param, Controller} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import {
  ApiResponse,
  ApiOperation, ApiTags,
} from '@nestjs/swagger';
import { HttpException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import logger from '../shared/utils/logger';

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

  @ApiOperation({ summary: 'Get bad transaction' })
  @ApiResponse({ status: 200, description: 'Return bad transactions.'})
  @Get('unmatch')
  async findUnmatchedHistory(@Query() query): Promise<any> {
    // TODO: this part is common, use pipe instead
    if (!query.makerAddress) {
      logger.warn(`[TransactionController.findUnmatchedHistory] Mapped {/transaction/unmatch, GET} route error request params: ${JSON.stringify(query)}`);
      throw new HttpException({code: 1, msg: 'Sorry, params makerAddress miss'}, HttpStatus.OK);
    }
    return await this.transactionService.findUnmatched(query);
  }
  @ApiOperation({ summary: 'Get bad statistics' })
  @ApiResponse({ status: 200, description: 'Return bad transactions.'})
  @Get('statistics')
  async statistics(@Query() query): Promise<any> {
    return {
      code: 0,
      data: await this.transactionService.statistics(query),
      startTime: query['startTime'],
      endTime: query['endTime']
    }
  }
}
