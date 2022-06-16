import {Get, Query, Controller} from '@nestjs/common';
import { TransactionRelInoutService } from './transaction-rel-inout.service';
import {
  ApiResponse,
  ApiOperation, ApiTags,
} from '@nestjs/swagger';
import { HttpException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import logger from '../shared/utils/logger';

@ApiTags('transactions')
@Controller('transactions')
export class TransactionRelInoutController {
  constructor(private readonly transactionRelInoutService: TransactionRelInoutService) {}

  @ApiOperation({ summary: 'Get all real transactions' })
  @ApiResponse({ status: 200, description: 'Return all real transactions.'})
  @Get()
  async findAll(@Query() query): Promise<any> {
    if (!query.makerAddress) {
      logger.warn(`[TransactionRelInoutController.findAll] Mapped {/transactions, GET} route error request params: ${JSON.stringify(query)}`);
      throw new HttpException({code: 1, msg: 'Sorry, params makerAddress miss'}, HttpStatus.OK);
    }
    return await this.transactionRelInoutService.findAll(query);
  }

  @ApiOperation({ summary: 'Get all real transactions' })
  @ApiResponse({ status: 200, description: 'Return all real transactions.'})
  @Get('history')
  async findAllHistory(@Query() query): Promise<any> {
    return await this.transactionRelInoutService.findAll(query);
  }
}
