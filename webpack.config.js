var path = require('path')

let conf = {
    entry: {
        index: './dev/index.js',
        reg: './dev/reg.js'
    },
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader'
            },
            {
                test: /\.(c|le)ss$/,
                use: ['style-loader', 'css-loader', 'less-loader', 'postcss-loader']
            },
            {
                test: /\.(jpe?g|png|gif)$/,
                loader: 'file-loader'
            }
        ]
    },
    devtool: 'eval-sourcemap'
}

module.exports = (env, options) => {
    console.log(options)
    if (options.mode === 'production') {
        conf.devtool = null
    } else {
        conf.devtool = 'eval-sourcemap';
    }
    return conf
};