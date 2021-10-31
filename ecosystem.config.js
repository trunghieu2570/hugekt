module.exports = {
    apps: [
        {
            name: 'hugekt-default',
            script: 'npm run start:hugekt-web',
            time: true,
            instances: 1,
            autorestart: true,
            max_restarts: 50,
            watch: false,
            max_memory_restart: '1G',
            env: {
                PORT: 3000,
            },
        },
    ],
    deploy: {
        production: {
            user: 'bitnami',
            host: process.env.HOST,
            key: 'default_deploy.key',
            ref: 'origin/master',
            repo: 'https://github.com/trunghieu2570/hugekt.git',
            path: '/home/bitnami/hugekt-default',
            'post-deploy':
                'source $NVM_DIR/nvm.sh && npm i -g @nestjs/cli && npm i && npm run migration:run && npm run build && pm2 reload ecosystem.config.js --env production && pm2 save && git checkout yarn.lock',
            env: {
                NODE_ENV: 'production',
                NVM_DIR: '$HOME/.nvm',
                HOST: process.env.HOST,
                TYPEORM_CONNECTION: process.env.TYPEORM_CONNECTION,
                TYPEORM_DATABASE: process.env.TYPEORM_DATABASE,
                TYPEORM_ENTITIES: process.env.TYPEORM_ENTITIES,
                TYPEORM_ENTITIES_DIR: process.env.TYPEORM_ENTITIES_DIR,
                TYPEORM_HOST: process.env.TYPEORM_HOST,
                TYPEORM_LOGGING: process.env.TYPEORM_LOGGING,
                TYPEORM_MIGRATIONS: process.env.TYPEORM_MIGRATIONS,
                TYPEORM_MIGRATIONS_DIR: process.env.TYPEORM_MIGRATIONS_DIR,
                TYPEORM_PASSWORD: process.env.TYPEORM_PASSWORD,
                TYPEORM_PORT: process.env.TYPEORM_PORT,
                TYPEORM_SYNCHRONIZE: process.env.TYPEORM_SYNCHRONIZE,
                TYPEORM_USERNAME: process.env.TYPEORM_USERNAME,
            },
        },
    },
};
