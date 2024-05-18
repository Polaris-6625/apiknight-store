const { baseConfig } = require("./base.config.js");
const { VueLoaderPlugin } = require("vue-loader");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

const vueDevConfig = {
    ...baseConfig,
    entry: "./vue-test/App.vue",
    output: {
        filename: "[name].js",
        path: path.join(__dirname, "./dist-vue"),
    },
    module: {
        rules: [
            ...baseConfig.module.rules,
            {
                test: /\.vue$/,
                loader: "vue-loader",
            }
        ]
    },
    plugins: [
        ...baseConfig.plugins,
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: "./vue-test/index.html",
        }),
    ],
    mode: "development",
    devtool: "source-map",
    devServer: {
        hot: true,
        static: "./dist-vue",
    },
    // watchOptions: {
    //     aggregateTimeout: 200,
    //     poll: 1000,
    // },
    // optimization: {
    //     useExports: true
    // }
}

module.exports = {
    vueDevConfig,
  };

// const vueDevConfig = {
//     entry: './vue-test/App.vue',
//     output: {
//       filename: '[name].js',
//       path: '/Users/liuyuyang/Desktop/project/store/dist-vue',
//       module: { rules: [Array] },
//       plugins: [ [HtmlWebpackPlugin], [DeterministicChunkIdsPlugin], Plugin {} ],
//       mode: 'development',
//       devtool: 'source-map',
//       devServer: { hot: true, static: './dist-vue' },
//       watchOptions: { useExports: true }
//     },
//     module: { rules: [ [Object], [Object], [Object], [Object] ] },
//     plugins: [
//       HtmlWebpackPlugin {
//         userOptions: [Object],
//         version: 5,
//         options: [Object]
//       },
//       DeterministicChunkIdsPlugin { options: [Object] }
//     ],
//     resolve: { extensions: [ '.js', '.jsx', '.ts', '.tsx' ] },
//     mode: 'production',
//     devServer: { hot: true, static: './dist' },
//     watchOptions: { aggregateTimeout: 200, poll: 1000 },
//     optimization: { chunkIds: 'total-size', moduleIds: 'deterministic' }
//   }

//   module.exports = vueDevConfig;


// const path = require('path');
// const VueLoaderPlugin = require('vue-loader/lib/plugin');
// const TerserPlugin = require('terser-webpack-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// module.exports = {
//   mode: 'development',
//   entry: './vue-test/main.ts',
//   output: {
//     filename: 'bundle.js',
//     path: path.resolve(__dirname, 'dist'),
//     clean: true, // 在 webpack 5 中，你可以直接使用 clean: true 来代替 clean-webpack-plugin
//   },
//   resolve: {
//     extensions: ['.ts', '.tsx', '.js', '.vue', '.json'],
//     alias: {
//       'vue$': 'vue/dist/vue.esm-bundler.js' // 使用 Vue 3 的 ESM 版本
//     }
//   },
//   module: {
//     rules: [
//       {
//         test: /\.vue$/,
//         loader: 'vue-loader'
//       },
//       {
//         test: /\.tsx?$/,
//         use: 'ts-loader',
//         exclude: /node_modules/
//       },
//       {
//         test: /\.css$/,
//         use: ['style-loader', 'css-loader']
//       },
//       // 其他你需要的加载器规则...
//     ]
//   },
//   plugins: [
//     new VueLoaderPlugin(),
//     new HtmlWebpackPlugin({
//       template: './src/index.html',
//     }),
//     // 开发模式下可能不需要 minification，但如果需要，可以添加 TerserPlugin
//     // new TerserPlugin({
//     //   terserOptions: {
//     //     // 压缩选项
//     //   }
//     // }),
//     // 使用 clean-webpack-plugin 清理输出目录（在 webpack 5 中可以省略）
//     // new CleanWebpackPlugin(),
//   ],
//   devServer: {
//     contentBase: path.join(__dirname, 'dist'),
//     compress: true,
//     port: 9000,
//     open: true, // 自动打开浏览器
//     hot: true // 启用热更新
//   },
//   devtool: 'inline-source-map' // 在开发模式下使用 inline-source-map
// };