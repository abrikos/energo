module.exports = {
    plugins: [
        require('postcss-custom-properties')({
            warnings: false,
            preserve: true,
        }),
        require('autoprefixer'),
        require('postcss-normalize')(),
    ],
    warnings: false,
};
