var webpack = require('webpack'), 
    path = require('path');

module.exports = {  
    cache: true,
    entry: './src/Chip8.ts',
    debug: true,
    devtools: 'eval',
    output: {
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
    },
    module: {
        loaders: [
            { test: /\.ts$/, loader: 'ts-loader' }
        ]
    }
};
