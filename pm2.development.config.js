const pkginfo = require('./package.json');

const log_date_format = 'DD.MM.YYYY HH:mm:ss';
const combine_logs = true;

/**
 * Конфигурация для разработки
 */
module.exports = {
	apps: [
		{
			name: `${pkginfo.name}-site`,
			script: `${__dirname}/node_modules/webpack-dev-server/bin/webpack-dev-server.js`,
			node_args: `--preserve-symlinks`,
			args: ['--config', `${__dirname}/site/webpack.config.js`],
			env: {
				NODE_ENV: 'development',
				CLIENT_PORT: 3009,
			    PROXY_URL: 'http://sakhaenergo.smartplatform.pro',
			},
			log_date_format,
			combine_logs,
			error_file: `${__dirname}/logs/site.err.log`,
			out_file: `${__dirname}/logs/site.out.log`,
			pid_file: `${__dirname}/logs/site.pid`,
		},
		{
			name: `${pkginfo.name}-admin`,
			script: `${__dirname}/node_modules/webpack-dev-server/bin/webpack-dev-server.js`,
			node_args: '--preserve-symlinks',
			env: {
				NODE_ENV: 'development',
				CLIENT_PORT: 3000,
				PROXY_URL: 'http://sakhaenergo.smartplatform.pro',
			},
			log_date_format,
			combine_logs,
			error_file: `${__dirname}/logs/admin.err.log`,
			out_file: `${__dirname}/logs/admin.out.log`,
			pid_file: `${__dirname}/logs/admin.pid`,
		},
		{
		 	name: `${pkginfo.name}-server`,
			script: `${__dirname}/server/server.js`,
			node_args: '--preserve-symlinks --inspect',
		 	env: {
		 		NODE_ENV: 'development',
		 		DEBUG: '*',
			},
			log_date_format,
		 	combine_logs,
			error_file: `${__dirname}/logs/server.err.log`,
			out_file: `${__dirname}/logs/server.out.log`,
		 	pid_file: `${__dirname}/logs/server.pid`,
		 },
	],
};
