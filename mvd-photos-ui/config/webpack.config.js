const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const {EnvironmentPlugin} = require('webpack');
const {api, server, devServerPort} = require('../application.properties');

module.exports = (env = {}) => {

    return {
        cache: true,
        entry: {
            app: './src/index.tsx'
        },
        output: {
            filename: '[name].bundle.[hash].js',
            path: path.resolve(__dirname, '../dist'),
            publicPath: '/'
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js'],
            alias: {
                containers: path.resolve('src/app/containers/'),
                helpers: path.resolve('src/app/helpers/'),
                components: path.resolve('src/app/components/'),
                rest: path.resolve('src/app/rest/'),
                locales: path.resolve('src/app/locales/'),
                enums: path.resolve('src/app/enums/'),
                src: path.resolve('src/'),
                scss: path.resolve('src/scss/'),
                openapi: path.resolve('generated-sources/openapi/')
            }
        },
        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                hash: true,
                template: './public/index.html',
                favicon: './public/mvs_logo.svg'
            }),
            new EnvironmentPlugin({RUN_TYPE: env.RUN_TYPE})
        ],
        module: {
            rules: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/,
                    include: path.resolve()
                },
                {
                    test: /\.ts(x?)$/,
                    exclude: /node_modules/,
                    use: [{loader: 'ts-loader'}]
                },
                {
                    test: /\.(png|jpg|gif|svg|webp)$/,
                    use: {
                        loader: 'file-loader',
                        options: {
                            name: './images/[name].[ext]'
                        }
                    }
                },
                {
                    test: /\.css$/, use: [
                        {loader: 'style-loader'},
                        {loader: 'css-loader'}
                    ]
                },
                {
                    test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    loader: 'file-loader'
                }
            ]
        },
        devServer: {
            port: devServerPort,
            historyApiFallback: {
                index: '/index.html'
            },
            hot: true,
            proxy: {
                [api]: {
                    target: `${server[env.RUN_TYPE]}`,
                    changeOrigin: env.RUN_TYPE === 'external'
                }
            }
        }
    };
};
