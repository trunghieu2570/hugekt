import { join } from 'path';

export default function () {
    return {
        type: process.env.TYPEORM_CONNECTION || 'mariadb',
        host: process.env.TYPEORM_HOST || 'localhost',
        username: process.env.TYPEORM_USERNAME || 'root',
        password: process.env.TYPEORM_PASSWORD || 'root',
        database: process.env.TYPEORM_DATABASE || 'typeweb',
        port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
        synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',
        logging: process.env.TYPEORM_LOGGING === 'true',
        entities: getPaths(process.env.TYPEORM_ENTITIES) || [],
        entitiesDir: getPath(process.env.TYPEORM_ENTITIES_DIR),
        migrations: getPaths(process.env.TYPEORM_MIGRATIONS) || [],
        migrationsDir: getPath(process.env.TYPEORM_MIGRATIONS_DIR),
    };
}

export function getPaths(str: string, delimiter = ','): string[] {
    const paths = str?.split(delimiter) || [];
    return paths.map((p) => getPath(p).slice(0, -3) + '.js');
}

export function getPath(path: string): string {
    return join(__dirname, '../../../..', path);
}
