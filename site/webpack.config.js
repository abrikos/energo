const wp = require('webpack');
const path = require('path');
const webpack = require ('@smartplatform/admin/webpack.config');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CleanWebpackPlugin = require('clean-webpack-plugin');

const isProd = process.argv.indexOf ('-p') !== -1 || process.env.NODE_ENV === 'production';

const config = webpack ({
	path: __dirname,
	fullPath: __dirname,
	distPath: path.resolve(__dirname, '..', 'build-site'),
});

// config можно модифицировать под конкретный проект как угодно
// пример:
// config.plugins.push ({...});

config.resolve = {
	alias: {
		root: path.resolve(__dirname, '..'),
		immutable: path.resolve(__dirname, '..', 'node_modules/immutable'),
	},
	symlinks: false,
};

if (isProd) {
	config.plugins.push(new BundleAnalyzerPlugin({
		analyzerMode: 'static',
		openAnalyzer: false,
		generateStatsFile: true,
	}));
	
	config.plugins.push(new CleanWebpackPlugin(['build-site/js', 'build-site/css', 'build-site/static'], {
		root: path.resolve(__dirname, '..'),
	}));
}

module.exports = config;
