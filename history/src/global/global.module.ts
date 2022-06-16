import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/common'
import { GlobalService } from './global.service';
import { GlobalController } from './global.controller';

@Module({
  imports: [HttpModule],
  controllers: [GlobalController],
  providers: [GlobalService]
})
export class GlobalModule {}
