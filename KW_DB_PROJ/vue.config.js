const { defineConfig } = require('@vue/cli-service');
const BundleTracker = require('webpack-bundle-tracker');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  configureWebpack: {
    plugins: [new NodePolyfillPlugin()],
    optimization: {
      splitChunks: {
        chunks: "all",
      },
    },
  },
});

module.exports = defineConfig({
  publicPath: '/', // app이 배포될 root url
  //FIXME: CloudHIS-BackEnd -> 환경변수로 추출하는편이 좋아보임
  outputDir: '../DB_Project/dist', // app이 배포될 경로
  assetsDir: 'emr/static', // static 폴더를 정의하는 경로

  //NOTE: 별도로 webpack을 설정하면 같은 파일을 다른 이름으로 여러번 패키징하는 문제가 생기는듯
  // configureWebpack: {
  //   plugins: [new MiniCssExtractPlugin()],
  //   module: {
  //     rules: [
  //       {
  //         test: /\.(s*)css$/,
  //         use: ['postcss-loader']
  //       }
  //     ]
  //   }
  // },

  chainWebpack: (config) => {
    config.optimization.splitChunks(false);

    // webpack-stats.json을 django로 전달하여 사용하기 위한 코드
    //FIXME: CloudHIS-BackEnd -> 환경변수로 추출하는편이 좋아보임
    config
      .plugin('BundleTracker')
      .use(BundleTracker, [
        { filename: '../CloudHIS-BackEnd/webpack-stats.json' },
      ]);

    config.devServer
      .host('0.0.0.0')
      .port(8080)
      .https(false)
      .headers({ 'Access-Control-Allow-Origin': ['*'] });
  },

  pages: {
    index: 'src/main.js',
  },
});
