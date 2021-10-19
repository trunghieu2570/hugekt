import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import databaseConfig from './config/database.config';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: [join(process.cwd(), '/.env')],
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
    ],
})
export class HugektCoreModule {}
