require("dotenv").config();
const webpack = require("webpack");
// const CompressionPlugin = require('compression-webpack-plugin');
// const zlib = require("zlib");

module.exports =
{
  node: {
    fs: 'empty',
  },
  experimental: { styledComponents: true },
  reactStrictMode: true,
  env: {
    SERVICE_HOST: process.env.BASEKEY,
    API_ENDPOINT: process.env.API_ENDPOINT,
    BASE_URL: process.env.BASE_URL,
    BASE_URL_NOAPI: process.env.BASE_URL_NOAPI,
    DECRYPT_KEY: process.env.DECRYPT_KEY,
    PORT: process.env.PORT,
    URL_CHATBOX: process.env.URL_CHATBOX,
    GA_ID: process.env.GA_ID,
    KEY_NOTIFICATION: process.env.KEY_NOTIFICATION,
  },
  swcMinify: false,
  images: {
    disableStaticImages: true
  },
  webpack: function (config) {
    console.log({ config_mode: config.mode });
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false, // the solution
    };
    config.module.rules.push(
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: {
          loader: "url-loader",
          options: {
            encoding: true,
            limit: 100000,
            name: "[name].[ext]"
          }
        }
      },
    ),
      config.plugins.push(
        new webpack.ProvidePlugin({
          $: "jquery",
          jQuery: "jquery"
        }),
        // new CompressionPlugin({
        //   filename: "[path][base].br",
        //   algorithm: "brotliCompress",
        //   test: /\.(js|css|html|svg)$/,
        //   compressionOptions: {
        //     params: {
        //       [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
        //     },
        //   },
        //   threshold: 10240,
        //   minRatio: 0.8,
        //   deleteOriginalAssets: false,
        // })
      )
    if (
      config.mode === "production"
      && Array.isArray(config.optimization.minimizer)
    ) {
      const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
      // const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

      config.optimization.minimizer.push(
        new OptimizeCSSAssetsPlugin({}),
        // new UglifyJsPlugin({
        //   cache: true,
        //   extractComments: false,
        //   sourceMap: false,
        //   parallel: true,
        //   uglifyOptions: {
        //     compress: true,
        //     mangle: true,
        //     warnings: false
        //   }
        // }));
      );
    }
    return config;
  }
};

