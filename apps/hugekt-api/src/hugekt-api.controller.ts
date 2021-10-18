import { Controller, Get } from '@nestjs/common';
import { HugektApiService } from './hugekt-api.service';

@Controller()
export class HugektApiController {
  constructor(private readonly hugektApiService: HugektApiService) {}

  @Get()
  getHello(): string {
    return this.hugektApiService.getHello();
  }
}
