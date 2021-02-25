const { mode } = require('webpack-nano/argv')
const {
	MiniHtmlWebpackPlugin
} = require('mini-html-webpack-plugin')
const { WebpackPluginServe } = require('webpack-plugin-serve')

module.exports = {
	watch: mode === 'development',
	entry: [
		'./src',
		'webpack-plugin-serve/client'
	],
	mode,
	plugins: [
		new MiniHtmlWebpackPlugin({ context: { title: 'Demo' } }),
		new WebpackPluginServe({
			port: Number(process.env.PORT) || 8888,
			static: './dist',
			liveReload: true,
			waitForBuild: true
		})
	]
}
