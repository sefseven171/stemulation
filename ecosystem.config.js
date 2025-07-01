module.exports = {
  apps: [{
    name: 'stemulation-learning',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/stemulation-learning',
    env: {
      NODE_ENV: 'production',
      PORT: 5000
    },
    instances: 1, // Start with 1 instance, can increase based on server capacity
    exec_mode: 'fork',
    watch: false,
    max_memory_restart: '1G',
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true,
    autorestart: true,
    max_restarts: 10,
    min_uptime: '10s',
    restart_delay: 4000
  }]
}