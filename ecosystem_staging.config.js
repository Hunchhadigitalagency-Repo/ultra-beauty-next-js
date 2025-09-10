module.exports = {
    apps: [
        {
            name: 'ultra-beauty-frontend-staging',
            script: 'npm',
            args: 'start',
            cwd: '/var/www/staging/ultra-beauty-next-js',
            instances: 1,
            exec_mode: 'fork',
            env: {
                NODE_ENV: 'production',
                PORT: 3001
            },
            env_file: '.env',
            max_memory_restart: '500M',
            error_file: './logs/err.log',
            out_file: './logs/out.log',
            log_file: './logs/combined.log',
            time: true,
            watch: false,
            ignore_watch: [
                'node_modules',
                'logs',
                '.git'
            ],
            restart_delay: 1000,
            max_restarts: 5,
            min_uptime: '10s'
        }
    ]
};
