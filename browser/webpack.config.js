const path = require('path')
let config = {
    mode: 'none',
    entry: './src/index.ts',
    target: 'web',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'platform.browser.js'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader'
            },
            {
                test: /\.js$/,
                exclude: [
                    /(node_modules|bower_components)/
                ],
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    }
}
module.exports = config