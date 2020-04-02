const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');  // https://webpack.docschina.org/plugins/mini-css-extract-plugin/
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin'); // https://github.com/NMFR/optimize-css-assets-webpack-plugin

// 区分环境
const isProduction = process.env.NODE_ENV == 'production';

module.exports = {
  mode: isProduction ? 'production' : 'development', // 模式
  entry: {
    index: path.resolve(__dirname, 'src/index-entry.js'),
    detail: path.resolve(__dirname, 'src/detail-entry.js')
  },
  devtool: isProduction ? 'source-map' : 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: '9000', // 默认是8080
    compress: true, // 是否启用 gzip 压缩
    hot: true // 热更新
  },
  resolve: {
    modules: ['./src/components', 'node_modules'], // 从左到右依次查找
    alias: {
      '@lib': path.resolve(__dirname, 'lib') // 为lib目录添加别名
    },
    extensions: ['.js', '.json'] // 从左往右
  },
  output: {
    path: path.resolve(__dirname, 'dist'), // 输出目录
    filename: '[name].[hash:6].js', // 输出文件名
    chunkFilename:'[name].[hash:6].js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
        exclude: /node_modules/ // 排除 node_modules 目录
      },
      {
        test: /\.(c|le)ss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.sass$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.(jpe?g|png|gif|webp|svg|eot|ttf|woff|woff2)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240, // 10K 资源大小小于 10K 时，将资源转换为 base64，超过 10K，将图片拷贝到 dist 目录
              name: '[name]_[hash:6].[ext]', // 设置文件名，默认情况下，生成的文件的文件名就是文件内容的 MD5 哈希值并会保留所引用资源的原始扩展名
              outputPath: 'assets', // 输出目录
              esModule: false // 表示是否使用es6模块的导出，默认是启用的
            }
          }
        ],
        exclude: /node_modules/
      },
    ]
  },
  plugins: [
    // index.html
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html'), // 指定模板文件，不指定会生成默认的 index.html 文件
      filename: 'index.html', // 打包后的文件名
      chunks: ['index']
    }),
    // detail.html
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/detail.html'), // 指定模板文件，不指定会生成默认的 index.html 文件
      filename: 'detail.html', // 打包后的文件名
      chunks: ['detail']
    }),
    // 打包前自动清除dist目录
    new CleanWebpackPlugin(),
    // 热更新插件
    new webpack.HotModuleReplacementPlugin(),
    // 拷贝静态资源
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'lib'),
        to: path.resolve(__dirname, 'dist/lib')
      }
    ]),
    new MiniCssExtractPlugin({
      filename: isProduction ? 'css/[name].[hash:6].css' : 'css/[name].css'
    }),
    new OptimizeCssPlugin()
  ]
}