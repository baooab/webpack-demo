const { mode } = require('webpack-nano/argv')
const { merge } = require('webpack-merge')
const parts = require('./webpack.parts')

const cssLoaders = [parts.autoprefix(), parts.tailwind()];

const commonConfig = merge([
	{
		entry: ['./src'],
		mode: 'development'
	},
	parts.extractCss({ loaders: cssLoaders }),
	parts.loadImages({ limit: 2048 }),
	parts.loadJs(),
	parts.page({ title: 'Demo' }),
])

const productionConfig = merge([
	{
		mode: 'production'
	},
	parts.eliminateUnusedCSS()
])

const developmentConfig = merge([
	{
		entry: ['webpack-plugin-serve/client']
	},
	parts.devServer(),
])

const getConfig = (mode) => {
	console.log('>>>>>', mode)

	switch (mode) {
		case 'prod:legacy':
			process.env.BROWSERSLIST_ENV = "legacy";
			return merge(commonConfig, productionConfig);
		case 'prod:modern':
			process.env.BROWSERSLIST_ENV = "modern";
			return merge(commonConfig, productionConfig);
		case 'production':
			return merge(commonConfig, productionConfig);
		case 'development':
			return merge(commonConfig, developmentConfig)
		default:
			throw new Error(`Try to use an unknown mode. ${mode}`)
	}
}

module.exports = getConfig(mode)
