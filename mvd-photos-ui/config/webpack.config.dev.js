const {merge} = require('webpack-merge');
const localConfig = require('./webpack.config.local');
const path = require('path');

module.exports = env => merge(localConfig(env), {
    output: {
        filename: '[name].bundle.[hash].js',
        path: path.resolve(__dirname, '../../build/resources/main/static'),
        publicPath: '/'
    }
});
