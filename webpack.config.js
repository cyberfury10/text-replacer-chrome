const path = require("path")

const CopyPlugin = require("copy-webpack-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const HtmlWebPackPlugin = require("html-webpack-plugin")
const TerserPlugin = require("terser-webpack-plugin")

module.exports = (env, argv) => {
  const { mode } = argv
  const isEnvDevelopment = mode === "development"
  const isEnvProduction = mode === "production"
  const config = {
    output: {
      publicPath: "auto",
      path: path.resolve(__dirname, "dist"),
      clean: true,
    },
    entry: {
      content: "./src/content/content.js",
      background: "./src/background/background.js",
      app: "./src/index.js",
    },

    resolve: {
      extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
      alias: {},
    },

    optimization: {
      minimize: isEnvProduction,
      splitChunks: {
        minSize: 10000,
        maxSize: 250000,
      },
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            parse: {
              ecma: 8,
            },
            compress: {
              ecma: 5,
              warnings: false,
              comparisons: false,
              inline: 2,
            },
            mangle: {
              safari10: true,
            },
            output: {
              ecma: 5,
              comments: false,
              ascii_only: true,
            },
          },
        }),
        // This is only used in production mode
        new CssMinimizerPlugin(),
      ],
    },

    devServer: {
      port: 4001,
      historyApiFallback: true,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
    },
    devtool: isEnvProduction ? false : "source-map",
    module: {
      rules: [
        {
          test: /\.m?js/,
          type: "javascript/auto",
          resolve: {
            fullySpecified: false,
          },
        },
        {
          test: /\.(css|s[ac]ss)$/i,
          use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
        },
        {
          test: /\.(ts|tsx|js|jsx)$/,
          exclude: [
            /node_modules/,
          ],
          use: { loader: "babel-loader" },
        },
        {
          test: /.json$/,
          use: { loader: "json-loader" },
          exclude: [path.resolve(__dirname, "src/manifest.json")],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: "asset/resource",
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: "asset/resource",
        },
      ],
    },

    plugins: [
      new CopyPlugin({
        patterns: [
          {
            from: "./src/manifest.json",
            to: "./manifest.json",
          },
        ],
      }),
      new HtmlWebPackPlugin({
        template: "./public/index.html",
        publicPath: "/",
      }),
    ],
  }
  return config
}
