module.exports = function(env, argv) {
    const isProduction = argv.mode === "production";
    const isDevelopment = argv.mode === "development";

    const path = require("path");
    const HtmlWebpackPlugin = require("html-webpack-plugin");
    const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
    const MiniCssExtractPlugin = require("mini-css-extract-plugin");
    const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

    const config = {
        mode: argv.mode,
        entry: "./src/index.jsx",
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "app.js",
            publicPath: "/",
        },
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    exclude: [path.resolve(__dirname, "node_modules")],
                    use: ["babel-loader"],
                },
                {
                    test: /\.scss$/,
                    use: [isDevelopment ? "style-loader" : MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
                },
            ],
        },
        resolve: {
            modules: [path.resolve(__dirname), "node_modules"],
            extensions: [".js", ".jsx"],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: "src/index.html",
            }),
            new MiniCssExtractPlugin({
                filename: isProduction ? "./[name].[contenthash].css" : "./[name].css",
            }),
        ],
    };

    if (isProduction) {
        config.optimization = {
            minimizer: [
                new UglifyJsPlugin({
                    cache: true,
                    parallel: true,
                    sourceMap: false,
                }),
                new OptimizeCSSAssetsPlugin(),
            ],
        };
    }

    if (isDevelopment) {
        config.devServer = {
            contentBase: path.join(__dirname, "dist"),
            publicPath: "/",
            port: 3000,
            historyApiFallback: true,
            watchContentBase: true,
            open: true,
            proxy: {
                "/api": "http://localhost:8000",
            },
        };
    }

    return config;
};
