module.exports = function () {
    return {
        module: {
            rules: [
                {
                    test: /\.wav$/,
                    loader: 'file-loader',
                    // include: 'media/sounds/'
                    options: {
                        // name: 'fonts/[name].[ext]',
                        // name: 'media/sounds/[name].[ext]',
                        name: '[path][name].[ext]',
                        output: 'sounds/'
                    },
                },
            ],
        },
    };
};
