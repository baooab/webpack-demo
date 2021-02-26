const { WebpackPluginServe } = require('webpack-plugin-serve')
const {
	MiniHtmlWebpackPlugin
} = require('mini-html-webpack-plugin')

exports.loadCss = () => ({
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			}
		]
	}
})

exports.loadSass = () => ({
	module: {
		rules: [
			{
				test: /\.s[ac]ss$/,
				use: ['style-loader', 'css-loader', 'sass-loader']
			}
		]
	}
})

exports.devServer = () => ({
	watch: true,
	plugins: [
		new WebpackPluginServe({
			port: process.env.PORT || 8080,
			static: './dist',
			liveReload: true,
			waitForBuild: true,
		})
	]
})

exports.page = ({ title }) => ({
	plugins: [new MiniHtmlWebpackPlugin({ context: { title }})]
})

