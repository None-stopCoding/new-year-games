const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const config = {
    entry: './src/index.js',
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    target: 'node',
    watch: true,
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.styl$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'stylus-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                    },
                }],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Калейдоскоп предсказаний',
            template: './index.html',
            inject: 'body',
            favicon: './favicon.png',
        }),
        new webpack.DefinePlugin({
            $: 'jquery',
            jquery: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),
        new MiniCssExtractPlugin(),
        new CopyPlugin({
            patterns: [
                { from: './src/fonts', to: './fonts' },
                { from: './src/image', to: './images' },
                { from: './src/audio', to: './audio' }
            ],
        }),
    ],
};

module.exports = config;
