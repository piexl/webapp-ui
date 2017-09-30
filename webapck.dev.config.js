const webpack = require('webpack');

// 读取同一目录下的 base config
const config = require('./webpack.base.config');


config.devServer = {
	publicPath: ASSETS_PUBLIC_PATH,//此路径下的打包文件可在浏览器中访问
	contentBase: ASSETS_BUILD_PATH,//默认情况下，将使用当前工作目录作为提供内容的目录，但是你可以修改为其他目录：
	inline:true,//设置为true，当源文件改变时会自动刷新页面
	compress: true,//一切服务都启用gzip 压缩
	port: 8088,//指定要监听请求的端口号
	watchContentBase: true,//告诉服务器监视那些通过 devServer.contentBase 选项提供的文件
	historyApiFallback: true,//当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html
}

// config.module.rules.push(
// 	{}
// );

// 启用 HMR
config.plugins.push(
  new webpack.HotModuleReplacementPlugin()
);

// 添加 Sourcemap 支持
config.plugins.push(
	new webpack.SourceMapDevToolPlugin({
    	filename: '[file].map',
    	exclude: ['vendor.js'] // vendor 通常不需要 sourcemap
	})
);

module.exports = config;