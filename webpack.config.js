const webpack = require('@smartplatform/admin/webpack.config');
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const isProd = process.argv.indexOf('-p') !== -1 || process.env.NODE_ENV === 'production';

const config = module.exports = webpack({
    path: __dirname,
    fullPath: path.resolve(__dirname, 'admin'),
});

if (isProd) config.plugins.push(new BundleAnalyzerPlugin({
    analyzerMode: 'static',
    openAnalyzer: false,
}));
