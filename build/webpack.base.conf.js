/* eslint-disable no-undef */
const webpack = require('webpack'),
    path = require('path');

module.exports = {
    plugins: [
        new webpack.optimize.ModuleConcatenationPlugin()
    ],
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader?cacheDirectory'
        }, {
            test: /\.(gif|jpg|png|woff|svg|eot|ttf|mp3)\??.*$/,
            loader: 'url-loader?limit=8192'
        }, {
            test: /\.(html|tpl)$/,
            loader: 'html-loader'
        }, {
            test: /\.(mp4|ogg|svg|mp3)$/,
            loader: 'file-loader!'
        }]
    },
    resolve: {
        extensions: ['.js'],
        alias: {
            '@': path.join(__dirname, '../src')
        }
    }
};