const path = require('path'); // path 조작에 사용. node에서 제공
const webpack = require('webpack');
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
  name: 'responseCheck-setting', // 모듈 설명
  mode: 'development', // 실 서비스: production
  devtool: 'eval', // 빠르게 | 실 서비스: hidden-source-map

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  entry: {
    app: ['./client'], // client.jsx에서 NumberBaseball.jsx를 불러오기 때문에 적어줄 필요 없음
  }, // 입력

  module: {
    rules: [
      {
        test: /\.jsx?/,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                targets: {
                  browsers: ['> 1% in KR'], // browserslist
                },
                debug: true,
              },
            ],
            '@babel/preset-react',
          ],
          plugins: [
            '@babel/plugin-proposal-class-properties',
            'react-refresh/babel',
          ],
        },
      },
    ],
  },

  plugins: [new RefreshWebpackPlugin()],

  output: {
    path: path.join(__dirname, 'dist'), // __dirname : 현재 폴더 경로
    filename: 'app.js',
    publicPath: '/dist/',
  }, // 출력

  devServer: {
    publicPath: '/dist/',
    hot: true,
    port: 3000,
  },
};
