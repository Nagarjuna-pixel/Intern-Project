const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = {
  plugins: [
    new NodePolyfillPlugin()
  ],
    resolve: {
      extensions: ['.js', '.jsx', '.mjs'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    module: {
      rules: [
        {
          test: /\.mjs$/,
          include: /node_modules/,
          type: 'javascript/auto',
        },
      ],
    },
    resolve: {
      fallback: {
        "url": require.resolve("url/"),
        "util": require.resolve("util/"),
        "zlib": require.resolve("browserify-zlib")
      }
    },
  };
  