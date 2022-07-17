const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = /** @type { import('webpack').Configuration } */ ({
  mode: "development",
  entry: "./client/app.js",
  devtool: "eval-cheap-source-map",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  debug: true,
                  targets: "> 1%, not dead",
                },
              ],
            ],
          },
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./client/index.html", // 템플릿 경로를 지정
      templateParameters: {
        // 템플릿에 주입할 파라매터 변수 지정
        env: process.env.NODE_ENV === "development" ? "(개발용)" : "",
      },
    }),
  ],
  devServer: {
    proxy: { "/": "http://localhost:3000" },
    client: { overlay: true, logging: "error" },
    port: 8081,
    watchFiles: ["client/*.html"],
    hot: true,
    historyApiFallback: true,
  },
});
