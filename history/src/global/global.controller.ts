import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GlobalService } from './global.service';

@Controller('global')
export class GlobalController {
  constructor(private readonly globalService: GlobalService) {}

  @Get()
  getGobalData() {
    return this.globalService.getGobalData();
  }
}
