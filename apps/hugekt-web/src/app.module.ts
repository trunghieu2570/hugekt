import { Module } from '@nestjs/common';
import { ProvidersModule } from './providers/providers.module';
import { UserModule } from './modules/user/user.module';
import { HomeModule } from './modules/home/home.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { PostModule } from './modules/post/post.module';
import { SharedModule } from './modules/shared/shared.module';
import { AdminModule } from './modules/admin/admin.module';
import { AuthModule } from './modules/auth/auth.module';
import { ApiModule } from './modules/api/api.module';
import databaseConfig from '@app/hugekt-core/config/database.config';

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'public'),
            serveStaticOptions: {
                maxAge: 31557600000,
            },
        }),
        ConfigModule.forRoot({
            envFilePath: ['.env'],
            load: [databaseConfig],
        }),
        TypeOrmModule.forRoot({
            type: 'mariadb',
            host: databaseConfig().host,
            port: databaseConfig().port,
            username: databaseConfig().username,
            password: databaseConfig().password,
            database: databaseConfig().database,
            entities: databaseConfig().entities,
            migrations: databaseConfig().migrations,
            cli: {
                entitiesDir: databaseConfig().entitiesDir,
                migrationsDir: databaseConfig().migrationsDir,
                //subscribersDir: []
            },
            synchronize: databaseConfig().synchronize,
            logging: databaseConfig().logging,
        }),
        ConfigModule,
        ProvidersModule,
        HomeModule,
        PostModule,
        UserModule,
        SharedModule,
        AdminModule,
        AuthModule,
        ApiModule,
    ],
    //controllers: [AppController],
    //providers: [AppService],
})
export class AppModule {}
