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
                'source $NVM_DIR/nvm.sh && npm i -g @nestjs/cli && npm i && npm run build && pm2 reload ecosystem.config.js --env production && pm2 save && git checkout yarn.lock',
            env: {
                NODE_ENV: 'production',
                NVM_DIR: '$HOME/.nvm',
            },
        },
    },
};
