const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true'
});
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = withBundleAnalyzer({
    poweredByHeader: false,
    distDir: 'build',
    webpack(config) {
        const prod = process.env.NODE_ENV === 'production';
        const plugins = [...config.plugins];

        if (prod) {
            plugins.push(
                new TerserPlugin({
                    terserOptions: {
                        compress: {
                            drop_console: true // remove console.log, error, ...
                        }
                    }
                })
            );
        }

        return {
            ...config,
            mode: prod ? 'production' : 'development',
            devtool: prod ? 'hidden-source-map' : 'eval',
            plugins
        };
    }
});
