/* eslint-disable no-undef */
const path = require('path'),
    fs = require('fs'),
    packageConf = JSON.parse(fs.readFileSync('./package.json', 'utf-8')),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    merge = require('webpack-merge'),
    webpackBaseConfig = require('./webpack.base.conf.js');


let version = packageConf.version,
    library = packageConf.name.toUpperCase();

const styleLoaders = [{
    test: /\.css$/,
    use: [
        'style-loader',
        'css-loader',
        'autoprefixer-loader'
    ]
}, {
    test: /\.scss$/,
    use: [
        'style-loader',
        'css-loader',
        'sass-loader?sourceMap'
    ]
}];
webpackBaseConfig.module.rules = webpackBaseConfig.module.rules.concat(styleLoaders);
module.exports = merge(webpackBaseConfig, {
    entry: {
        main: './examples/main',
    },
    output: {
        filename: `${library}.js`,
        path: path.resolve(__dirname, '../docs'),
        publicPath: '',
        chunkFilename: `${library}-${version}.chunk.js`
    },

    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            filename: path.join(__dirname, '../docs/index.html'),
            template: path.join(__dirname, '../examples/index.html')
        }),
    ],
});