module.exports = {
    apps: [
        {
            name: 'hugekt-default',
            script: 'npm run start:prod',
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
            host: 'hugekt.com',
            key: 'default_deploy.key',
            ref: 'origin/master',
            repo: 'https://github.com/trunghieu2570/hugekt',
            path: '/home/bitnami/hugekt-default',
            'post-deploy':
                'npm i && npm run build && pm2 reload ecosystem.config.js --env production && pm2 save && git checkout yarn.lock',
            env: {
                NODE_ENV: 'production',
            },
        },
    },
}