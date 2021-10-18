import { Injectable } from '@nestjs/common';

@Injectable()
export class HugektApiService {
  getHello(): string {
    return 'Hello World!';
  }
}
