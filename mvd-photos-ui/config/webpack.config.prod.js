const {merge} = require('webpack-merge');
const commonConfig = require('./webpack.config');

module.exports = env => merge(commonConfig(env), {
    mode: 'production',
    optimization: {
        minimize: true,
        splitChunks: {
            chunks: 'all'
        }
    }
});
