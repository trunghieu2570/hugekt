import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import * as passport from 'passport';
import * as session from 'express-session';
import { Logger } from './common/logger';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    app.setViewEngine('ejs');
    app.useStaticAssets(join(__dirname, 'public'));
    app.setBaseViewsDir(join(__dirname, 'views'));

    app.useLogger(app.get(Logger));

    app.use(
        session({
            secret: 'nest cats',
            resave: false,
            saveUninitialized: false,
        }),
    );

    app.use(passport.initialize());
    app.use(passport.session());

    await app.listen(3000);
}
bootstrap();
