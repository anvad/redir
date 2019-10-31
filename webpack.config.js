// webpack.config.js
// execute using ./node_modules/.bin/webpack --config webpack.config.js
const path = require('path');
const slsw = require('serverless-webpack');
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var nodeExternals = require('webpack-node-externals')

module.exports = {
    externals: [nodeExternals()],
    entry: slsw.lib.entries,
    resolve: {
        extensions: [
            '.js',
            '.json',
            '.ts',
            '.tsx'
        ]
    },
    devtool: 'source-map', //inline-source-map in dev
    target: 'node',
    module: {
        rules: [
            // {
            //     test: /\.tsx?$/,
            //     use: 'ts-loader',
            //     exclude: /node_modules/
            // }
        ]
    },
    // not setting the output config, since i want serverless-webpack to create this entry
    // output: {
    //     filename: 'bundle.js',
    //     path: path.resolve(__dirname, 'dist')
    // },
    plugins: [

        // new UglifyJSPlugin({
        //     sourceMap: true
        // })
    ]
};
