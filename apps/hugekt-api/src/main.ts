import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HugektApiModule } from './hugekt-api.module';

async function bootstrap() {
    const app = await NestFactory.create(HugektApiModule);

    const config = new DocumentBuilder()
        .setTitle('HugeKt API')
        .setDescription('HugeKt API description')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('', app, document);

    await app.listen(3001);
}
bootstrap();
