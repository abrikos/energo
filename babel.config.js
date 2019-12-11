const uiTransform = require('@smartplatform/ui/src/transform-imports');

module.exports = {
    presets: [
        ['@babel/preset-env', {
            modules: false,
            debug: false,
            targets: {
                browsers: [
                    'last 2 versions',
                    'ie >= 11'
                ],
            },
        }],
        '@babel/preset-react',
    ],
    plugins: [
        ['transform-imports', {
            '@smartplatform/ui': {
                transform: uiTransform,
                // preventFullImport: true,
            },
            // почему-то в Babel 7 для fortawesome tree-shaking работает и без этого...
            // '@fortawesome/fontawesome-free-solid': {
            // 	transform: '@fortawesome/fontawesome-free-solid/${member}',
            // 	preventFullImport: true
            // },
        }],
        // 'react-hot-loader/babel', // ? вызывает дополнительные рендеры
        ['@babel/plugin-proposal-export-default-from'],
        ['@babel/plugin-proposal-decorators', { 'legacy': true }],
        ['@babel/plugin-proposal-class-properties', { 'loose': true }], // loose: true for legacy decorators
    ]
};
