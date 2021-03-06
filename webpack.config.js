const HtmlWebpackPlugin = require("html-webpack-plugin");
const fs = require("fs");
const path = require("path");

const dir = "./src/works";
const fileNameList = fs.readdirSync(dir);

const entryPoints = fileNameList.reduce((a, c) => {
  const filename = c.replace(/\.ts/, "");
  const filePath = `${dir}/${c}`;

  return Object.assign(a, { [filename]: filePath });
}, {});

console.log(entryPoints);

module.exports = {
  // モード値を production に設定すると最適化された状態で、
  // development に設定するとソースマップ有効でJSファイルが出力される
  mode: "development",

  // メインとなるJavaScriptファイル（エントリーポイント）
  entry: entryPoints,
  devtool: "eval-source-map",
  // ファイルの出力設定
  output: {
    //  出力ファイルのディレクトリ名
    path: `${__dirname}/dist`,
    // 出力ファイル名
    filename: "assets/js/[name].js",
    publicPath: "/",
    assetModuleFilename: "images/[hash][ext]",
  },
  module: {
    rules: [
      {
        // 拡張子 .ts の場合
        test: /\.ts$/,
        // TypeScript をコンパイルする
        use: "ts-loader",
      },
      {
        test: /\.(png|jpg|gif)$/,
        type: "asset/resource",
      },
      {
        test: /\.(frag|vert)$/,
        type: "asset/source",
      },
    ],
  },
  // import 文で .ts ファイルを解決するため
  resolve: {
    alias: {
      "~": `${__dirname}/src`, // rootPath にはルートのパスが入る。
    },
    extensions: [".ts", ".js"],
  },
  // dev-serverのlive reloadが効かないため明示的にwebを指定する
  target: "web",
  // webpack-dev-serverを立ち上げた時のドキュメントルートを設定
  // ここではdistディレクトリのindex.htmlにアクセスするよう設定してます
  devServer: {
    contentBase: "dist",
    open: true,
  },
  plugins: [
    ...Object.keys(entryPoints).map((key) => {
      return new HtmlWebpackPlugin({
        filename: `${key}.html`,
        chunks: [key],
        template: "./src/template/index.html",
      });
    }),
  ],
};
