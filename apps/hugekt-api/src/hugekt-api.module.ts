import { Module } from '@nestjs/common';
import { HugektApiController } from './hugekt-api.controller';
import { HugektApiService } from './hugekt-api.service';

@Module({
  imports: [],
  controllers: [HugektApiController],
  providers: [HugektApiService],
})
export class HugektApiModule {}
