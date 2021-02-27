const { WebpackPluginServe } = require('webpack-plugin-serve')
const {
	MiniHtmlWebpackPlugin
} = require('mini-html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

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

exports.extractCss = ({ options = {}, loaders = [] } = {}) => {
	return {
		module: {
			rules: [
				{
					test: /\.css$/,
					use: [
						{ loader: MiniCssExtractPlugin.loader, options },
						'css-loader'
					].concat(loaders)
				}
			]
		},
		plugins: [
			new MiniCssExtractPlugin({
				filename: '[name].css'
			})
		]
	}
}

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

