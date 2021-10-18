import { NestFactory } from '@nestjs/core';
import { HugektApiModule } from './hugekt-api.module';

async function bootstrap() {
    const app = await NestFactory.create(HugektApiModule);
    await app.listen(3001);
}
bootstrap();
