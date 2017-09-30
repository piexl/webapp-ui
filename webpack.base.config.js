const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

// 配置常量
// 源代码的根目录（本地物理文件路径）
const SRC_PATH = path.resolve('./src');
// 打包后的资源根目录（本地物理文件路径）
const ASSETS_BUILD_PATH = path.resolve('./build');
// 资源根目录（可以是 CDN 上的绝对路径，或相对路径）
const ASSETS_PUBLIC_PATH = '/assets/';

module.exports = {
	context: SRC_PATH,
	entry: {
	    // 注意 entry 中的路径都是相对于 SRC_PATH 的路径
	    dragon:'./index.js',//app入口
	    vendor: [''],// 第三方依赖名
	},
	output: {
	  path: ASSETS_BUILD_PATH,
	  publicPath: ASSETS_PUBLIC_PATH,
	  filename: './[name].js'
	},
	module: {
		rules: []
	},
	plugins: {
		// 每次打包前，先清空原来目录中的内容
		new CleanWebpackPlugin([ASSETS_BUILD_PATH], { verbose: false }),
		// 启用 CommonChunkPlugin
		new webpack.optimize.CommonsChunkPlugin({
		    name: 'vendor',
		    minChunks: function (module) {
		       //假设node入口文件node_modules目录存在
		       return module.context && module.context.indexOf('node_modules') !== -1;
		    }
		}),
	}
}