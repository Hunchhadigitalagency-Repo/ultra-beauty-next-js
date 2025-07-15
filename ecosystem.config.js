module.exports = {
    apps: [
        {
            name: 'basera-frontend-staging',
            script: 'npm',
            args: 'start',
            cwd: '/mnt/volume_blr1_02/projects/basera-next-js-staging',
            instances: 1,
            exec_mode: 'fork',
            env: {
                NODE_ENV: 'production',
                PORT: 3000
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
