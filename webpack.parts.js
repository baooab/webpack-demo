const path = require("path");
const glob = require("glob");
const PurgeCSSPlugin = require("purgecss-webpack-plugin");

const ALL_FILES = glob.sync(path.join(__dirname, "src/*.js"));

// console.log(ALL_FILES)

const { WebpackPluginServe } = require('webpack-plugin-serve')
const {
	MiniHtmlWebpackPlugin
} = require('mini-html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require("autoprefixer");

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

exports.tailwind = () => ({
	loader: "postcss-loader",
	options: {
		postcssOptions: { plugins: [require("tailwindcss")()] },
	},
});

exports.autoprefix = () => ({
	loader: 'postcss-loader',
	options: {
		postcssOptions: {
			plugins: [
				require('autoprefixer')()
			]
		}
	}
})

exports.eliminateUnusedCSS = () => ({
	plugins: [
		new PurgeCSSPlugin({
			paths: ALL_FILES, // Consider extracting as a parameter
		}),
	],
});

exports.devServer = () => ({
	watch: true,
	plugins: [
		new WebpackPluginServe({
			host: '127.0.0.1',
			port: process.env.PORT || 8080,
			static: './dist',
			liveReload: true,
			waitForBuild: true,
		})
	]
})

exports.page = ({ title }) => ({
	plugins: [new MiniHtmlWebpackPlugin({ context: { title } })]
})

