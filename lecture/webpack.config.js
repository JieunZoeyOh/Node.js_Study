const path = require('path'); // path 조작에 사용. node에서 제공
const webpack = require('webpack');

module.exports = {
    name: 'wordrelay-setting', // 모듈 설명
    mode: 'development',  // 실 서비스: production
    devtool: 'eval', // 빠르게 | 실 서비스: hidden-source-map

    resolve: {
        extensions: ['.js', '.jsx'],
    },

    entry: {
        app: ['./client'], // client.jsx에서 WordRelay.jsx를 불러오기 때문에 적어줄 필요 없음
    }, // 입력

    module: {
        rules: [{
            test: /\.jsx?/,
            loader: 'babel-loader',
            options: {
                presets: [
                    ['@babel/preset-env', {
                        targets: {
                            browsers: ['> 5% in KR'], // browserslist
                        },
                        debug: true,
                    }], 
                    '@babel/preset-react'],
                plugins: ['@babel/plugin-proposal-class-properties'],
            }
        }],
    },

    plugins: [
        new webpack.LoaderOptionsPlugin({ debug: true }),
    ],

    output: {
        path: path.join(__dirname, 'dist'), // __dirname : 현재 폴더 경로
        filename: 'app.js',
    }, // 출력
};