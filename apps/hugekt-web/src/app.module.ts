import { Module } from '@nestjs/common';
import { ProvidersModule } from './providers/providers.module';
import { HomeModule } from './modules/home/home.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PostModule } from './modules/post/post.module';
import { SharedModule } from './modules/shared/shared.module';
import { AdminModule } from './modules/admin/admin.module';
import { AuthModule } from './modules/auth/auth.module';
import { HugektCoreModule } from '@app/hugekt-core';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { GlobalConfigInterceptor } from './common/interceptors/global-config.interceptor';
import { UserIdentityInterceptor } from './common/interceptors/user-identity.interceptor';
import { Logger } from './common/logger';
import { ServeStaticExceptionFilter } from './common/filters/serve-file-exception.filter';
import { NotFoundExceptionFilter } from './common/filters/404-exceptions.filter';
@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'public'),
            serveStaticOptions: {
                maxAge: 31557600000,
            },
        }),
        HugektCoreModule,
        ProvidersModule,
        HomeModule,
        PostModule,
        SharedModule,
        AdminModule,
        AuthModule,
        //ApiModule,
    ],
    //controllers: [AppController],
    providers: [
        Logger,
        {
            provide: APP_INTERCEPTOR,
            useClass: GlobalConfigInterceptor,
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: UserIdentityInterceptor,
        },
        {
            provide: APP_FILTER,
            useClass: ServeStaticExceptionFilter,
        },
        {
            provide: APP_FILTER,
            useClass: NotFoundExceptionFilter,
        },
    ],
})
export class AppModule {}
