var webpack = require('webpack')
module.exports = {
    entry: './src/client/index.js',
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.jsx$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    },
    output: {
        filename: 'bundle.js',
        path: __dirname + '/public/js'
    },
    plugins: [
        new webpack.DefinePlugin({
          __isBrowser__: "true"
        })
    ]
};