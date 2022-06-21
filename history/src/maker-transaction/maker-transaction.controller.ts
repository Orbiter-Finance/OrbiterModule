import {Get, Query, Controller} from '@nestjs/common';
import { MakerTransactionService } from './maker-transaction.service';
import {
  ApiResponse,
  ApiOperation, ApiTags,
} from '@nestjs/swagger';
import { HttpException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import logger from '../shared/utils/logger';

@ApiTags('transactions')
@Controller('transactions')
export class MakerTransactionController {
  constructor(private readonly makerTransactionService: MakerTransactionService) {}

  @ApiOperation({ summary: 'Get all real transactions' })
  @ApiResponse({ status: 200, description: 'Return all real transactions.'})
  @Get()
  async findAll(@Query() query): Promise<any> {
    // TODO: this part is common, use pipe instead
    if (!query.makerAddress) {
      logger.warn(`[MakerTransactionController.findAll] Mapped {/transactions, GET} route error request params: ${JSON.stringify(query)}`);
      throw new HttpException({code: 1, msg: 'Sorry, params makerAddress miss'}, HttpStatus.OK);
    }
    return await this.makerTransactionService.findAll(query);
  }

  @ApiOperation({ summary: 'Get all real transactions' })
  @ApiResponse({ status: 200, description: 'Return all real transactions.'})
  @Get('history')
  async findAllHistory(@Query() query): Promise<any> {
    return await this.makerTransactionService.findAll(query);
  }
}
