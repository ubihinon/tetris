module.exports = function () {
    return {
        module: {
            rules: [
                {
                    test: /\.wav$/,
                    loader: 'file-loader',
                    options: {
                        name: 'media/sounds/[name].[ext]',
                    },
                },
            ],
        },
    };
};
