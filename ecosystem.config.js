module.exports = {
    apps: [
        {
            name: 'MY_NEXTJS_APP',
            script: './server.js',
            instances: 'max',
            env: {
                NODE_ENV: 'development'
            },
            env_production: {
                NODE_ENV: 'production'
            }
        }
    ]
};
